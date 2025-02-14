// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userId: {
    type: String, // Student ID or Faculty ID
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
