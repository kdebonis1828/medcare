"use client";
import {
  CalendarClock,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Prisma-Ready Interfaces
export interface ClinicDoctor {
  id: string;
  name: string;
  specialty: string;
  isActive: boolean;
}

import { StaffWithUser } from "@/types";

interface StatsGridProps {
  doctors?: StaffWithUser[];
  pendingCount?: number;
}

export const StatsGrid = ({
  doctors = [],
  pendingCount = 0,
}: StatsGridProps) => {
  const [staffPage, setStaffPage] = useState(0);

  const activeDoctors = doctors.filter(
    (doc) => doc.isActive && doc.status === "AVAILABLE",
  );
  if (activeDoctors.length === 0) {
    // Mocking fallback
    activeDoctors.push(
      {
        id: "1",
        name: "Dr. Reyes",
        specialty: "Gynecology",
        isActive: true,
        status: "AVAILABLE",
        licenseNumber: "M.P. 1",
        imageUrl: null,
        userId: "u1",
        user: {
          id: "u1",
          email: "reyes@med.com",
          password: "",
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "2",
        name: "Dr. Vall",
        specialty: "Surgery",
        isActive: true,
        status: "AVAILABLE",
        licenseNumber: "M.P. 2",
        imageUrl: null,
        userId: "u2",
        user: {
          id: "u2",
          email: "vall@med.com",
          password: "",
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: "3",
        name: "Dr. Navarro",
        specialty: "Pediatrics",
        isActive: false,
        status: "VACATION",
        licenseNumber: "M.P. 3",
        imageUrl: null,
        userId: "u3",
        user: {
          id: "u3",
          email: "navarro@med.com",
          password: "",
          role: "DOCTOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );
  }
  const itemsPerPage = 3;
  const totalPages = Math.ceil(activeDoctors.length / itemsPerPage);
  const paginatedStaff = activeDoctors.slice(
    staffPage * itemsPerPage,
    (staffPage + 1) * itemsPerPage,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Pending Appointments */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <CalendarClock size={64} className="text-[#004A99]" />
        </div>
        <div className="relative z-10">
          <h3 className="text-slate-500 font-bold text-sm mb-2 uppercase tracking-tight">
            Pending Appointments
          </h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-extrabold text-slate-800">
              {pendingCount}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Needs Confirmation
            </span>
          </div>
          <Link
            href="/dashboard/admin/appointments"
            className="inline-block text-sm font-bold text-[#004A99] hover:text-teal-600 transition-colors"
          >
            Review Schedule →
          </Link>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-start gap-y-4 min-h-[250px]">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-slate-500 font-bold text-sm uppercase tracking-tight">
            Available Staff
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setStaffPage((p) => Math.max(0, p - 1))}
              disabled={staffPage === 0}
              className="text-slate-400 hover:text-[#004A99] disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {staffPage + 1}/{totalPages || 1}
            </span>
            <button
              onClick={() =>
                setStaffPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={staffPage >= totalPages - 1}
              className="text-slate-400 hover:text-[#004A99] disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {paginatedStaff.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-[#004A99]">
                  {doc.name.charAt(4)} {/* Simplified initials */}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                  <p className="text-xs font-medium text-slate-400">
                    {doc.specialty}
                  </p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Histories */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-tight">
              Clinical Histories
            </h3>
            <FileText size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mb-1">+2.4K</p>
          <p className="text-sm font-medium text-slate-400">
            +12 new this month
          </p>
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-teal-50 text-[#004A99] border border-slate-200 hover:border-teal-200 font-bold py-2.5 rounded-xl transition-all">
          <Plus size={18} />
          Add Patient
        </button>
      </div>
    </div>
  );
};
