"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { ActionState } from "@/types";

export async function createInternalMeeting(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;

    await prisma.internalMeeting.create({
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMsg };
  }
}

export async function deleteMeeting(id: string) {
  try {
    await prisma.internalMeeting.delete({ where: { id } });
    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMsg };
  }
}
