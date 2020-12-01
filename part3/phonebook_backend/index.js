const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (request, response) => request.method !== "POST",
    }
  )
);

app.use(cors());
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const count = persons.length;
  const time = new Date().toString();
  response.send(`<p>Phone has info for ${count} people</p><p>${time}</p>`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.round(Math.random() * 100000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    const missingKeys = [];
    if (!body.name) missingKeys.push("name");
    if (!body.number) missingKeys.push("number");
    return response
      .status(400)
      .json({ error: `${missingKeys.join(", ")} is missing` });
  }
  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number.toString(),
    id: generateId(),
  };
  persons = persons.concat(person);
  //   console.log(persons);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => `server running on ${PORT}`);
