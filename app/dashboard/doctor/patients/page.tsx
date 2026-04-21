import { PatientsGrid } from "@/components/features/doctor/PatientsGrid";
import { PatientCreate } from "@/components/features/doctor/PatientCreate";
import { Suspense } from "react";
import { Users, Loader2 } from "lucide-react";

export const metadata = {
  title: "Patients | MedCare Dashboard",
};

export default async function PatientsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Patient Directory
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your patients and access their clinical histories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Main Grid: Patients List */}
        <section className="xl:col-span-8 order-2 xl:order-1">
          <Suspense
            key={page}
            fallback={
              <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl border border-slate-200">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            }
          >
            <PatientsGrid page={page} />
          </Suspense>
        </section>

        {/* Side Panel: Create Patient */}
        <section className="xl:col-span-4 order-1 xl:order-2 sticky top-8">
          <PatientCreate />
        </section>
      </div>
    </div>
  );
}
