"use client";
import { useState } from "react";
import { AlertCircle, Calendar, Check, X } from "lucide-react";
import { updateAppointmentStatus } from "@/lib/actions/admin.actions";

interface Appointment {
  id: string;
  reason: string;
  date: Date;
  number: string;
  patient: { name: string };
  doctor: { name: string } | null;
}

export const UrgentTasks = ({
  pendingAppointments = [],
}: {
  pendingAppointments?: Appointment[];
}) => {
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>(
    {},
  );

  const formatDateForInput = (date: Date | string) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      const tzOffset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  const handleUpdateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED",
    originalDate: Date,
  ) => {
    const dateStr = selectedDates[id];
    const finalDate =
      status === "APPROVED" && dateStr
        ? new Date(dateStr)
        : new Date(originalDate);

    await updateAppointmentStatus(id, status, finalDate);
    // Optionally clear state for this ID if needed, but the component might unmount/re-render
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="text-red-500" size={20} />
        <h2 className="text-lg font-bold text-slate-800">Pending Approvals</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 pb-4">
        {pendingAppointments.length === 0 ? (
          <p className="text-slate-400 text-sm italic py-2">
            No pending appointments.
          </p>
        ) : (
          pendingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="w-full lg:w-80 p-5 rounded-xl bg-white shadow-sm border border-slate-100 transition-transform hover:-translate-y-1 lg:flex-none border-l-4 border-l-amber-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <p className="text-sm font-bold text-slate-700 leading-snug">
                    {apt.reason.slice(0, 40)}
                    {apt.reason.length > 40 ? "..." : ""}
                  </p>
                  <div className="bg-amber-100 w-2 h-2 rounded-full mt-1 ml-2 shrink-0"></div>
                </div>

                <div className="mt-4 text-xs text-slate-500 space-y-1.5 font-medium border-t border-slate-50 pt-3">
                  <p>
                    Patient:{" "}
                    <span className="font-bold text-slate-700">
                      {apt.patient.name}
                    </span>
                  </p>
                  <p>
                    Number:{" "}
                    <span className="font-bold text-slate-700">
                      {apt.number}
                    </span>
                  </p>
                  <p>
                    To see:{" "}
                    <span className="text-[#004A99] font-bold">
                      {apt.doctor?.name || "Unassigned"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <label
                  htmlFor={`date-${apt.id}`}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2"
                >
                  <Calendar size={12} className="text-[#004A99]" />
                  Proposed Schedule
                </label>
                <input
                  id={`date-${apt.id}`}
                  type="datetime-local"
                  defaultValue={formatDateForInput(apt.date)}
                  onChange={(e) =>
                    setSelectedDates((prev) => ({
                      ...prev,
                      [apt.id]: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#004A99]/20 outline-none text-xs font-semibold text-slate-700 transition-all hover:bg-white"
                />
              </div>

              <div className="mt-5 flex gap-2 w-full">
                <button
                  onClick={() =>
                    handleUpdateStatus(apt.id, "APPROVED", apt.date)
                  }
                  className="flex-1 flex justify-center items-center gap-1 text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100 transition-colors py-2 rounded-lg border border-green-100"
                >
                  <Check size={14} /> Approve
                </button>
                <button
                  onClick={() =>
                    handleUpdateStatus(apt.id, "REJECTED", apt.date)
                  }
                  className="flex-1 flex justify-center items-center gap-1 text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors py-2 rounded-lg border border-red-100"
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
