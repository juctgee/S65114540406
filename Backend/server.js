const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'moneyy',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API สมัครสมาชิก
app.post('/api/users/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
});

app.put('/api/users/update', (req, res) => {
  const { userId, username, email, password } = req.body;

  if (!userId || !username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
  db.query(sql, [username, email, password, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User information updated successfully' });
  });
});

// Start Server
app.listen(8082, () => {
  console.log('Server is running on port 8082');
});
