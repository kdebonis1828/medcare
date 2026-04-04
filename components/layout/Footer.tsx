import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#003B7A] text-white pt-16 pb-8 border-t-[6px] border-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* PATIENTS */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="w-1.5 h-6 bg-teal-400 rounded-full inline-block"></span>
              For Patients
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Exam Preparation Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  List of Insurances
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Patient Rights & Responsibilities
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Frequently Asked Questions (FAQs)
                </Link>
              </li>
            </ul>
          </div>

          {/* MEDICAL DASHBOARD */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="w-1.5 h-6 bg-teal-400 rounded-full inline-block"></span>
              Corporate
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/login"
                  className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 mt-1 font-semibold text-white transition-all"
                >
                  Medical Staff Access (Dashboard)
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors mt-2 block"
                >
                  Careers / Join the Team
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="w-1.5 h-6 bg-teal-400 rounded-full inline-block"></span>
              Contact
            </h3>
            <div className="space-y-4 text-slate-300">
              <p className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                <svg
                  className="w-5 h-5 text-teal-400 mt-1 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Liberty Ave 1234, Downtown.
                  <br />
                  <span className="text-sm underline underline-offset-2 opacity-80">
                    Open in Google Maps
                  </span>
                </span>
              </p>
              <p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors mt-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path
                      fillRule="evenodd"
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-18.428A8.428 8.428 0 1012 20.428 8.428 8.428 0 0012 3.572z"
                      clipRule="evenodd"
                    />
                  </svg>
                  WhatsApp Inquiries
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} MedCare Clinic. All rights
            reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Legal Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
