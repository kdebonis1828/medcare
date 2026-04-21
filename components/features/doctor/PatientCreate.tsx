"use client";

import { useActionState } from "react";
import { createPatientAction } from "@/lib/actions/patient.actions";
import { User, Mail, Phone, PlusCircle } from "lucide-react";

export function PatientCreate() {
  const [state, formAction, isPending] = useActionState(
    createPatientAction,
    null,
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-black">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-blue-600" />
        New Patient
      </h2>

      <form action={formAction} className="space-y-4">
        {state && !state.success && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {state.error}
          </div>
        )}
        {state && state.success && (
          <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-100">
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Phone Number (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Creating..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
}
