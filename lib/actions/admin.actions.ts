"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(
  id: string,
  status: "APPROVED" | "REJECTED",
  date?: Date,
) {
  try {
    if (status === "APPROVED") {
      const appointmentToUpdate = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointmentToUpdate) {
        return { success: false, message: "Appointment not found" };
      }

      if (appointmentToUpdate.doctorId) {
        const checkDate = date || appointmentToUpdate.date;
        const conflict = await prisma.appointment.findFirst({
          where: {
            doctorId: appointmentToUpdate.doctorId,
            date: checkDate,
            status: {
              in: ["APPROVED", "COMPLETED"],
            },
            id: {
              not: id,
            },
          },
        });

        if (conflict) {
          return {
            success: false,
            message:
              "The doctor already has an appointment scheduled at this time.",
          };
        }
      }
    }

    await prisma.appointment.update({
      where: { id },
      data: {
        status,
        ...(date && { date }),
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { success: false, message: errorMsg };
  }
}

export async function deleteStaffMember(id: string, userId: string) {
  try {
    // Delete Staff profile. Cascades to User if we had it set up that way, otherwise we delete User
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { success: false, message: errorMsg };
  }
}
