import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const updateBookStore = (store, response, genre) => {
  const variables = genre ? { genre } : {};
  const booksInStore = store.readQuery({
    query: ALL_BOOKS,
    variables,
  });
  if (!booksInStore || !booksInStore.allBooks) return null;
  console.log(variables, genre, booksInStore);
  store.writeQuery({
    query: ALL_BOOKS,
    variables,
    data: {
      ...booksInStore,
      allBooks: [...booksInStore.allBooks, response.data.addBook],
    },
  });
  console.log(variables, genre, booksInStore);
};

const updateAuthorStore = (store, response) => {
  const authorsInStore = store.readQuery({ query: ALL_AUTHORS });
  const bookAuthor = response.data.addBook.author;
  if (!authorsInStore || !authorsInStore.allAuthors) {
    return;
  }
  const isAuthorPresent = authorsInStore.allAuthors.find(
    (author) => author.name === bookAuthor.name
  );
  store.writeQuery({
    query: ALL_AUTHORS,
    data: {
      ...authorsInStore,
      allAuthors: isAuthorPresent
        ? authorsInStore.allAuthors.map((author) =>
            author.name !== bookAuthor.name ? author : bookAuthor
          )
        : [...authorsInStore.allAuthors, bookAuthor],
    },
  });
};

const NewBook = (props) => {
  //[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      updateAuthorStore(store, response);
      genres.forEach((genre) => updateBookStore(store, response, genre));
      updateBookStore(store, response);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    console.log({ title, author, published, genres });
    addBook({
      variables: { title, author, published: Number(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
