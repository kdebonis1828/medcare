import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export async function PatientsGrid({ page = 1 }: { page?: number }) {
  const session = await getSession();

  if (!session || session.role !== "DOCTOR") {
    return null;
  }

  const staff = await prisma.staff.findUnique({
    where: { userId: session.userId as string },
  });

  if (!staff) return null;

  const limit = 6;
  const skip = (page - 1) * limit;

  const whereCondition = {
    OR: [
      { appointments: { some: { doctorId: staff.id } } },
      { notes: { some: { doctorId: staff.id } } },
    ],
  };

  const [patients, totalPatients] = await Promise.all([
    prisma.patient.findMany({
      where: whereCondition,
      include: {
        user: true,
        appointments: {
          where: { doctorId: staff.id },
          orderBy: { date: "desc" },
          take: 1,
        },
      },
      orderBy: {
        name: "asc",
      },
      take: limit,
      skip: skip,
    }),
    prisma.patient.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(totalPatients / limit);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Link
            href={`/dashboard/doctor/patients/${patient.id}`}
            key={patient.id}
            className="block group"
          >
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-all group-hover:border-blue-200 cursor-pointer flex flex-col gap-4 h-full">
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-slate-500">Patient</p>
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{patient.user.email}</span>
                </div>
                {patient.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{patient.phone}</span>
                  </div>
                )}
              </div>

              {patient.appointments.length > 0 && (
                <div className="pt-4 border-t border-slate-100 mt-2">
                  <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Last Appointment
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(
                        patient.appointments[0].date,
                      ).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {new Date(
                        patient.appointments[0].date,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}

        {patients.length === 0 && (
          <div className="col-span-full py-16 px-6 text-center bg-slate-50 rounded-xl border-2 border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              No patients found
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              You don&apos;t have any patients linked to your profile yet.
              Create a new patient profile using the form to get started.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <Link
            href={`?page=${Math.max(page - 1, 1)}`}
            className={`p-2 rounded-lg border border-slate-200 transition-colors ${page <= 1 ? "opacity-50 pointer-events-none text-slate-400" : "hover:bg-slate-50 text-slate-700"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm text-slate-600 font-medium">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`?page=${Math.min(page + 1, totalPages)}`}
            className={`p-2 rounded-lg border border-slate-200 transition-colors ${page >= totalPages ? "opacity-50 pointer-events-none text-slate-400" : "hover:bg-slate-50 text-slate-700"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
