"use client";
import {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  Users,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/agenda", label: "Agenda", icon: CalendarCheck },
  { href: "/dashboard/admin/staff", label: "Staff", icon: Stethoscope },
];

const DOCTOR_LINKS = [
  { href: "/dashboard/doctor", label: "Agenda", icon: CalendarCheck },
  { href: "/dashboard/doctor/patients", label: "Patients", icon: Users },
  { href: "/dashboard/doctor/notes", label: "Notes", icon: StickyNote },
];

export const NavbarMobile = () => {
  const pathname = usePathname();
  const isDoctor = pathname.startsWith("/dashboard/doctor");
  const links = isDoctor ? DOCTOR_LINKS : ADMIN_LINKS;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#003B7A] border-t border-[#002f63] z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-teal-400" : "text-slate-300 hover:text-white"
              }`}
            >
              <div
                className={`p-1 rounded-full ${isActive ? "bg-white/10" : ""}`}
              >
                <Icon size={22} className={isActive ? "text-teal-400" : ""} />
              </div>
              <span
                className={`text-[10px] font-semibold ${isActive ? "text-teal-400" : ""}`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
