import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import DeleteNoteButton from "@/components/features/doctor/DeleteNoteButton";

export default async function NotesIdPage({
  params,
}: {
  params: Promise<{ notes_id: string }>;
}) {
  const { notes_id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id: notes_id,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/doctor/notes"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to notes
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden relative">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-blue-50 via-indigo-50/30 to-transparent rounded-bl-full pointer-events-none" />

        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100/50 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Note detail
              </h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                ID: {note.id.split("-")[0]}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-500 bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-gray-700 capitalize">
                {format(new Date(note.createdAt), "EEEE, d 'de' MMMM, yyyy", {
                  locale: enUS,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{format(new Date(note.createdAt), "h:mm a")}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 relative z-10">
          {note.patient && (
            <div className="mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Assigned patient
                </p>
                <p className="text-gray-900 font-medium">{note.patient.name}</p>
              </div>
            </div>
          )}

          <div className="max-w-none">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Note Content
            </h3>
            <div className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[200px] text-base md:text-lg shadow-inner">
              {note.content}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs text-gray-400">
            Last updated: {format(new Date(note.updatedAt), "dd/MM/yyyy HH:mm")}
          </p>
          <DeleteNoteButton noteId={note.id} />
        </div>
      </div>
    </div>
  );
}
