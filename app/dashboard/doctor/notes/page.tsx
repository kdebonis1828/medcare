import { Suspense } from "react";
import NotesGrid from "@/components/features/doctor/NotesGrid";
import { Loader2 } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Notes
        </h1>
        <p className="text-gray-500 mt-2">
          Manage and review your patient notes securely and privately.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading notes...</p>
          </div>
        }
      >
        <NotesGrid />
      </Suspense>
    </div>
  );
}
