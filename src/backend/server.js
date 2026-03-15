const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* ---------------- Middleware ---------------- */
app.use(cors({
  origin: ["https://sakshamnari.live", "http://localhost:5173", "http://localhost:8080"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

/* ---------------- Port ---------------- */
const PORT = process.env.PORT || 5000;

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
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already registered" });
      }
      return res.status(500).json({ message: "Signup failed", error: err.message });
    }

    res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  });
});

/* ---------------- Login ---------------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Login failed", error: err.message });
    }

    if (result.length > 0) {
      res.status(200).json({ message: "Login successful", user: result[0] });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
  console.log("Server running");
});