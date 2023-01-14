const mongoose = require("mongoose");
const mongooseURI = ""; //from .env file

const connectToMongo = async () => {
  mongoose.connect(mongooseURI, () => {
    console.log("Connected to mongoose sucessfully");
  });
};

module.exports = connectToMongo;
