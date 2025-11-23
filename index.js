const express = require("express");
const path = require("path");
const app = express();

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('datasource.db', (err) => {  // Connects server to music database
  if (err) { 
    console.error('not connected', err); }
  else { 
    console.log('connected') }}); // States status whether connection to database was successful or not

app.get("/api/music", (req, res) => { 
  db.all("SELECT * FROM music", [], (err, rows) => {  // Gets all songs from the database
  if (err) { 
    res.status(500).json(err); 
    return; } 
    res.json({ 
      music: rows 
    }); 
  }); 
});


app.use(express.static(path.join(__dirname, "public")));



app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website")); // Activates express server shows link to website