import { DiaryEntry } from "../types";

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
  return (
    <div style={{ margin: 20 }}>
      <b>{props.diary.date}</b>
      <br />
      visibility: {props.diary.visibility}
      <br />
      weather: {props.diary.weather}
      <br />
      comment: {props.diary.comment}
    </div>
  );
};

export default Diary;
