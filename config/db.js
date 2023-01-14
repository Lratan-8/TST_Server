/** @format */

const mongoose = require("mongoose");
const mongooseURI = process.env.MONGO_URI; //from .env file

const connectToMongo = async () => {
  try {
    const connect = await mongoose.connect(mongooseURI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB successfully connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectToMongo;
