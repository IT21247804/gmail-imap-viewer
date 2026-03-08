const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS gmail', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database gmail created or already exists');

    // Switch to the database
    db.changeUser({database: 'gmail'}, (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        return;
      }
      console.log('Switched to gmail database');
    });
  });
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
