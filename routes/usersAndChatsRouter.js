const express = require('express');
const createChatController = require('../controllers/users and chats controllers/chatControllers/createChatController');
const fetchAllChats = require('../controllers/users and chats controllers/chatControllers/fetchChatsController');
const fetchAllusersController = require('../controllers/users and chats controllers/fetchAllUsersController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

//router to get all the users 
router.get('/allusers', protect, fetchAllusersController); //protect is a middleware function here.

//router to start a chat with other user
router.post('/createchat', protect, createChatController);

//router to fetch the chats done with a particular user
router.get('/fetchchats', protect, fetchAllChats);

//router to create a group chat
// router.post('/creategroupchat', protect);

//router to rename a group chat
// router.put('/renamegroup', protect);

//router to remove a person from the group chat
// router.put('/removefromgroup', protect);

//router to add a person to the group
// router.put('/addtogroup'.protect);


module.exports = router