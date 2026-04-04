"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(
  id: string,
  status: "APPROVED" | "REJECTED",
) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
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
