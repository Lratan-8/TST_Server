require("dotenv").config();
const express = require("express");
const connectToMongo = require("./config/db");
connectToMongo();
const PORT = process.env.PORT;

const app = express(); //started the express server
app.use(express.json()); //to accept the json data

app.get('/', (req,res) => res.send("Home Page"));
app.use('/api/auth', require('./routes/authenticationRoutes'));


app.listen(PORT, console.log(`Server has started on port: ${PORT}`)); //started server is on the given port
