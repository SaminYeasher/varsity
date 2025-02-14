// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");



const app = express();
connectDB();
// Protected route example
app.get("/api/student-dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to the Student Dashboard!", user: req.user });
});
// Middlewares
app.use(cors({
    origin: "http://localhost:3000"
  }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello from MERN backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
