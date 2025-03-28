import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NewPatientSchema, NewPatient, Patient, NewEntrySchema, NewEntry, Entry } from "../types";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/", (_req, res: Response<Patient[]>) => {
  const patients = patientsService.getPatients();
  res.send(patients);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const patient = patientsService.getPatientById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = NewPatientSchema.parse(req.body);
  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient);
});

router.post("/:id/entries", newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const newEntry = NewEntrySchema.parse(req.body);
  const addedEntry = patientsService.addEntry(req.params.id, newEntry);
  if (addedEntry) {
    res.json(addedEntry);
  } else {
    res.sendStatus(404);
  }
});

router.use(errorMiddleware);

export default router;
