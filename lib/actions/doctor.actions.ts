"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { Status } from "@prisma/client";

export async function updateAppointmentStatus(id: string, status: Status) {
  try {
    const session = await getSession();
    if (!session || session.role !== "DOCTOR") {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error updating status";
    return { success: false, message };
  }
}

export async function createQuickNote(content: string) {
  try {
    const session = await getSession();
    if (!session || session.role !== "DOCTOR") {
      return { success: false, message: "Unauthorized" };
    }

    const staff = await prisma.staff.findUnique({
      where: { userId: session.userId as string },
    });

    if (!staff) {
      return { success: false, message: "Staff profile not found" };
    }

    await prisma.note.create({
      data: {
        content,
        doctorId: staff.id,
      },
    });

    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error creating note";
    return { success: false, message };
  }
}
