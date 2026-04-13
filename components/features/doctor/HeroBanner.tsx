"use client";
import { format } from "date-fns";

export function HeroBanner({
  doctorName,
  appointmentCount,
}: {
  doctorName: string;
  appointmentCount: number;
}) {
  const today = new Date();

  return (
    <div className="bg-linear-to-br from-[#003B7A] to-[#005bb5] rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            Welcome back, <span className="text-teal-300"> {doctorName}</span>
          </h1>
          <p className="text-blue-100 font-medium text-lg">
            You have{" "}
            <span className="text-white font-bold">{appointmentCount}</span>{" "}
            appointments scheduled for today.
          </p>
        </div>

        {/* Compact Calendar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
          <p className="text-teal-300 font-bold uppercase tracking-wider text-xs mb-1">
            {format(today, "MMMM")}
          </p>
          <p className="text-4xl font-black">{format(today, "dd")}</p>
          <p className="text-blue-100 font-medium text-sm mt-1">
            {format(today, "EEEE")}
          </p>
        </div>
      </div>
    </div>
  );
}
