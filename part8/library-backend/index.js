const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const MONGODB_URI =
  "mongodb+srv://admin:somePass123@cluster0.wbcmq.mongodb.net/library-app?retryWrites=true&w=majority";

const JWT_SECRET = "sekret";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("error connecting to mongodb", error.message));

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      return currentUser;
    },
    bookCount: async () => {
      const res = await Book.countDocuments({});
      return res;
    },
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      const { genre, ...filters } = args;
      if (genre) filters.genres = genre;
      const res = await Book.find({ ...filters }).populate("author");
      return res;
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name });
      return await Book.countDocuments({ author: author.id });
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("User not authenticated");
      const { title, author, published, genres } = args;

      let authorDocument = await Author.findOne({ name: author });
      if (!authorDocument) {
        authorDocument = await new Author({ name: author }).save();
      }
      console.log(authorDocument);
      const newBook = new Book({
        title,
        author: authorDocument.id,
        published,
        genres,
      });
      try {
        await newBook.save();
        await newBook.populate("author").execPopulate();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("User not authenticated");
      const { name, setBornTo } = args;
      const author = await Author.findOne({ name });
      if (!author) {
        return null;
      }
      author.born = setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return author;
    },
    createUser: async (root, { username, favoriteGenre }) =>
      await new User({ username, favoriteGenre }).save(),
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== "secred") {
        throw new UserInputError("Invalid credentials");
      }
      const userForToken = {
        username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, JWT_SECRET);
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
