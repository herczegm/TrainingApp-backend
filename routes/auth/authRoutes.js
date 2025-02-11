const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./authController');

// Regisztráció
router.post('/register', registerUser);

// Bejelentkezés
router.post('/login', loginUser);

module.exports = router;
