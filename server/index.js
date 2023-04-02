const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.get("/something", (req, res) => {
  res.send("success");
});

app.listen(8080);
