const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- Port ---------------- */
const PORT = process.env.PORT || 8080;

/* ---------------- Database Connection ---------------- */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vitedb"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

/* ---------------- Test Route ---------------- */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ---------------- Signup ---------------- */
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.send(err);
    }

    res.send("User registered successfully");
  });
});

/* ---------------- Login ---------------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.send(err);
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Invalid email or password");
    }
  });
});

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});