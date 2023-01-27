const asyncHandler = require('express-async-handler');
const Chat = require('../../../models/chatModels');
const User = require('../../../models/UserModel');

const fetchAllChats = asyncHandler(async (req, res) => {

    try {
        //check which user is logged in and fetch list of all the previous chats he has done with all the users.
        //inside the Chat model, we have this users array which have all the list of users that are a part of that chat.
        //So now we will look through the database for all the chats for which the user is a part of and return.
        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

    } catch (error) {
        console.log(error);
    }

});

module.exports = fetchAllChats;