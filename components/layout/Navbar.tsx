"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span
              className={`text-2xl font-extrabold tracking-tight ${isScrolled ? "text-[#004A99]" : "text-white"}`}
            >
              MedCare
              <span className={isScrolled ? "text-teal-500" : "text-teal-300"}>
                .
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="#staff"
            className={`text-[1.05rem] tracking-wide hover:text-teal-400 transition-colors ${isScrolled ? "font-medium text-slate-600" : "font-normal text-white/95"}`}
          >
            Medical Staff
          </Link>
          <Link
            href="#especialidades"
            className={`text-[1.05rem] tracking-wide hover:text-teal-400 transition-colors ${isScrolled ? "font-medium text-slate-600" : "font-normal text-white/95"}`}
          >
            Specialties
          </Link>
          <Link
            href="#coberturas"
            className={`text-[1.05rem] tracking-wide hover:text-teal-400 transition-colors ${isScrolled ? "font-medium text-slate-600" : "font-normal text-white/95"}`}
          >
            Insurance
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="#portal"
            className={`hidden lg:block font-semibold px-5 py-2 rounded-full border-2 transition-all ${
              isScrolled
                ? "border-[#004A99] text-[#004A99] hover:bg-[#004A99] hover:text-white"
                : "border-white/80 text-white hover:bg-white hover:text-[#004A99]"
            }`}
          >
            Patient Portal
          </Link>
          <Link
            href="#contacto"
            className={`font-bold px-6 py-2.5 rounded-full transition-shadow shadow-lg ${
              isScrolled
                ? "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/30"
                : "bg-teal-400 hover:bg-teal-300 text-[#004A99] shadow-black/10"
            }`}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};
