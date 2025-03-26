import { NewPatientSchema } from "./utils";
import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
