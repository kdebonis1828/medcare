"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { StaffFormModal } from "@/components/features/dashboard/StaffFormModal";

export const StaffHeaderControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#004A99] tracking-tight">
            Staff Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Control access, specialties, and duty statuses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-teal-500/20 transition-all active:scale-[0.98]"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <StaffFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
