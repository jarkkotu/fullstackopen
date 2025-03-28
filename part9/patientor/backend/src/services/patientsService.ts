import patients from "../../data/patients.ts";
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
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
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  console.log("AddEntry", id, entry);
  const patient = patients.find((x) => x.id === id);
  if (patient) {
    const newEntry = {
      id: uuidv4(),
      ...entry,
    };
    if (!patient.entries) {
      patient.entries = new Array<Entry>();
    }
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  getNonSensitivePatientById,
  addPatient,
  addEntry,
};
