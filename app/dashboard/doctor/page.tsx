import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

import { OmniSearchBar } from "@/components/features/doctor/OmniSearchBar";
import { HeroBanner } from "@/components/features/doctor/HeroBanner";
import { AgendaGrid } from "@/components/features/doctor/AgendaGrid";
import { ERezeptForm } from "@/components/features/doctor/ERezeptForm";
import { QuickNotes } from "@/components/features/doctor/QuickNotes";

export default async function DoctorDashboardPage() {
  const session = await getSession();

  if (!session || session.role !== "DOCTOR") {
    redirect("/login");
  }

  // Multi-tenant Security: Ensure user has a staff profile
  const staff = await prisma.staff.findUnique({
    where: { userId: session.userId as string },
    include: {
      appointments: {
        where: {
          status: {
            in: ["APPROVED", "COMPLETED"],
          },
        },
        include: {
          patient: {
            include: { user: true },
          },
          doctor: {
            include: { user: true },
          },
        },
        orderBy: { date: "asc" },
      },
    },
  });

  if (!staff) {
    // If a DOCTOR role user doesn't have a Staff Profile yet
    return (
      <div className="p-8 text-center text-slate-500">
        Profile not found. Please contact an admin.
      </div>
    );
  }

  // Filter today's appointments (Simulated loosely here to include upcoming)
  const todayBegin = new Date();
  todayBegin.setHours(0, 0, 0, 0);

  const todaysAppointments = staff.appointments.filter((app) => {
    return new Date(app.date) >= todayBegin;
  });

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500">
      <OmniSearchBar />

      <HeroBanner
        doctorName={staff.name}
        appointmentCount={
          todaysAppointments.filter(
            (a) => a.status === "PENDING" || a.status === "APPROVED",
          ).length
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Work Area: The Agenda */}
        <section className="xl:col-span-8">
          <AgendaGrid appointments={todaysAppointments} />
        </section>

        {/* Side Panel: Action Widgets */}
        <section className="xl:col-span-4 flex flex-col gap-6 h-full min-h-[600px]">
          <div className="flex-1 shrink-0">
            <ERezeptForm />
          </div>

          <div className="flex-1 shrink-0">
            <QuickNotes />
          </div>
        </section>
      </div>
    </div>
  );
}
