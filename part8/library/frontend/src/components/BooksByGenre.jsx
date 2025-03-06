import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const BooksByGenre = ({ genre }) => {
  const booksResult = useQuery(ALL_BOOKS, { variables: { genre: genre } });

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data.allBooks;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default BooksByGenre;
