const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moneyy',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add new savings item
app.post('/add-savings', (req, res) => {
  const { label, amount, time, imageUri } = req.body;
  
  const query = 'INSERT INTO savings (label, amount, time, imageUri) VALUES (?, ?, ?, ?)';
  
  db.query(query, [label, amount, time, imageUri], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error saving data', error: err });
    } else {
      res.status(200).send({ message: 'Savings item added successfully', result });
    }
  });
});

app.listen(8083, () => {
  console.log(`Server running on port ${8083}`);
});
