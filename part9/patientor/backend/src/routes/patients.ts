import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatient, NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientsService.getNonSensitivePatients();
  res.send(patients);
});

router.get("/:id", (req, res: Response<NonSensitivePatient>) => {
  const patient = patientsService.getNonSensitivePatientById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req: Request, res: Response<NonSensitivePatient>) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;
  const addedPatient = patientsService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  res.json(addedPatient);
});

export default router;
