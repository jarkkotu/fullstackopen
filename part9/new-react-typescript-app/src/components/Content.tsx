interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((c) => (
        <p>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
