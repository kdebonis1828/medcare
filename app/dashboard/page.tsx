import { Search, Bell } from "lucide-react";
import { WelcomeBanner } from "@/components/features/dashboard/WelcomeBanner";
import { UrgentTasks } from "@/components/features/dashboard/UrgentTasks";
import { StatsGrid } from "@/components/features/dashboard/StatsGrid";
import { FinanceChart } from "@/components/features/dashboard/FinanceChart";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StaffWithUser } from "@/types";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const pendingAppointments = await prisma.appointment.findMany({
    where: { status: "PENDING" },
    include: {
      patient: true,
      doctor: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const doctors = (await prisma.staff.findMany({
    where: { isActive: true },
    include: { user: true },
  })) as StaffWithUser[];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Header / Search */}
      <header className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-white shadow-sm border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
            placeholder="Search patients by ID or Name..."
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <button className="relative p-2 text-slate-400 hover:text-[#004A99] transition-colors rounded-full hover:bg-slate-100">
            <Bell size={24} />
            <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#004A99] text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:bg-[#003B7A] transition-colors">
            {session.role === "ADMIN" ? "AD" : "DR"}
          </div>
        </div>
      </header>

      {/* Main Widgets */}
      <div className="space-y-6">
        <WelcomeBanner />

        {/* We use Suspense boundaries typically here to use the skeleton loaders */}
        <UrgentTasks pendingAppointments={pendingAppointments} />
        <StatsGrid doctors={doctors} />

        <div className="pt-4">
          <FinanceChart />
        </div>
      </div>
    </div>
  );
}
