const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// การตั้งค่า MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moneyy', // ชื่อฐานข้อมูล
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// ใช้ bodyParser เพื่อให้สามารถรับข้อมูล JSON
app.use(bodyParser.json());

// Endpoint สำหรับบันทึกข้อมูล
app.post('/api/savings', async (req, res) => {
  const { label, amount, time } = req.body;

  // Query เพื่อบันทึกข้อมูลในฐานข้อมูล
  const query = 'INSERT INTO savings (label, amount, time) VALUES (?, ?, ?)';
  connection.query(query, [label, amount, time], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving data', error: err });
    }
    res.status(200).json({ message: 'Data saved successfully', result });
  });
});

// Start Server
app.listen(8083, () => {
    console.log('Server is running on port 8083');
  });