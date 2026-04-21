import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Calendar } from "lucide-react";

export const WelcomeBanner = async () => {
  const today = new Date();
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  const miniCalendarDays = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - 1 + i); // Yesterday, Today, Tomorrow, Day after
    return {
      date: d.getDate(),
      dayName: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d),
      isToday: i === 1, // Today is the second item (index 1)
    };
  });

  const session = await getSession();
  const user = await prisma.staff.findUnique({
    where: { userId: session?.userId as string },
  });

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center shadow-sm border border-slate-100">
      <div className="text-center md:text-left mb-6 md:mb-0">
        <span className="text-teal-600 font-bold uppercase tracking-wider text-xs mb-2 block">
          General Overview
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#004A99] mb-2 leading-tight">
          Good morning, {user?.name} <br className="hidden md:block" />
          Here is how the clinic looks today.
        </h1>
        <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
          <Calendar size={16} />
          <span className="capitalize">{currentDate}</span>
        </p>
      </div>

      {/* Mini-Calendar Concept / Right Widget */}
      <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-3">
          <button className="text-slate-400 hover:text-teal-600">←</button>
          <span className="text-sm font-bold text-slate-700">Today</span>
          <button className="text-slate-400 hover:text-teal-600">→</button>
        </div>
        <div className="flex justify-between w-full text-center text-xs font-semibold text-slate-500">
          {miniCalendarDays.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${
                day.isToday
                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                  : "hover:bg-white text-slate-500"
              }`}
            >
              <span>{day.dayName}</span>
              <span
                className={`text-lg mt-1 ${day.isToday ? "text-white" : "text-slate-800"}`}
              >
                {day.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
