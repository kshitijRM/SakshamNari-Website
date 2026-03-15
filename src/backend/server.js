const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

/* ---------------- Database ---------------- */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/* ---------------- Middleware ---------------- */
app.use(cors({
  origin: ["https://sakshamnari.live", "http://localhost:5173"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* ---------------- Port ---------------- */
const PORT = process.env.PORT || 5000;

/* ---------------- Test Route ---------------- */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ---------------- Signup ---------------- */
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
      [name, email, password]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });

  } catch (err) {

    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

/* ---------------- Login ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Login successful",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});