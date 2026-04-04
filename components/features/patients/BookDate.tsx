"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormData, InputSchema } from "@/schemas/date-form.schema";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ModalDateRequest } from "./ModalDateRequest";

import { createAppointmentAction } from "@/lib/actions/appointment.actions";

interface BookDateProps {
  doctors: { id: string; name: string; specialty: string }[];
}

export const BookDate = ({ doctors = [] }: BookDateProps) => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputFormData>({
    resolver: zodResolver(InputSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<InputFormData> = async (data) => {
    // We send data including doctorId to Server Action
    const res = await createAppointmentAction({
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      doctorId: data.doctor, // We are reusing the 'doctor' combobox to store the ID
      message: data.message,
    });

    if (res.success) {
      setShowModal(true);
      reset();
    } else {
      alert("There was an error booking your appointment. Please try again.");
    }
  };

  const inputStyles =
    "w-full bg-white border border-teal-100 shadow-sm text-sm text-slate-700 p-2.5 rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-300 outline-none transition-all placeholder:text-slate-300";

  return (
    <div className="flex w-[calc(100%-2rem)] sm:w-[90%] max-w-5xl mx-auto bg-white overflow-hidden shadow-2xl shadow-teal-900/10 rounded-3xl border border-teal-50 my-6">
      <div className="hidden lg:block relative w-5/12 bg-teal-50">
        <Image
          alt="Medical appointment"
          src="/assets/form_appointment.png"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-teal-900/20 to-transparent mix-blend-multiply" />
      </div>

      <div className="w-full lg:w-7/12 p-6 sm:p-8 md:p-10 bg-linear-to-br from-slate-100 to-slate-400/60">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1.5 text-teal-950 text-center tracking-tight">
            Appointment Manager
          </h1>
          <p className="text-sm text-teal-600/80 text-center mb-6 font-medium">
            Schedule your visit with our specialists
          </p>

          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="name"
                  className="text-xs text-teal-800 font-bold mb-1 ml-1 tracking-wide"
                >
                  NAME
                </label>
                <input
                  id="name"
                  className={inputStyles}
                  placeholder="Enter your name"
                  type="text"
                  {...register("name", { required: true })}
                />
                <div className="h-3 ml-1 mt-0.5">
                  {errors.name && (
                    <p className="text-rose-500 text-[11px] font-medium leading-none">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <label
                  htmlFor="lastname"
                  className="text-xs text-teal-800 font-bold mb-1 ml-1 tracking-wide"
                >
                  LASTNAME
                </label>
                <input
                  id="lastname"
                  className={inputStyles}
                  type="text"
                  placeholder="Enter your lastname"
                  {...register("lastname", { required: true })}
                />
                <div className="h-3 ml-1 mt-0.5">
                  {errors.lastname && (
                    <p className="text-rose-500 text-[11px] font-medium leading-none">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="phone"
                  className="text-xs text-teal-800 font-bold mb-1 ml-1 tracking-wide"
                >
                  PHONE
                </label>
                <input
                  id="phone"
                  className={inputStyles}
                  placeholder="+49 123 4567890"
                  type="text"
                  {...register("phone", { required: true })}
                />
                <div className="h-3 ml-1 mt-0.5">
                  {errors.phone && (
                    <p className="text-rose-500 text-[11px] font-medium leading-none">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <label
                  htmlFor="doctor"
                  className="text-xs text-teal-800 font-bold mb-1 ml-1 tracking-wide"
                >
                  SPECIALITY
                </label>
                <select
                  id="doctor"
                  className={inputStyles}
                  {...register("doctor", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a professional
                  </option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {doc.specialty}
                    </option>
                  ))}
                </select>
                <div className="h-3 ml-1 mt-0.5" />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-xs text-teal-800 font-bold mb-1 ml-1 tracking-wide"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                className={`${inputStyles} h-24 resize-none`}
                {...register("message")}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-linear-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md shadow-teal-200/50 font-bold text-base mt-1 py-3 rounded-xl w-full transition-all"
            >
              Request Appointment
            </motion.button>
          </form>
        </div>
      </div>

      <ModalDateRequest
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
