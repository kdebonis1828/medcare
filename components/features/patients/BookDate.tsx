"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormData, InputSchema } from "@/schemas/date-form.schema";

export const BookDate = () => {
  const { register, handleSubmit } = useForm<InputFormData>({
    resolver: zodResolver(InputSchema),
  });

  const onSubmit: SubmitHandler<InputFormData> = (data) => {
    console.log("datos enviados", data);
  };

  console.log(variableinventada);
  const inputStyles =
    "bg-slate-100 border-slate-300 border shadow-xl text-black p-3 rounded-sm focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all";

  return (
    <div className="bg-slate-50 p-5 rounded-xl shadow-2xl shadow-slate-600">
      <h1 className="text-3xl font-bold mb-5 text-slate-800">
        Appointment Manager
      </h1>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="text-md text-slate-400 font-semibold">
          Name
        </label>
        <input
          className={inputStyles}
          placeholder="Enter your name"
          type="text"
          {...register("name", { required: true })}
        />
        <label
          htmlFor="lastname"
          className="text-md text-slate-400 font-semibold"
        >
          Lastname
        </label>
        <input
          className={inputStyles}
          type="text"
          {...register("lastname", { required: true })}
        />
        <label htmlFor="" className="text-md text-slate-400 font-semibold">
          Phone number
        </label>
        <input
          className={inputStyles}
          type="text"
          {...register("phone", { required: true })}
        />
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
        <label htmlFor="" className="text-md text-slate-400 font-semibold">
          Message
        </label>
        <input className={inputStyles} type="text" {...register("message")} />
        <button
          type="submit"
          className="bg-slate-800 font-bold text-xl mt-2 p-3 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};
