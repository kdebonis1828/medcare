"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import {
  createStaffMember,
  updateStaffMember,
} from "@/lib/actions/staff.actions";

import { StaffWithUser } from "@/types";

export const StaffFormModal = ({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: StaffWithUser;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialData?.imageUrl || null,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    let result;
    if (initialData) {
      result = await updateStaffMember(initialData.id, {}, formData);
    } else {
      result = await createStaffMember({}, formData);
    }

    if (result.success) {
      onClose();
    } else {
      setError(result.message || "An error occurred");
    }
    setIsPending(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#004A99]">
            {initialData ? "Edit Staff Member" : "Register New Medical Staff"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          {/* Photo Upload Area */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 shrink-0 rounded-full bg-slate-100 border-2 border-dashed border-teal-200 overflow-hidden flex items-center justify-center relative">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="text-teal-400" size={24} />
              )}
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-700">Profile Photo</p>
              <p className="text-slate-500">Tap avatar to upload (Max 2MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                FULL NAME
              </label>
              <input
                required
                name="name"
                defaultValue={initialData?.name}
                placeholder="Dr. John Doe"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-700 font-medium"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                SPECIALTY
              </label>
              <input
                required
                name="specialty"
                defaultValue={initialData?.specialty}
                placeholder="e.g. Cardiology"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-700 font-medium"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                LICENSE / ROLE No.
              </label>
              <input
                name="licenseNumber"
                defaultValue={initialData?.licenseNumber || ""}
                placeholder="M.P. 129033 | Front Desk"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              INITIAL AVAILABILITY STATUS
            </label>
            <select
              name="status"
              defaultValue={initialData?.status || "AVAILABLE"}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm text-slate-700 font-medium cursor-pointer"
            >
              <option value="AVAILABLE">🟢 Available (Active Duty)</option>
              <option value="VACATION">🏖️ Vacation</option>
              <option value="MEDICAL_LEAVE">⚕️ Medical Leave</option>
              <option value="PERSONAL_REASONS">⏸️ Personal Reasons</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full mt-4 ${initialData ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30" : "bg-teal-500 hover:bg-teal-600 shadow-teal-500/30"} disabled:opacity-70 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98]`}
          >
            {isPending
              ? "Saving..."
              : initialData
                ? "Save Changes"
                : "Register Staff Member"}
          </button>
        </form>
      </div>
    </div>
  );
};
