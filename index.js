const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./rout");

const app = express();
const port = 8086;

app.use(routes);
app.listen(port, () => {
    console.log("The server is waiting for a connection ...");
  });