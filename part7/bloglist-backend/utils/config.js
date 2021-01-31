require("dotenv").config();

let mongoUrl = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  mongoUrl = process.env.TEST_MONGODB_URI;
}
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

module.exports = { mongoUrl, PORT, SECRET };
