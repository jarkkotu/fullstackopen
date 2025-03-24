import { Gender } from "./types";
import { z } from "zod";

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
});

export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
});
