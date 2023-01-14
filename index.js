/** @format */

require("dotenv").config();
const express = require("express");
const connectToMongo = require("./config/db");
connectToMongo();
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  return res.send("API is running");
});

app.listen(PORT, console.log(`Server has started on port: ${PORT}`));
