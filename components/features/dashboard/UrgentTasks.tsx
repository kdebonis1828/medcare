"use client";
import { AlertCircle, Check, X } from "lucide-react";
import { updateAppointmentStatus } from "@/lib/actions/admin.actions";

interface Appointment {
  id: string;
  reason: string;
  date: Date;
  patient: { name: string };
  doctor: { name: string } | null;
}

export const UrgentTasks = ({
  pendingAppointments = [],
}: {
  pendingAppointments?: Appointment[];
}) => {
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
                    To see:{" "}
                    <span className="text-[#004A99] font-bold">
                      {apt.doctor?.name || "Unassigned"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2 w-full">
                <button
                  onClick={() => updateAppointmentStatus(apt.id, "APPROVED")}
                  className="flex-1 flex justify-center items-center gap-1 text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100 transition-colors py-2 rounded-lg border border-green-100"
                >
                  <Check size={14} /> Approve
                </button>
                <button
                  onClick={() => updateAppointmentStatus(apt.id, "REJECTED")}
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
