"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export function OmniSearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // In a real app we'd trigger a router.push or fetch action based on debouncedQuery
  // For now, we simulate optimistic UI search

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:ring-2 focus:ring-teal-500 focus:outline-none text-slate-700 font-medium placeholder-slate-400 transition-shadow"
        placeholder="Search patients by name, DNI or history..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {debouncedQuery && (
        <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 py-3 text-sm text-slate-500 border-b border-slate-50">
            Searching for &quot;{debouncedQuery}&quot;...
          </div>
          <div className="p-4 text-center text-sm text-slate-400">
            Search functionality connected to API
          </div>
        </div>
      )}
    </div>
  );
}
