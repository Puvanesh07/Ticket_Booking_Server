const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser } = require('../controllers/authController.js');

// Middleware
router.use(
  cors({
    credentials: true, // Corrected typo here
    origin: "http://localhost:5173",
  })
);

router.get('/', test);

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
