"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreateAppointmentInput {
  name: string;
  lastname: string;
  phone: string;
  doctorId?: string;
  message?: string;
}

export async function createAppointmentAction(
  formData: CreateAppointmentInput,
) {
  try {
    const { name, lastname, phone, doctorId, message } = formData;

    const fullName = `${name} ${lastname}`.trim();
    // Unique email placeholder since patient email wasn't captured in this simple form
    const fallbackEmail = `${phone.replace(/[^0-9]/g, "")}@patient.medcare.com`;

    // 1. Create or Find Patient
    const userPatient = await prisma.user.upsert({
      where: { email: fallbackEmail },
      update: {},
      create: {
        email: fallbackEmail,
        password: "NoPasswordRequiredForFormAuth",
        role: "PATIENT",
        patientProfile: {
          create: {
            name: fullName,
            phone: phone,
          },
        },
      },
      include: {
        patientProfile: true,
      },
    });

    const patientId = userPatient.patientProfile?.id;

    if (!patientId) {
      throw new Error("Failed to resolve Patient ID.");
    }

    // 2. Schedule Appointment
    await prisma.appointment.create({
      data: {
        date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Scheuled roughly 24h from now conceptually
        reason: message || "General Consultation via Web",
        status: "PENDING",
        doctorId: doctorId,
        patientId: patientId,
      },
    });

    // 3. Revalidate Dashboard so Admin sees it immediately
    revalidatePath("/dashboard");

    return { success: true };
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error creating appointment:", err);
    return { success: false, message: error };
  }
}
