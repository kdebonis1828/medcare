"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormData, InputSchema } from "@/schemas/date-form.schema";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const BookDate = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm<InputFormData>({
    resolver: zodResolver(InputSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<InputFormData> = (data) => {
    console.log("datos enviados", data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const inputStyles =
    "bg-slate-100 border-slate-300 border shadow-xl text-black p-3 rounded-sm focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all";

  return (
    <div className="flex lg:w-[80%]">
      <div className="hidden lg:block">
        <Image
          alt="Medical image"
          src="/assets/medform.jpg"
          className="w-650 h-full rounded-bl-xl rounded-tl-xl shadow-2xl"
          width={1200}
          height={1200}
        />
      </div>
      <div className="bg-slate-50 relative z-10 p-5 rounded-xl lg:rounded-tl-none lg:rounded-bl-none  lg:rounded-tr-xl lg:rounded-br-xl shadow-2xl shadow-slate-600 md:w-150 lg:w-450">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 text-center">
          Appointment Manager
        </h1>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col min-h-22">
            <label
              htmlFor="name"
              className="text-md text-slate-400 font-semibold"
            >
              Name
            </label>
            <input
              className={inputStyles}
              placeholder="Enter your name"
              type="text"
              {...register("name", { required: true })}
            />
            <div className="h-5">
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col min-h-22">
            <label
              htmlFor="lastname"
              className="text-md text-slate-400  font-semibold"
            >
              Lastname
            </label>
            <input
              className={inputStyles}
              type="text"
              placeholder=""
              {...register("lastname", { required: true })}
            />
          </div>

          <div className="flex flex-col min-h-22">
            <label htmlFor="" className="text-md text-slate-400 font-semibold">
              Phone number
            </label>
            <input
              className={inputStyles}
              type="text"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="flex flex-col min-h-22">
            <label htmlFor="" className="text-md text-slate-400 font-semibold">
              Speciality
            </label>
            <select
              className={inputStyles}
              {...register("doctor", { required: true })}
            >
              <option value="Doctor-1">Doctor 1</option>
              <option value="Doctor-2">Doctor 2</option>
              <option value="Doctor-3">Doctor 3</option>
            </select>
          </div>
          <div className="flex flex-col min-h-22">
            <label htmlFor="" className="text-md text-slate-400 font-semibold">
              Message
            </label>
            <textarea
              className={`${inputStyles} h-30 resize-none`}
              {...register("message")}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-slate-800 shadow-2xl font-bold text-xl mt-2 p-3 rounded-md w-full"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};
