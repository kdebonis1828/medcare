"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { PatientActionState } from "@/types";

export async function createPatientAction(
  prevState: PatientActionState,
  formData: FormData,
): Promise<PatientActionState> {
  try {
    const session = await getSession();
    if (!session || session.role !== "DOCTOR") {
      return { success: false, error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!name || !email) {
      return { success: false, error: "Name and email are required" };
    }

    const staff = await prisma.staff.findUnique({
      where: { userId: session.userId as string },
    });

    if (!staff) {
      return { success: false, error: "Doctor profile not found" };
    }

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "A user with this email already exists" };
    }

    // Generate random password for the patient (they can reset it later)
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "PATIENT",
        patientProfile: {
          create: {
            name,
            phone,
          },
        },
      },
      include: {
        patientProfile: true,
      },
    });

    const newPatient = newUser.patientProfile;

    if (newPatient) {
      // Create an initial note so the patient is linked to this doctor
      await prisma.note.create({
        data: {
          content: "Patient registered by doctor.",
          doctorId: staff.id,
          patientId: newPatient.id,
        },
      });
    }

    revalidatePath("/dashboard/doctor/patients");
    return { success: true, message: "Patient created successfully" };
  } catch (error) {
    console.error("Error creating patient:", error);
    return {
      success: false,
      error: "Failed to create patient. Please try again.",
    };
  }
}
