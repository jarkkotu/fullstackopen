import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

import patientService from "../../services/patients";
import { Gender, Patient, Diagnosis, NewEntry } from "../../types";
import EntryList from "./EntryList";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

interface GenderIconProps {
  gender: Gender,
}

const GenderIcon = ({ gender } : GenderIconProps) => {
  switch (gender) {
    case Gender.Male:
      return <Male />
    case Gender.Female:
        return <Female />
    default:
      return <Transgender />
  }
}

interface Props {
  patients: Patient[],
  diagnoses: Diagnosis[],
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
}

const PatientPage = ({ patients, diagnoses, setPatients } : Props) => {
  const params = useParams()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = patients.find(x => x.id === params.id);
  if (!patient)
  {
    return (<div>Not found...</div>)
  }

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      const createdEntry = await patientService.createEntry(patient.id, entry);
      patient.entries?.push(createdEntry);
      setPatients(patients.map(p => p.id === patient.id ? patient : p));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error && Array.isArray(e?.response?.data?.error)) {
          const message = e.response.data.error[0].message;
          console.error(message)
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return (<div>undefined</div>)
  }

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
      ssn: {patient.ssn}
      <br/>
      occupation: {patient.occupation}
      <br/>
      <EntryList entries={patient.entries} diagnoses={diagnoses}/> 

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />

      <Button style={{ marginTop: 10 }} variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
}

export default PatientPage