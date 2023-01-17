const express = require('express');
const createUser = require('../controllers/authControllers/createUserController');
const loginController = require('../controllers/authControllers/loginController');

const router = express.Router();

router.get('/createUser', createUser);
router.get('/login', loginController);

module.exports = router