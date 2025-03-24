import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatient, NewPatient } from "../types";
import { NewPatientSchema } from "../utils";
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

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

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

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
  const newPatient = NewPatientSchema.parse(req.body);
  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
