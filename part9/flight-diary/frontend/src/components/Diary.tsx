import { NonSensitiveDiaryEntry } from "../types";

interface DiaryProps {
  diary: NonSensitiveDiaryEntry;
}

const Diary = (props: DiaryProps) => {
  return (
    <div style={{ margin: 20 }}>
      <b>{props.diary.date}</b>
      <br />
      visibility: {props.diary.visibility}
      <br />
      weather: {props.diary.weather}
    </div>
  );
};

export default Diary;
