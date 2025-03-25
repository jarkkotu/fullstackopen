import { useState, SyntheticEvent } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface DiaryFormProps {
  onSubmit: (values: NewDiaryEntry) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit({
      date,
      visibility,
      weather,
      comment,
    });
  };

  return (
    <>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="input-date">date</label>
          <input
            id="input-date"
            name="input-date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </div>
        <div>
          <label>visibility</label>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input type="radio" value={v} checked={visibility === v} onChange={() => setVisibility(v)} />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label>weather</label>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input type="radio" value={w} checked={weather === w} onChange={() => setWeather(w)} />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="input-comment">comment</label>
          <input
            id="input-comment"
            name="input-comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryForm;
