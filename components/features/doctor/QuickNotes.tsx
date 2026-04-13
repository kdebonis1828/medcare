"use client";
import { useState, useTransition } from "react";
import { StickyNote, Save } from "lucide-react";
import { createQuickNote } from "@/lib/actions/doctor.actions";

export function QuickNotes() {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const handleSave = () => {
    if (!content.trim()) return;

    setSaveStatus("saving");
    startTransition(async () => {
      const result = await createQuickNote(content);
      if (result.success) {
        setSaveStatus("saved");
        setContent(""); // Clear scratchpad after save
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="bg-[#fff9c4] rounded-3xl p-6 md:p-8 shadow-sm border border-yellow-200 h-full flex flex-col relative overflow-hidden group transition-all hover:shadow-md">
      {/* Pin decorative element */}
      <div className="absolute top-4 left-1/2 -translateX-1/2 w-8 h-8 flex justify-center z-10 opacity-50">
        <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
      </div>

      <div className="flex items-center justify-between mb-4 mt-2">
        <div className="flex items-center gap-2 text-yellow-800 font-bold tracking-tight">
          <StickyNote size={20} />
          <span>Scratchpad</span>
        </div>

        <div className="text-xs font-semibold">
          {saveStatus === "saving" && (
            <span className="text-yellow-600 animate-pulse">Saving...</span>
          )}
          {saveStatus === "saved" && (
            <span className="text-green-600">Saved to Notes</span>
          )}
          {saveStatus === "error" && (
            <span className="text-red-500">Error saving</span>
          )}
          {saveStatus === "idle" && (
            <span className="text-yellow-700/50 hidden group-hover:block">
              Ctrl+Enter to save
            </span>
          )}
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Jot down quick evolution notes, reminders or observations here..."
        className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 outline-none text-yellow-900 placeholder-yellow-700/40 text-sm leading-relaxed"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending || !content.trim()}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-xl text-sm transition-all disabled:opacity-50 active:scale-95"
        >
          <Save size={16} />
          Save Note
        </button>
      </div>
    </div>
  );
}
