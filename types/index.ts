import {
  User,
  Staff,
  Patient,
  Appointment,
  Role,
  StaffStatus,
  Status,
} from "@prisma/client";

export type ActionState =
  | {
      success?: boolean;
      message?: string;
      errors?: Record<string, string[]>;
    }
  | null
  | undefined;

export type StaffWithUser = Staff & {
  user: User;
};

export type AppointmentWithDetails = Appointment & {
  doctor: StaffWithUser | null;
  patient: Patient & { user: User };
};

export type StaffFormValues = {
  name: string;
  email: string;
  specialty: string;
  licenseNumber?: string;
  role: Role;
  isActive: boolean;
  status: StaffStatus;
};

export type AuthActionState = ActionState & {
  token?: string;
};

export type AppointmentActionState = ActionState;

export type MeetingActionState = ActionState;

export type PatientActionState = {
  success: boolean;
  message?: string;
  error?: string;
} | null;
