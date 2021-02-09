import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommed = ({ show }) => {
  const meResult = useQuery(ME);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [meResult.data]);
  if (!show) {
    return null;
  }

  if (meResult.data && !meResult.data.me) {
    return <div>Login first</div>;
  }

  if (!booksResult.data) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genre <b>{meResult.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((a) => (
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

export default Recommed;
