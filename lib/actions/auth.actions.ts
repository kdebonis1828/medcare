"use server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { ActionState } from "@/types";

export async function loginAction(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      message: "Please provide both email and password.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { success: false, message: "Invalid credentials." };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, message: "Invalid credentials." };
  }

  // Create session
  await createSession(user.id, user.role);

  // Redirect to dashboard
  redirect("/dashboard");
}
