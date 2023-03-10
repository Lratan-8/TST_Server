const express = require('express');
const createUser = require('../controllers/authControllers/createUserController');
const loginController = require('../controllers/authControllers/loginController');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/login', loginController);

module.exports = router