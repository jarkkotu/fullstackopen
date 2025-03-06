import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const AuthorForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [setBirthyear] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      console.log(error);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const bornInt = parseInt(born, 10);
    setBirthyear({
      variables: { name, born: bornInt },
    });

    setName("");
    setBorn("");
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {[{ name: "" }].concat(authors).map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
