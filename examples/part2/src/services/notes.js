import axios from "axios";
const baseUrl = "/api/notes";

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return axios.get(baseUrl).then((respose) => respose.data.concat(nonExisting));
};

const create = (noteObject) =>
  axios.post(baseUrl, noteObject).then((respose) => respose.data);

const update = (id, noteObject) =>
  axios.put(`${baseUrl}/${id}`, noteObject).then((respose) => respose.data);

export default {
  getAll,
  create,
  update,
};
