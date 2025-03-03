import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const [setBirthyear] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
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

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {[{ name: "" }].concat(authors).map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <div>
            <button type="submit">update author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authors;
