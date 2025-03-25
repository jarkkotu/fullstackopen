import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<NonSensitiveDiaryEntry>(`${apiBaseUrl}/diaries`, object);

  return data;
};

export default {
  getAll,
  create,
};
