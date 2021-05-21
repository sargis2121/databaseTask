const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "usersdb2",
  password: "123456",
});

connection.connect((err) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log("connected");
  }
});

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

router.post("/create", (req, res) => {
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
router.put("/edit", (req, res) => {
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

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM users WHERE id=?", [id], (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

module.exports = router