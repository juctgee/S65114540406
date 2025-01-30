const db = require('../db');

// Function to handle user signup
const signUpUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
};

// Function to fetch user details by ID
const getUserById = (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

module.exports = { signUpUser, getUserById };
