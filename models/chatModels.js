//chatName
//isGroupChat?
//listOfUsers
//latestMessage
//groupAdmin
const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatModel = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    iGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
