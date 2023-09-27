const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));



app.use("/", function (req, res) {
  res.end("<h1>Welcome to project</h1>");
});

module.exports = app;
