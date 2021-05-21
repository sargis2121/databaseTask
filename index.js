const mysql = require("mysql2");
const express = require("express");
const { json } = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "usersdb2",
  password: "123456",
});
connection.connect(function (err) {
  if (err) {
    return console.error(err.message);
  } else {
    console.log("connected");
  }
});
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});
app.post("/api/create", (req, res) => {
  const people = {
    id: req.params.id,
    name: req.body.name,
    age: req.body.age,
  };
  connection.query("INSERT INTO users SET ? ", people, (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});
app.post("/api/edit", (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  const name = req.body.name;
  const age = req.body.age;
  const id = req.body.id;

  connection.query("UPDATE users SET name=?, age=? WHERE id=?", [name, age, id], (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});
app.post("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM users WHERE id=?", [id], (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

app.listen(8086, function () {
  console.log("The server is waiting for a connection ...");
});
