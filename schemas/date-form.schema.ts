import * as z from "zod";

export const InputSchema = z.object({
  name: z.string().min(2, "The name is too short"),
  lastname: z.string().min(2, "Lastname is too short"),
  phone: z.string().min(10, "The number should be a valid one").max(15),
  doctor: z.string(),
  email: z.string().includes("@", "Invalid email address"),
  message: z.string(),
});

export type InputFormData = z.infer<typeof InputSchema>;
