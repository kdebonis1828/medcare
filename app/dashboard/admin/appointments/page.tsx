import { prisma } from "@/lib/prisma";
import { Search, CalendarDays } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

import { AppointmentWithDetails } from "@/types";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const awaitedParams = await searchParams;
  const query = (awaitedParams.q as string) || "";
  const currentPage = Number(awaitedParams.page) || 1;
  const ITEMS_PER_PAGE = 10;

  // Fetch total count for pagination indicators
  const totalItems = await prisma.appointment.count({
    where: {
      patient: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Fetch appointments matching patient name logic
  const appointments = (await prisma.appointment.findMany({
    where: {
      patient: {
        name: {
          contains: query,
          mode: "insensitive", // case-insensitive search
        },
      },
    },
    include: {
      patient: { include: { user: true } },
      doctor: { include: { user: true } },
    },
    orderBy: {
      date: "desc",
    },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })) as AppointmentWithDetails[];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Appointments Schedule
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Review the complete clinical timetable.
          </p>
        </div>

        {/* Generic Search Bar routing via Server queries requires a Client component usually, 
            but for a simple demo we can use a native HTML form submitting a GET request */}
        <form
          method="GET"
          action="/dashboard/admin/appointments"
          className="relative w-full md:w-96"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            name="q"
            defaultValue={query}
            className="w-full pl-10 pr-4 py-2.5 bg-white shadow-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004A99]/20 focus:border-[#004A99] outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
            placeholder="Search patient by name..."
          />
        </form>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-[#f8fafc] text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-4">
                  Patient
                </th>
                <th scope="col" className="px-6 py-4">
                  Specialist
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-400 font-medium"
                  >
                    <CalendarDays
                      size={48}
                      className="mx-auto text-slate-200 mb-2"
                    />
                    No appointments found matching your criteria.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {new Date(apt.date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#004A99]">
                      {apt.patient.name}
                    </td>
                    <td className="px-6 py-4">
                      {apt.doctor ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">
                            {apt.doctor.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          apt.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : apt.status === "PENDING"
                              ? "bg-amber-100 text-amber-800"
                              : apt.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-slate-500 max-w-xs truncate"
                      title={apt.reason}
                    >
                      {apt.reason}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing{" "}
            <span className="text-[#004A99]">{appointments.length}</span> of{" "}
            <span className="text-[#004A99]">{totalItems}</span> appointments
          </p>

          <div className="flex items-center gap-2">
            <a
              href={`/dashboard/appointments?page=${currentPage - 1}${query ? `&q=${query}` : ""}`}
              className={`px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 transition-all ${
                currentPage <= 1
                  ? "opacity-50 pointer-events-none bg-slate-100 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50 hover:border-[#004A99]/30"
              }`}
            >
              Previous
            </a>

            <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
              Page {currentPage} of {totalPages || 1}
            </div>

            <a
              href={`/dashboard/appointments?page=${currentPage + 1}${query ? `&q=${query}` : ""}`}
              className={`px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 transition-all ${
                currentPage >= totalPages
                  ? "opacity-50 pointer-events-none bg-slate-100 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50 hover:border-[#004A99]/30"
              }`}
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
