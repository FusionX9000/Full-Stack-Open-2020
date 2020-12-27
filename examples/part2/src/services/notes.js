import axios from "axios";
const baseUrl = "/api/notes";

let token = null;

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return axios.get(baseUrl).then((respose) => respose.data.concat(nonExisting));
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = (noteObject) => {
  const config = { headers: { Authorization: token } };
  return axios
    .post(baseUrl, noteObject, config)
    .then((respose) => respose.data);
};

const update = (id, noteObject) => {
  const config = { headers: { Authorization: token } };
  return axios
    .put(`${baseUrl}/${id}`, noteObject, config)
    .then((respose) => respose.data);
};
export default {
  getAll,
  create,
  update,
  setToken,
};
