import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormData, InputSchema } from "@/schemas/date-form.schema";
import { createAppointmentAction } from "@/lib/actions/appointment.actions";

export const useBookForm = () => {
  const [showModal, setShowModal] = useState(false);

  const form = useForm<InputFormData>({
    resolver: zodResolver(InputSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<InputFormData> = async (data) => {
    const res = await createAppointmentAction({
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      doctorId: data.doctor,
      email: data.email,
      message: data.message,
    });

    if (res.success) {
      setShowModal(true);
      form.reset();
    } else {
      alert("There was an error booking your appointment. Please try again.");
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    showModal,
    setShowModal,
  };
};
