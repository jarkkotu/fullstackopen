import { Diagnosis, Entry } from "../../types"
import EntryDetails from "./EntryDetails";

interface Props {
  entries: Array<Entry>,
  diagnoses: Diagnosis[]
}

const EntryList = ({ entries, diagnoses }: Props) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.map(entry => (<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />) )}
    </div>
  )
}

export default EntryList;