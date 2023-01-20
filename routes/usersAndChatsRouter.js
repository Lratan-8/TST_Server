const express = require('express');
const fetchAllusers = require('../controllers/users and chats controllers/fetchAllUsers');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/allusers', protect, fetchAllusers); //protect is a middleware function here.


module.exports = router