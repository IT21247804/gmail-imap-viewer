const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'gmail' // Change this to your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL gmail database');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Test database connection route
app.get('/db-test', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      res.status(500).send('Database query failed: ' + err.message);
      return;
    }
    res.json({ message: 'Database connected successfully', result: results[0].result });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
