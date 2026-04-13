import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing items to avoid conflicts on repeated seeds
  await prisma.appointment.deleteMany({});
  await prisma.staff.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.user.deleteMany({});

  const defaultPassword = await bcrypt.hash("Password123!", 10);

  // --- ADMINS ---
  const admin1 = await prisma.user.create({
    data: {
      email: "admin@medcare.com",
      password: defaultPassword,
      role: "ADMIN",
    },
  });
  console.log("Created Admin:", admin1.email);

  const admin2 = await prisma.user.create({
    data: {
      email: "manager@medcare.com",
      password: defaultPassword,
      role: "ADMIN",
    },
  });

  // TEST DOCTOR
  const testDoctor = await prisma.user.create({
    data: {
      email: "testdoctor@medcare.com",
      password: defaultPassword,
      role: "DOCTOR",
      staffProfile: {
        create: {
          name: "Test Doctor",
          specialty: "Test Specialty",
        },
      },
    },
    include: { staffProfile: true },
  });

  // --- DOCTORS ---
  // Create Doctors alongside their User accounts
  const docsData = [
    {
      name: "Dr. Elena Reyes",
      email: "elena.reyes@medcare.com",
      specialty: "Gynecology",
      licenseNumber: "M.P. 45892 | M.N. 112344",
      imageUrl: "/assets/doctor_avatar_1.png",
      isActive: true,
    },
    {
      name: "Dr. Marcos Vall",
      email: "marcos.vall@medcare.com",
      specialty: "General Surgery",
      licenseNumber: "M.P. 32112 | M.N. 98455",
      imageUrl: "/assets/doctor_avatar_2.png",
      isActive: true,
    },
    {
      name: "Dr. Sofia Navarro",
      email: "sofia.navarro@medcare.com",
      specialty: "Comprehensive Pediatrics",
      licenseNumber: "M.P. 51009 | M.N. 129033",
      imageUrl: "/assets/doctor_avatar_3.png",
      isActive: true,
    },
    {
      name: "Dr. Roberto Silva",
      email: "roberto.silva@medcare.com",
      specialty: "Cardiology",
      licenseNumber: "M.P. 12894 | M.N. 45672",
      imageUrl: "/assets/doctor_avatar_1.png", // Reuse avatar for simplicity
      isActive: true, // Note: active doctor
    },
  ];

  const dbDoctors = [];
  for (const doc of docsData) {
    const userDoc = await prisma.user.create({
      data: {
        email: doc.email,
        password: defaultPassword,
        role: "DOCTOR",
        staffProfile: {
          create: {
            name: doc.name,
            specialty: doc.specialty,
            licenseNumber: doc.licenseNumber,
            imageUrl: doc.imageUrl,
            isActive: doc.isActive,
          },
        },
      },
      include: { staffProfile: true },
    });
    // Type checking ensures staffProfile exists based on schema inclusion
    dbDoctors.push(userDoc.staffProfile!);
  }

  // --- SECRETARIES ---
  const secsData = [
    {
      name: "Clara Johansson",
      email: "clara.johansson@medcare.com",
      specialty: "Patient Relations",
      licenseNumber: "First point of contact",
      imageUrl: "/assets/receptionist_1.png",
      isActive: true,
    },
    {
      name: "Thomas Miller",
      email: "thomas.miller@medcare.com",
      specialty: "Front Desk Coordinator",
      licenseNumber: "Appointments & Guidance",
      imageUrl: "/assets/receptionist_2.png",
      isActive: true,
    },
  ];

  const dbSecretaries = [];
  for (const sec of secsData) {
    const userSec = await prisma.user.create({
      data: {
        email: sec.email,
        password: defaultPassword,
        role: "SECRETARY",
        staffProfile: {
          create: {
            name: sec.name,
            specialty: sec.specialty,
            licenseNumber: sec.licenseNumber,
            imageUrl: sec.imageUrl,
            isActive: sec.isActive,
          },
        },
      },
      include: { staffProfile: true },
    });
    dbSecretaries.push(userSec.staffProfile!);
  }

  // --- PATIENTS & APPOINTMENTS ---
  const ptUser1 = await prisma.user.create({
    data: {
      email: "john.doe@gmail.com",
      password: defaultPassword,
      role: "PATIENT",
      patientProfile: {
        create: {
          name: "John Doe",
          phone: "+49 123 4567",
        },
      },
    },
    include: { patientProfile: true },
  });

  const ptUser2 = await prisma.user.create({
    data: {
      email: "maria.garcia@gmail.com",
      password: defaultPassword,
      role: "PATIENT",
      patientProfile: {
        create: {
          name: "Maria Garcia",
          phone: "+49 987 6543",
        },
      },
    },
    include: { patientProfile: true },
  });

  // Mock appointments for Doctor 1 (Dr. Reyes)
  await prisma.appointment.createMany({
    data: [
      {
        date: new Date(new Date().setHours(new Date().getHours() + 24)), // Tomorrow
        reason: "Annual Checkup",
        status: "APPROVED",
        doctorId: dbDoctors[0].id,
        patientId: ptUser1.patientProfile!.id,
      },
      {
        date: new Date(new Date().setHours(new Date().getHours() + 48)), // In 2 days
        reason: "Follow-up",
        status: "PENDING",
        doctorId: dbDoctors[0].id,
        patientId: ptUser2.patientProfile!.id,
      },
      {
        date: new Date(new Date().setHours(new Date().getHours() + 72)),
        reason: "General Consultation",
        status: "PENDING",
        doctorId: dbDoctors[1].id,
        patientId: ptUser1.patientProfile!.id,
      },
    ],
  });

  // --- INTERNAL MEETINGS ---
  await prisma.internalMeeting.createMany({
    data: [
      {
        title: "Monthly Board Meeting",
        description: "Review financial stats and schedule upcoming hires.",
        date: new Date(new Date().setHours(new Date().getHours() + 48)),
      },
      {
        title: "Medical Protocol Update",
        description:
          "Mandatory session for all acting practitioners regarding new sanitation workflows.",
        date: new Date(new Date().setHours(new Date().getHours() + 112)),
      },
      {
        title: "System Migration Planning",
        description: "IT and Front Desk coordination.",
        date: new Date(new Date().setHours(new Date().getHours() + 338)),
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
