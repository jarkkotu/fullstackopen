import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <div key={part.name} style={{ margin: 10 }}>
          <Part key={part.name} part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
