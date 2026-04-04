import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CalendarCheck, Users, Clock, Trash2 } from "lucide-react";
import { AgendaCreateModal } from "./AgendaCreateModal";
import { deleteMeeting } from "@/lib/actions/agenda.actions";

export default async function AgendaPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/dashboard");

  const meetings = await prisma.internalMeeting.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#004A99] tracking-tight">
            Internal Agenda
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage board meetings and administrative events.
          </p>
        </div>

        <AgendaCreateModal />
      </div>

      {/* Timeline Layout */}
      <div className="space-y-6">
        {meetings.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <CalendarCheck size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">
              No scheduled meetings.
            </h3>
          </div>
        ) : (
          meetings.map((meet, idx) => {
            const mDate = new Date(meet.date);
            const isPassed = mDate < new Date();

            return (
              <div key={meet.id} className="flex gap-4 group">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-slate-50 ${isPassed ? "bg-slate-200 text-slate-400" : "bg-[#004A99] text-white shadow-md"}`}
                  >
                    <CalendarCheck size={20} />
                  </div>
                  {idx !== meetings.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 my-2"></div>
                  )}
                </div>

                {/* Event Card */}
                <div
                  className={`flex-1 bg-white p-6 rounded-3xl border shadow-sm relative ${isPassed ? "opacity-60 border-slate-100" : "border-teal-100"}`}
                >
                  <form
                    action={async () => {
                      "use server";
                      await deleteMeeting(meet.id);
                    }}
                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      type="submit"
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>

                  <h3 className="text-lg font-bold text-slate-800">
                    {meet.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm font-semibold">
                    <span
                      className={`flex items-center gap-1.5 ${isPassed ? "text-slate-400" : "text-[#004A99]"}`}
                    >
                      <Clock size={14} />
                      {mDate.toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5 text-teal-600">
                      <Users size={14} />
                      Board Room
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                    {meet.description}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
