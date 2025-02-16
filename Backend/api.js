const express = require('express');
const app = express();  // Initialize the app

// Use middleware to parse JSON request bodies
app.use(express.json());

app.post('/api/transactions', async (req, res) => {
  // Your route logic here
  res.send('Transaction posted');
});

// Set the port for the app to listen on
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
