export default function DoctorDashboardLoading() {
  return (
    <div className="p-6 md:p-8 animate-pulse space-y-8">
      {/* Search Bar Skeleton */}
      <div className="w-full max-w-xl mx-auto h-12 bg-slate-200 rounded-2xl"></div>

      {/* Hero Banner Skeleton */}
      <div className="w-full h-48 bg-slate-200 rounded-3xl"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (Agenda) Skeleton */}
        <div className="lg:col-span-8 space-y-4">
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-6"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-2xl w-full"></div>
          ))}
        </div>

        {/* Action Widgets Skeleton */}
        <div className="lg:col-span-4 space-y-8 h-full flex flex-col">
          <div className="h-[300px] bg-slate-200 rounded-3xl"></div>
          <div className="h-[250px] bg-slate-200 rounded-3xl hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}
