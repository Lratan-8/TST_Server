const asyncHandler = require("express-async-handler");
const Chat = require("../../../models/chatModels");
const User = require("../../../models/UserModel");

const createChatController = asyncHandler(async (req, res) => {



    const { userId } = req.body; //the current user who is logged in sends us the user id with whom he/she wants to star the chat.
    if (!userId) {
        console.log("UserId param not  sent with request");
        return res.send(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }

        ]

    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0])    //if the chat exists, then we will just send the new chat 
    } else {
        let chatData = {    //if the chat doesn't exist, then create a chat
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {

            const createdChat = await Chat.create(chatData); //saving the newly created chat instance in the database
            const FullChat = await Chat.findOne({    //fetching the newly created chat in the database with the given chat id
                _id: createdChat._id
            }).populate(
                "users",
                "-password"
            );

            res.status(200).send(FullChat);

        } catch (error) {

            return res.send(error)

        }
    }

});


module.exports = createChatController;



//notes for understanding

/* - To start a chat we definitely need two users.
- First user will star the chat and we will add second user to the chat.*/