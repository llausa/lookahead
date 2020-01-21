const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const students = ["Natasha", "Shakti", "Santosh", "Allen", "James", "Blake"];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.post("/students", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));