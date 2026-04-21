"use client";
import { useState, useActionState } from "react";
import { Plus, X } from "lucide-react";
import { createInternalMeeting } from "@/lib/actions/agenda.actions";

export const AgendaCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createInternalMeeting,
    null,
  );

  if (state?.success) {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#004A99] hover:bg-[#003B7A] text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-[#004A99]/20 transition-all active:scale-[0.98]"
      >
        <Plus size={20} />
        New Meeting
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-[#004A99]">
                Schedule Internal Meeting
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form action={formAction} className="p-6 space-y-4">
              {state?.message && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100">
                  {state.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  MEETING TITLE
                </label>
                <input
                  required
                  name="title"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004A99]/20 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  DATE & TIME
                </label>
                <input
                  type="datetime-local"
                  required
                  name="date"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004A99]/20 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004A99]/20 outline-none text-sm font-medium resize-none h-24"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-4 bg-[#004A99] hover:bg-[#003B7A] disabled:opacity-70 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {isPending ? "Scheduling..." : "Save Meeting"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
