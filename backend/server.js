const express = require("express");
const api = require("./api.js");
const apidb = require("./apidb");
const users = require("./users");
const bodyParser = require("body-parser");
const port = 3000 || process.env.PORT;

const app = express();

app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");
  next();
});

app.use(bodyParser.json());

app.use("/users", users);

app.use("/apidb", apidb);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
