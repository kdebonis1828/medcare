import { MedicalCard } from "./MedicalCard";

const DOCTORS_DATA = [
  {
    name: "Dr. Elena Reyes",
    specialty: "Gynecology",
    matriculet: "M.P. 45892 | M.N. 112344",
    imageUrl: "/assets/doctor_avatar_1.png",
  },
  {
    name: "Dr. Marcos Vall",
    specialty: "General Surgery",
    matriculet: "M.P. 32112 | M.N. 98455",
    imageUrl: "/assets/doctor_avatar_2.png",
  },
  {
    name: "Dr. Sofia Navarro",
    specialty: "Comprehensive Pediatrics",
    matriculet: "M.P. 51009 | M.N. 129033",
    imageUrl: "/assets/doctor_avatar_3.png",
  },
  {
    name: "Clara Johansson",
    specialty: "Patient Relations",
    matriculet: "First point of contact",
    imageUrl: "/assets/receptionist_1.png",
  },
  {
    name: "Thomas Miller",
    specialty: "Front Desk Coordinator",
    matriculet: "Appointments & Guidance",
    imageUrl: "/assets/receptionist_2.png",
  },
];

export const DoctorsSection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {DOCTORS_DATA.map((doc, idx) => (
            <MedicalCard
              key={idx}
              name={doc.name}
              specialty={doc.specialty}
              matriculet={doc.matriculet}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
