import { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { apiBaseUrl } from "./constants";
import diaryService from "./services/diaryService";
import Diary from "./components/Diary";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  const submitNewDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const diary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace("Something went wrong. Error: ", "");
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && <b color="red">{error}</b>}
      <DiaryForm onSubmit={submitNewDiary} />

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
