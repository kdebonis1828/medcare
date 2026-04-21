"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function deleteNote(noteId: string) {
  const session = await getSession();
  if (!session || session.role !== "DOCTOR") {
    throw new Error("Unauthorized");
  }

  const staff = await prisma.staff.findUnique({
    where: { userId: session.userId as string },
  });

  if (!staff) {
    throw new Error("Doctor profile not found");
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note || note.doctorId !== staff.id) {
    throw new Error("Note not found or unauthorized");
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  revalidatePath("/dashboard/doctor/notes");
  redirect("/dashboard/doctor/notes");
}
