import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const DischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

export const EntrySchema = z.union([HealthCheckEntrySchema, OccupationalHealthcareEntrySchema, HospitalEntrySchema]);

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export type Discharge = z.infer<typeof DischargeSchema>;

export type BaseEntry = z.infer<typeof BaseEntrySchema>;

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type Entry = z.infer<typeof EntrySchema>;

// // Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({
  id: true,
});

export const NewOccupationalHealthcareEntrySchema = OccupationalHealthcareEntrySchema.omit({
  id: true,
});

export const NewHospitalEntrySchema = HospitalEntrySchema.omit({
  id: true,
});

export const NewEntrySchema = z.union([
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
  entries: z.array(EntrySchema).optional(),
});

export type Patient = z.infer<typeof PatientSchema>;

export const NewPatientSchema = PatientSchema.omit({
  id: true,
  entries: true,
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
