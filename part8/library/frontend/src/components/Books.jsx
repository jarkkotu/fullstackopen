import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_GENRES } from "../queries";
import BooksByGenre from "./BooksByGenre";

const Books = ({ show }) => {
  const [genre, setGenre] = useState("");
  const genresResult = useQuery(ALL_GENRES);

  if (!show) {
    return null;
  }

  if (genresResult.loading) {
    return <div>loading...</div>;
  }

  const genres = [""].concat(genresResult.data.allGenres);

  return (
    <div>
      <h2>books</h2>

      <div>
        <p>Filter by genre</p>

        {genres.map((g) => (
          <React.Fragment key={g}>
            <input key={g} type="radio" name={g} id={g} value={g} checked={genre === g} onChange={() => setGenre(g)} />
            <label htmlFor={g}>{g == "" ? "all" : g}</label>
          </React.Fragment>
        ))}
      </div>

      <BooksByGenre genre={genre} />
    </div>
  );
};

export default Books;
