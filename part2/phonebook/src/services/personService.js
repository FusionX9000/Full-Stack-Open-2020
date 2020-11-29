import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getPerson = (id) =>
  axios.get(`${baseUrl}/${id}`).then((response) => response.data);

const createPerson = (personObject) =>
  axios.post(baseUrl, personObject).then((response) => response.data);

const updatePerson = (id, personObject) =>
  axios.put(`${baseUrl}/${id}`, personObject).then((response) => response.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
