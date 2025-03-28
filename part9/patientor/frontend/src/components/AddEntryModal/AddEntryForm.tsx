import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryType, HealthCheckRating, HospitalEntry, NewEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, OccupationalHealthcareEntry } from "../../types";
import { Button, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {

  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, sethealtCheckRating] = useState(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [criteriaDate, setCriteriaDate] = useState(new Date().toISOString().split('T')[0]);
  const [criteria, setCriteria] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (entryType) {
      case EntryType.HealthCheck:
        {
          const newEntry: NewHealthCheckEntry = {
            type: "HealthCheck",
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes
          }
          onSubmit(newEntry);
          break;
        }
      case EntryType.OccupationalHealthcare:
        {
          const newEntry: NewOccupationalHealthcareEntry = {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            employerName,
            diagnosisCodes
          }
          onSubmit(newEntry);
          break;
        }
      case EntryType.Hospital:
        {
          const newEntry: NewHospitalEntry = {
            type: "Hospital",
            description,
            date,
            specialist,
            discharge: { date: criteriaDate, criteria },
            diagnosisCodes
          }
          onSubmit(newEntry);
          break;
        }
      default:
        return assertNever(entryType);
    }
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const entryTypeOption = entryTypeOptions.find(g => {
        return g.label === event.target.value
      });
      if (entryTypeOption) {
        setEntryType(entryTypeOption.value);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if ( typeof event.target.value === "number") {
      const healthCheckRatingOption = healthCheckRatingOptions.find(g => g.value === event.target.value);
      if (healthCheckRatingOption) {
        sethealtCheckRating(healthCheckRatingOption.value);
      }
    }
  };

  const onDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    setDiagnosisCodes(event.target.value as string[]);
  };

  const healthCheckRatingVisible = entryType === EntryType.HealthCheck;
  const employerNameVisible = entryType === EntryType.OccupationalHealthcare;
  const dischargeVisible = entryType === EntryType.Hospital;

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
        {entryTypeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )}
        </Select>

        <TextField
          style={{ marginTop: 10 }}
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel style={{ marginTop: 10 }} id="date-label">Date</InputLabel>
        <Input
          id="date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          style={{ marginTop: 10 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel id="diagnoses-label" style={{ marginTop: 10 }}>Diagnoses</InputLabel>
        <Select
          labelId="diagnoses-label"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosesChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map(diagnosis =>
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              {diagnosis.code} <em style={{marginLeft: 5}}>{diagnosis.name}</em>
            </MenuItem>
          )}
        </Select>

        <div style={{ display: healthCheckRatingVisible ? "initial" : "none" }}>
          <InputLabel id="health-check-rating-label" style={{ marginTop: 10 }}>Health check rating</InputLabel>
            <Select
              labelId="health-check-rating-label"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
            >
              {option.label
            }</MenuItem>
          )}
          </Select>
        </div>

        <div style={{ display: employerNameVisible ? "initial" : "none" }}>
          <TextField
            style={{ marginTop: 10 }}
            label="Employer"
            fullWidth 
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        </div>

        <div style={{ display: dischargeVisible ? "initial" : "none" }}>
          <fieldset style={{ marginTop: 10, border: '1px solid #ccc' }}>
            <Input
              id="criteria-date"
              type="date"
              fullWidth
              value={criteriaDate}
              onChange={({ target }) => setCriteriaDate(target.value)}
            />

            <TextField
              style={{ marginTop: 10 }}
              label="Criteria"
              fullWidth 
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </fieldset>
        </div>

        <Grid style={{ marginTop: 10 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddEntryForm;