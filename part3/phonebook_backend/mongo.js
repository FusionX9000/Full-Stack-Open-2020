const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide all the arguments, node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const [password, name, number] = process.argv.slice(2);

const url = `mongodb+srv://admin:${password}@cluster0.wbcmq.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name) {
  const person = new Person({
    name,
    number: number || "",
  });

  // eslint-disable-next-line no-unused-vars
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
