"use client";
import { useState } from "react";
import Image from "next/image";
import { Stethoscope, Trash2, Edit2 } from "lucide-react";
import { deleteStaff } from "@/lib/actions/staff.actions";
import { StaffFormModal } from "./StaffFormModal";
import { StaffWithUser } from "@/types";

export const StaffCard = ({ doc }: { doc: StaffWithUser }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    await deleteStaff(doc.id, doc.userId);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative group overflow-hidden">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors border border-blue-100"
            title="Edit Member"
          >
            <Edit2 size={12} />
          </button>

          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors border border-red-100"
            title="Remove Member"
          >
            <Trash2 size={12} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 overflow-hidden shrink-0">
            {doc.imageUrl ? (
              <Image
                src={doc.imageUrl}
                alt={doc.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-teal-400">
                <Stethoscope size={18} />
              </div>
            )}
          </div>
          <div className="flex-1 truncate pr-8">
            <h3 className="font-extrabold text-slate-800 text-sm leading-tight truncate">
              {doc.name}
            </h3>
            <p className="text-[#004A99] font-bold text-[11px] truncate mt-0.5">
              {doc.specialty}
            </p>
            {doc.licenseNumber && (
              <p className="text-slate-400 font-medium text-[10px] truncate">
                {doc.licenseNumber}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                doc.status === "AVAILABLE"
                  ? "bg-green-500 shadow-green-500/50"
                  : doc.status === "VACATION"
                    ? "bg-amber-400 shadow-amber-400/50"
                    : doc.status === "MEDICAL_LEAVE"
                      ? "bg-rose-500 shadow-rose-500/50"
                      : "bg-slate-400 shadow-slate-400/50"
              } shadow-sm border-2 border-white`}
            />
            <span className="text-[10px] font-bold text-slate-500">
              {doc.status.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      <StaffFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={doc}
      />

      {/* Professional Deletion Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-100">
              <Trash2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Delete {doc.name}?
            </h2>
            <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
              This action cannot be undone. All data and access for this staff
              member will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
