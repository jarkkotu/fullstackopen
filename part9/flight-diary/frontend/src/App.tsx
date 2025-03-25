import { useState, useEffect } from "react";
import axios from "axios";
import { NonSensitiveDiaryEntry } from "./types";
import { apiBaseUrl } from "./constants";
import diaryService from "./services/diaryService";
import Diary from "./components/Diary";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  return (
    <>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
