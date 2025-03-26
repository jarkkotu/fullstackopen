import { Diagnosis, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../../types"

interface SpecialistProps {
  specialist: string
}
const Specialist = ({ specialist }: SpecialistProps) => {
  return (
    <>
      <small>diagnose by</small> {specialist}
    </>
  )
}

interface DiagnosesListProps {
  entry: Entry,
  diagnoses: Diagnosis[]
}
const DiagnosesList = ({ entry, diagnoses}: DiagnosesListProps) => {
  const entryDiagnoses = entry.diagnosisCodes
  ? entry.diagnosisCodes.map(code => 
  {
    const diagnosis = diagnoses.find(d => d.code === code);
    if (diagnosis) {
      return diagnosis
    } else {
      const newDiagnosis: Diagnosis = {
        code: code,
        name: "?",
      }
      return newDiagnosis;
    }
  })
  : []

  return (
    <ul>
      {entryDiagnoses.map(d => (<li key={d.code}>{d.code} {d.name} <i>{d.latin}</i></li>))}
    </ul>
  )
}

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry,
  diagnoses: Diagnosis[]
}
const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckEntryDetailsProps) => {
  return (
    <div style={{ border: "1px solid darkgray" }}>
      {entry.date} <strong>Health check</strong>
      <br/>
      <em>{entry.description}</em>
      <br/>
      healthCheckRating: {entry.healthCheckRating}
      <br/>
      <Specialist specialist={entry.specialist}/>
      <DiagnosesList entry={entry} diagnoses={diagnoses} />
    </div>
  )
}

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry,
  diagnoses: Diagnosis[]
}
const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  return (
    <div style={{ border: "1px solid darkgray" }}>
      {entry.date} <strong>Occupational healthcare</strong> {entry.employerName}
      <br/>
      <em>{entry.description}</em>
      <br/>
      <Specialist specialist={entry.specialist}/>
      <DiagnosesList entry={entry} diagnoses={diagnoses} />
    </div>
  )
}

interface HospitalEntryDetailsProps {
  entry: HospitalEntry,
  diagnoses: Diagnosis[]
}
const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryDetailsProps) => {
  return (
    <div style={{ border: "1px solid darkgray" }}>
      {entry.date} <strong>Hospital</strong>
      <br/>
      <em>{entry.description}</em>
      <br/>
      discharge: {entry.discharge.date} <em>{entry.discharge.criteria}</em>
      <br/>
      <Specialist specialist={entry.specialist}/>
      <DiagnosesList entry={entry} diagnoses={diagnoses} />
    </div>
  )
}

interface Props {
  entry: Entry,
  diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />
    default:
      return assertNever(entry);
  }
}

export default EntryDetails;