"use client";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock, FileText, RefreshCw } from "lucide-react";
import { updateAppointmentStatus } from "@/lib/actions/doctor.actions";
import { AppointmentWithDetails } from "@/types";
import { Status } from "@prisma/client";

export function AgendaGrid({
  appointments,
}: {
  appointments: AppointmentWithDetails[];
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticAppointments, setOptimisticAppointments] =
    useState(appointments);

  const handleStatusUpdate = async (id: string, newStatus: Status) => {
    // Optimistic update
    setOptimisticAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );

    startTransition(async () => {
      const res = await updateAppointmentStatus(id, newStatus);
      if (!res.success) {
        // Revert on failure
        setOptimisticAppointments(appointments);
        alert(res.message);
      }
    });
  };

  if (optimisticAppointments.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-700">
          No appointments today
        </h3>
        <p className="text-slate-500 mt-2">You have a clear schedule.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-slate-800 mb-6">
          Daily Agenda
        </h2>
        <span
          className="cursor-pointer mb-6"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="text-green-500" size={24} />
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {optimisticAppointments.map((app) => (
          <div
            key={app.id}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
              app.status === "COMPLETED"
                ? "border-green-200 bg-green-50/30"
                : app.status === "REJECTED"
                  ? "border-red-200 bg-red-50/30"
                  : "border-slate-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                {app.patient.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">
                  {app.patient.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {format(new Date(app.date), "HH:mm")}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={14} />
                    <span className="truncate max-w-[150px]">{app.reason}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              {app.status === "PENDING" || app.status === "APPROVED" ? (
                <>
                  <button
                    onClick={() => handleStatusUpdate(app.id, "COMPLETED")}
                    disabled={isPending}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    <CheckCircle size={16} /> Complete
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                    disabled={isPending}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    <XCircle size={16} /> Absent
                  </button>
                </>
              ) : (
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    app.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
