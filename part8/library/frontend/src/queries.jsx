import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    favoriteGenre
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query allBooksFiltered($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const AUTHOR_UPDATED = gql`
  subscription {
    authorUpdated {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const BOOK_UPDATED = gql`
  subscription {
    bookUpdated {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

// If item with idSelector(newObj) is found in array, it is replaced with newObj.
// Otherwise newObj is added to array.
export const update = (array, newObj, idSelector) => {
  for (let i = 0; i < array.length; i++) {
    if (idSelector(array[i]) === idSelector(newObj)) {
      return array.toSpliced(i, 1, newObj);
    }
  }
  return array.concat(newObj);
};

export const updateAuthors = (cache, author) => {
  console.log("updateAuthors", author);
  const data = cache.readQuery({ query: ALL_AUTHORS });
  if (data) {
    cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
      const newAuthors = update(allAuthors, author, (x) => x.id);
      console.log("updateAuthors: new state", newAuthors);
      return {
        allAuthors: newAuthors,
      };
    });
  }
};

export const updateGenres = (cache, genres) => {
  console.log("updateGenres", genres);
  const data = cache.readQuery({ query: ALL_GENRES });
  if (data) {
    cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
      const newGenres = allGenres.concat(genres).filter((value, index, array) => array.indexOf(value) === index);
      console.log("updateGenres: new state", newGenres);
      return {
        allGenres: newGenres,
      };
    });
  }
};

export const updateBooks = (cache, book) => {
  console.log("updateBooks", book);
  const data = cache.readQuery({ query: ALL_BOOKS });
  if (data) {
    cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      const newBooks = update(allBooks, book, (x) => x.id);
      console.log("updateBooks: new state", newBooks);
      return {
        allBooks: newBooks,
      };
    });
  }

  updateAuthors(cache, book.author);
  updateGenres(cache, book.genres);
};
