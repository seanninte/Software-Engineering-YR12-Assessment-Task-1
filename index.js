const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const app = express();


app.use(express.static(path.join(__dirname, "public")));

// serve main page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// open the datasource DB once
const dbPath = path.join(__dirname, 'datasource.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Opened datasource.db');
  }
});

// simple JSON endpoint returning songs
app.get('/songs', (req, res) => {
  const sql = 'SELECT ID, title, artist, album, genre FROM music';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('DB query error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );


