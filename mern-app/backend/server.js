const express = require("express");
const cors = require("cors");
const app = express();

// Configure CORS to allow requests from localhost:3000
app.use(cors({
  origin: "http://localhost:3001"
}));

// Middleware to parse JSON
app.use(express.json());

// Define routes here
app.get("/", (req, res) => {
  res.send("Hello from the MERN backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
