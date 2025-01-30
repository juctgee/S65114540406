const express = require('express');
const { signUpUser, getUserById } = require('../controllers/userController');
const router = express.Router();

// Route for signing up a new user
router.post('/signup', signUpUser);

// Route for fetching user by ID
router.get('/:id', getUserById);

module.exports = router;
