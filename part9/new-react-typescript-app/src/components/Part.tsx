import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
        </>
      );
    case "group":
      return (
        <>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <span>project exercises {props.part.groupProjectCount}</span>
        </>
      );
    case "background":
      return (
        <>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
          <br />
          <a href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
          <br />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {props.part.requirements.map((r, index) => (
              <span
                key={index}
                style={{
                  padding: "0.2rem 0.5rem",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "0.25rem",
                  fontSize: "0.9rem",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </>
      );
    default:
      assertNever(props.part);
      break;
  }
};

export default Part;
