import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { FileText, Calendar, Clock, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function NotesGrid() {
  const session = await getSession();

  if (!session || session.role !== "DOCTOR") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50/50 rounded-2xl border border-red-100">
        <p className="text-red-600 font-medium">
          Unauthorized access or the session has expired.
        </p>
      </div>
    );
  }

  // Find the doctor's profile
  const staff = await prisma.staff.findUnique({
    where: { userId: session.userId as string },
  });

  if (!staff) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-amber-50/50 rounded-2xl border border-amber-100">
        <p className="text-amber-600 font-medium">Doctor profile not found.</p>
      </div>
    );
  }

  // Fetch only this doctor's notes
  const notes = await prisma.note.findMany({
    where: { doctorId: staff.id },
    orderBy: { createdAt: "desc" },
    include: {
      patient: true, // Include patient info if associated
    },
  });

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No notes found</h3>
        <p className="text-gray-500 max-w-sm">
          You haven&apos;t created any notes yet. Your clinical notes will
          appear here once you add them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="group relative flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Decorative Background Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50 to-indigo-50/20 rounded-bl-[100px] z-0 transition-all duration-500 group-hover:scale-110 opacity-70" />

          {/* Header section */}
          <div className="flex justify-between items-start mb-4 z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Clinical note
                </p>
                {note.patient ? (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <UserIcon className="w-3 h-3" />
                    {note.patient.name}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">General note</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-gray-500 flex items-center justify-end gap-1 mb-1 capitalize">
                <Calendar className="w-3 h-3" />
                {format(new Date(note.createdAt), "MMM d, yyyy", {
                  locale: es,
                })}
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-end gap-1 uppercase">
                <Clock className="w-3 h-3" />
                {format(new Date(note.createdAt), "h:mm a")}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 z-10 mt-2">
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 group-hover:bg-blue-50/30 transition-colors duration-300">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                {note.content}
              </p>
            </div>
          </div>

          {/* Footer actions or extra info */}
          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between z-10">
            <span className="text-[10px] font-medium px-2.5 py-1 bg-gray-50 text-gray-400 rounded-full uppercase tracking-wider">
              ID: {note.id.split("-")[0]}
            </span>
            <Link
              href={`/dashboard/doctor/notes/${note.id}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300"
            >
              View Details &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
