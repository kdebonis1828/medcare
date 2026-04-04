import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/landing/HeroSection";
import { DoctorsSection } from "@/components/features/landing/DoctorsSection";
import { BookDate } from "@/components/features/patients/BookDate";
import { prisma } from "@/lib/prisma";
import { StaffWithUser } from "@/types";

export default async function Home() {
  const staffMembers = await prisma.staff.findMany({
    where: { isActive: true },
    include: { user: true },
  });

  const doctorsOnly = (staffMembers as StaffWithUser[]).filter(
    (s) => s.user.role === "DOCTOR",
  );
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 bg-slate-50">
        <HeroSection />
        <DoctorsSection staff={staffMembers} />

        {/* Contact / Appoinment Section */}
        <section
          id="contacto"
          className="pt-16 pb-24 bg-slate-50 relative"
          aria-labelledby="appointment-heading"
        >
          {/* Accessible off-screen text for screen readers */}
          <span className="sr-only" id="appointment-heading">
            Book your appointment online
          </span>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <h2
              className="text-3xl font-extrabold text-[#004A99] mb-4"
              aria-hidden="true"
            >
              Ready to take the next step?
            </h2>
            <p
              className="text-slate-600 font-medium text-lg leading-relaxed"
              aria-hidden="true"
            >
              Schedule your visit using our secure form below. Let our friendly
              staff assist you with the care you deserve.
            </p>
          </div>

          <BookDate doctors={doctorsOnly} />
        </section>
      </main>
      <Footer />
    </>
  );
}
