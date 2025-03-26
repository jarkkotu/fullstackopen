import { Gender, Patient, Diagnosis } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";
import EntryList from "./EntryList";

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
  patient?: Patient,
  diagnoses: Diagnosis[]
}

const PatientPage = ({ patient, diagnoses } : Props) => {

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
    </div>
  )
}

export default PatientPage