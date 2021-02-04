import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(null);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (!genre) {
      getBooks();
    } else {
      getBooks({ variables: { genre } });
    }
  }, [genre]);

  useEffect(() => {
    if (!result.loading && result.called) {
      const allBooks = result.data.allBooks;
      setBooks(allBooks);
      if (genre) {
        return;
      }
      const genresSet = new Set();
      allBooks.forEach((book) =>
        book.genres.forEach((genre) => genresSet.add(genre))
      );
      setGenres(genresSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (!result.data) {
    return <div>loading....</div>;
  }

  const handleGenreFilter = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div>
      <h2>books</h2>

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
      {
        <div>
          {[...genres].map((genre) => (
            <button key={genre} onClick={handleGenreFilter} value={genre}>
              {genre}
            </button>
          ))}
        </div>
      }
      <button onClick={() => setGenre(null)}>reset</button>
    </div>
  );
};

export default Books;
