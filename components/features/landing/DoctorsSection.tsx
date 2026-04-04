import { MedicalCard } from "./MedicalCard";

interface StaffProps {
  staff: {
    name: string;
    specialty: string;
    licenseNumber: string | null;
    imageUrl: string | null;
  }[];
}

export const DoctorsSection = ({ staff = [] }: StaffProps) => {
  return (
    <section id="staff" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004A99] mb-4 tracking-tight">
            Our Medical Team: <br className="hidden md:block" />
            <span className="text-teal-500">
              Excellence in every specialty.
            </span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Professionals selected for their rigorous academic track record and,
            above all, their great human quality. Your comprehensive well-being
            is our top priority.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {staff.map((doc, idx) => (
            <MedicalCard
              key={idx}
              name={doc.name}
              specialty={doc.specialty}
              matriculet={doc.licenseNumber || ""}
              imageUrl={doc.imageUrl || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
