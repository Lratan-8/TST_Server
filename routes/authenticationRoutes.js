const express = require('express');
const loginController = require('../controllers/authControllers/loginController');

const router = express.Router();

router.get('/createUser');
router.get('/login', loginController);

module.exports = router