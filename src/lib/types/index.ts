import type { Language } from "@/lib/i18n";

export type ExperienceDuration =
  | "fresher"
  | "less_6m"
  | "6_12m"
  | "1_2y"
  | "2_5y"
  | "5_plus";

export type RoleLevel = "junior" | "senior" | "manager";

export type ScreeningStatus = "Qualified" | "Not Looking";

export interface CandidateFormData {
  fullName: string;
  phoneNumber: string;
  age: number;
  lookingForJob: boolean;

  languageSelected: Language;
  timestamp?: string;

  locality?: string;
  experienceDuration?: ExperienceDuration;
  determinedRoleLevel?: RoleLevel;

  referredBy?: string;
  referrerPhone?: string;
  email?: string;

  screeningStatus: ScreeningStatus;

  /** Honeypot field — must be empty for valid submissions */
  _hp?: string;
}
