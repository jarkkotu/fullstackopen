import { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const meResult = useQuery(ME, { pollInterval: 2000 });
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult.data, getBooks]);

  if (!props.show) {
    return null;
  }

  if (meResult.loading || booksResult.loading || !booksResult.data) {
    return <div>loading...</div>;
  }

  const me = meResult.data.me;
  const books = booksResult.data.allBooks;
  const filteredBooks = books.filter((b) =>
    b.genres.includes(me.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre
        <span style={{ fontWeight: "bold" }}> {me.favoriteGenre}</span>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
