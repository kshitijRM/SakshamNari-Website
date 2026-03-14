const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "viteDB"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Signup failed");
    } else {
      res.send("User registered");
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.send("Login error");
    } else {
      if (result.length > 0) {
        res.send("Login successful");
      } else {
        res.send("Invalid email or password");
      }
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});