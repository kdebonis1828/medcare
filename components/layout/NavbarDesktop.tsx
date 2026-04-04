"use client";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Stethoscope,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/agenda", label: "Agenda", icon: CalendarCheck },
  { href: "#pacientes", label: "Patients", icon: Users },
  { href: "/dashboard/staff", label: "Staff", icon: Stethoscope },
  { href: "#finanzas", label: "Finance", icon: Wallet },
  { href: "#ajustes", label: "Settings", icon: Settings },
];

export const NavbarDesktop = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#003B7A] text-white shadow-xl z-20">
      <div className="p-6">
        <Link href="/">
          <span className="text-3xl font-extrabold tracking-tight text-white mb-2 block">
            MedCare<span className="text-teal-400">.</span>
          </span>
        </Link>
        <span className="text-xs uppercase tracking-wider font-semibold text-teal-300">
          Admin Dashboard
        </span>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-2">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={isActive ? "text-white" : "text-teal-400"}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 mb-4 cursor-pointer hover:bg-white/10 transition">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold">
            DR
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">Dr. Reyes</p>
            <p className="text-xs text-teal-300 truncate">Administrator</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
};
