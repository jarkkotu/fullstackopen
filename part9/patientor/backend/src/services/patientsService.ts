import patients from "../../data/patients.ts";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitivePatientById = (id: string): NonSensitivePatient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getNonSensitivePatientById,
  addPatient,
};
