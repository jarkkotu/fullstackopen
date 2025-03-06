const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const setBookCount = async (authors) => {
  console.log("setBookCount", authors);
  const books = await Book.find({ author: { $in: authors.map((a) => a._id) } });
  authors.forEach((author) => {
    author.bookCount = books.filter((book) => book.author.toString() === author._id.toString()).length;
  });
};

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      console.log("bookCount", args);
      if (!args.author && !args.genre) {
        return await Book.find({}).countDocuments();
      } else if (args.author && !args.genre) {
        return await Book.find({ author: args.author }).countDocuments();
      } else if (!args.author && args.genre) {
        return await Book.find({
          genres: { $in: args.genre },
        }).countDocuments();
      } else {
        return await Book.find({
          author: args.author,
          genres: { $in: args.genre },
        }).countDocuments();
      }
    },
    authorCount: async () => await Author.find({}).countDocuments(),
    allBooks: async (root, args, context) => {
      console.log("allBooks", args);
      let books = [];
      if (!args.author && !args.genre) {
        books = await Book.find({}).populate("author");
      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          books = await Book.find({ author: author._id }).populate("author");
        }
      } else if (!args.author && args.genre) {
        books = await Book.find({ genres: { $in: args.genre } }).populate("author");
      } else {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          books = await Book.find({
            author: author._id,
            genres: { $in: args.genre },
          }).populate("author");
        }
      }

      await setBookCount(books.map((b) => b.author));
      return books;
    },
    allAuthors: async (root, args, context) => {
      console.log("allAuthors");
      const authors = await Author.find({});
      await setBookCount(authors);
      return authors;
    },
    allGenres: async () => {
      console.log("allGenres");
      const books = await Book.find({});
      const genres = books.reduce((acc, book) => {
        book.genres.forEach((genre) => {
          if (!acc.includes(genre)) {
            acc.push(genre);
          }
        });
        return acc;
      }, []);
      return genres;
    },
    me: (root, args, context) => {
      const user = context.currentUser;
      return user;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("addBook", args);
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = undefined;
      let authorAdded = false;
      try {
        author = await Author.findOne({ name: args.author });
        if (!author) {
          author = await new Author({ name: args.author }).save();
          authorAdded = true;
        }
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }

      let newBook = undefined;
      try {
        newBook = await new Book({ ...args, author: author._id }).save();
        await Book.populate(newBook, { path: "author" });
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_UPDATED", { bookUpdated: newBook });
      if (authorAdded) {
        await setBookCount([author]);
        pubsub.publish("AUTHOR_UPDATED", { authorUpdated: author });
      }
      return newBook;
    },
    editAuthor: async (root, args, context) => {
      console.log("editAuthor", args);
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      try {
        author.born = args.setBornTo;
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing Author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }

      await setBookCount([author]);
      pubsub.publish("AUTHOR_UPDATED", { authorUpdated: author });
      return author;
    },
    createUser: async (root, args) => {
      console.log("createUser", args);
      try {
        const newUser = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        }).save();

        return newUser;
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      console.log("login", args);
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    authorUpdated: {
      subscribe: () => pubsub.asyncIterableIterator("AUTHOR_UPDATED"),
    },
    bookUpdated: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_UPDATED"),
    },
  },
};

module.exports = resolvers;
