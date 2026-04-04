"use client";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, HeartPulse } from "lucide-react";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth.actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes for a warm, modern feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-200/40 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl flex rounded-3xl shadow-2xl bg-white overflow-hidden relative z-10 m-4 border border-slate-100">
        {/* Left Side: Soft Image */}
        <div className="hidden lg:flex w-1/2 relative bg-teal-50 flex-col items-center justify-center p-12 text-center overflow-hidden">
          <Image
            src="/assets/login_background.png"
            alt="Warm clinic background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-teal-900/40 via-teal-900/20 to-teal-900/60 mix-blend-multiply" />

          <div className="relative z-10 mt-auto mb-10 text-white drop-shadow-lg">
            <HeartPulse className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Welcome Home, Doc.</h2>
            <p className="text-lg font-medium opacity-90 leading-relaxed">
              Log in to manage appointments, connect with patients, and oversee
              clinical excellence.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center lg:text-left">
              <Link href="/" className="inline-block mb-6 group">
                <span className="text-2xl font-extrabold tracking-tight text-[#004A99] group-hover:opacity-80 transition-opacity">
                  MedCare<span className="text-teal-500">.</span>
                </span>
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Staff Login
              </h1>
              <p className="text-slate-500 font-medium">
                Please enter your credentials to continue.
              </p>
            </div>

            <form className="space-y-6" action={formAction}>
              {state?.message && (
                <div className="bg-red-50 text-red-600 font-medium text-sm p-3 rounded-lg border border-red-100">
                  {state.message}
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Staff ID or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
                    placeholder="doctor@medcare.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#004A99] hover:bg-[#003B7A] disabled:opacity-70 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center"
                >
                  {isPending ? "Authenticating..." : "Access Dashboard"}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-slate-400 mt-8 font-medium">
              Secure administrative access is strictly monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
