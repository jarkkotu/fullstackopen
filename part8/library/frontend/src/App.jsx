import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { AUTHOR_UPDATED, BOOK_UPDATED, updateAuthors, updateBooks } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(AUTHOR_UPDATED, {
    onData: ({ data, client }) => {
      const author = data.data.authorUpdated;
      window.alert(`Author ${author.name} created or updated`);
      updateAuthors(client.cache, author);
    },
  });

  useSubscription(BOOK_UPDATED, {
    onData: ({ data, client }) => {
      const book = data.data.bookUpdated;
      window.alert(`Book ${book.title} created or updated`);
      updateBooks(client.cache, book);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          {token && <button onClick={() => setPage("addBook")}>add book</button>}
          {token && <button onClick={() => setPage("recommend")}>recommend</button>}
          {token && <button onClick={() => logout()}>logout</button>}
        </div>
        <Authors show={page === "authors"} token={token} />
        <Books show={page === "books"} />
        {token && <BookForm show={page === "addBook"} />}
        {token && <Recommend show={page === "recommend"} />}
      </div>
    );
  }
};

export default App;
