const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPasswords = async function (enteredPassword) { //to check the password entered by the user while logging in is correct or not 
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) { //to encrypt the password before saving it to the database
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10); //we are creating the password salt
  this.password = await bcrypt.hash(this.password, salt); //we are creating has using password salt

})

const User = mongoose.model("User", userSchema);
module.exports = User;
