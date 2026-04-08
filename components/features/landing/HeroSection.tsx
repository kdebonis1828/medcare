import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_medical_team.png"
          alt="MedCare Medical Team"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for text readability (Corporate Blue to transparent) */}
        <div className="absolute inset-0 bg-linear-to-r from-[#004A99]/90 via-[#004A99]/60 to-[#004A99]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 pt-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Because your well-being <br />
            <span className="text-teal-300">is our only priority.</span>
          </h1>
          <h2 className="text-lg md:text-xl text-slate-100 font-medium mb-10 leading-relaxed max-w-xl">
            We understand that navigating healthcare can be overwhelming. That
            is why we are here to listen, support, and provide the world-class
            care you and your loved ones deserve.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <Link
              href="#contacto"
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-teal-900/20 transition-all text-center"
            >
              Book Appointment Now
            </Link>
            <Link
              href="#staff"
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-bold text-lg px-8 py-4 rounded-xl transition-all text-center"
            >
              Meet the Staff
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
