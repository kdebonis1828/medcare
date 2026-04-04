import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";
import { StaffStatus, Prisma } from "@prisma/client";

export async function createStaffMember(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const specialty = formData.get("specialty") as string;
    const licenseNumber = formData.get("licenseNumber") as string;
    const status = formData.get("status") as StaffStatus;
    const file = formData.get("photo") as File | null;

    let imageUrl = "/assets/doctor_avatar_1.png"; // Fallback placeholder

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    // Since Staff requires a User mapping, we synthesize a user profile
    const fallbackEmail = `${name.replace(/\s+/g, "").toLowerCase()}${Date.now()}@medcare.com`;

    const user = await prisma.user.create({
      data: {
        email: fallbackEmail,
        password: "SystemGeneratedForStaffNoLogin", // Not meant to actually log in unless admin gives them credentials over DB
        role: "DOCTOR",
        staffProfile: {
          create: {
            name,
            specialty,
            licenseNumber,
            status: status || "AVAILABLE",
            isActive: true, // We map inactive physically later if needed
            imageUrl,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/staff");

    return { success: true, user };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Action error:", error);
    return { success: false, message: errorMessage };
  }
}

export async function updateStaffMember(
  id: string,
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const specialty = formData.get("specialty") as string;
    const licenseNumber = formData.get("licenseNumber") as string;
    const status = formData.get("status") as StaffStatus;
    const file = formData.get("photo") as File | null;

    const updateData: Prisma.StaffUpdateInput = {
      name,
      specialty,
      licenseNumber,
      status: status || "AVAILABLE",
    };

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      updateData.imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    await prisma.staff.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");
    revalidatePath("/dashboard/staff");

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}

export async function deleteStaff(id: string, userId: string) {
  try {
    // Cascade delete of User deletes Staff Profile attached
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/staff");
    return { success: true };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}

export async function updateStaffStatus(
  id: string,
  newStatus: "AVAILABLE" | "VACATION" | "MEDICAL_LEAVE" | "PERSONAL_REASONS",
) {
  try {
    await prisma.staff.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/staff");
    return { success: true };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}
