import { Gender, Patient } from "../../types";
import { Female, Male, Transgender } from "@mui/icons-material";

interface GenderIconProps {
  gender: Gender
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
  patient?: Patient
}

const PatientPage = ({ patient } : Props) => {

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
      
    </div>
  )
}

export default PatientPage