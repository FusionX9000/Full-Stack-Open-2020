import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [updateBorn] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  console.log(result);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const authors = (result.data && result.data.allAuthors) || [];
  useEffect(() => {
    if (result.data) {
      if (authors.length > 0) {
        setName(authors[0].name);
      } else {
        setName("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const updateAuthor = (e) => {
    e.preventDefault();
    updateBorn({
      variables: { name, born: Number(born) },
    });
  };

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
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <label>name</label>
        <select onChange={(e) => setName(e.target.value)} value={name}>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        <label>born</label>
        <input value={born} onChange={(e) => setBorn(e.target.value)} />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
