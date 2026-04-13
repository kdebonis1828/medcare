"use client";
import { useState } from "react";
import { Send, FileSignature } from "lucide-react";

export function ERezeptForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const medication = formData.get("medication") as string;
    const dose = formData.get("dose") as string;
    const duration = formData.get("duration") as string;
    const patientEmail = formData.get("patientEmail") as string;

    // Simulate API delay for e-mail dispatch
    setTimeout(() => {
      // Generate Client-Side Blob PDF (Simulated as text for now, could be passed to pdfmake)
      const content = `
        DIGITAL PRESCRIPTION (e-Rezept)
        -------------------------------
        Date: ${new Date().toLocaleDateString()}
        
        Medication: ${medication}
        Dose: ${dose}
        Duration: ${duration}
        patientEmail: ${patientEmail}
        Prescribed via MedCare Portal.
      `;

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `e-Rezept-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setLoading(false);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();

      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6 relative">
        <div className="p-2 bg-blue-50 text-[#003B7A] rounded-xl">
          <FileSignature size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            e-Rezept
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            Digital Prescription
          </p>
        </div>
        {success && (
          <span className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full animate-in fade-in">
            Sent successfully!
          </span>
        )}
      </div>

      <form
        onSubmit={handleGenerate}
        className="flex-1 flex flex-col gap-4 text-black"
      >
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Medication
          </label>
          <input
            name="medication"
            required
            type="text"
            placeholder="e.g. Amoxicillin 500mg"
            className="w-full bg-slate-200 shadow-2xl border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Dose
            </label>
            <input
              name="dose"
              required
              type="text"
              placeholder="1 pill every 8h"
              className="w-full bg-slate-200 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Duration
            </label>
            <input
              name="duration"
              required
              type="text"
              placeholder="7 days"
              className="w-full bg-slate-200 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-shadow"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Patient Email (Simulated)
          </label>
          <input
            name="patientEmail"
            required
            type="email"
            placeholder="patient@example.com"
            className="w-full bg-slate-200 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-shadow"
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003B7A] hover:bg-[#002f63] text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Send size={18} />
                Generate & Send eRezept
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
