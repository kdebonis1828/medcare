import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Stethoscope } from "lucide-react";
import { StaffHeaderControls } from "./StaffHeaderControls";
import { StaffCard } from "@/components/features/dashboard/StaffCard";

import { StaffWithUser } from "@/types";

export default async function StaffManagerPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const staffMembers = (await prisma.staff.findMany({
    include: { user: true },
    orderBy: { isActive: "desc" },
  })) as StaffWithUser[];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header and Controls (Add Button) rendered in Client Component wrapper */}
      <StaffHeaderControls />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {staffMembers.map((doc) => (
          <StaffCard key={doc.id} doc={doc} />
        ))}

        {staffMembers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <Stethoscope size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">
              No Medical Staff Found
            </h3>
            <p className="text-slate-500 font-medium">
              Click &quot;Add Member&quot; to build your directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
