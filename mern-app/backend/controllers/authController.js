// backend/controllers/authController.js
const User = require("../models/User");

// Minimal login controller
exports.login = async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    // Check if user exists
    const user = await User.findOne({ userId, role });
    if (!user) {
      return res.status(400).json({ msg: "User not found or role mismatch" });
    }

    // Check password (in production, compare hashed)
    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // On success, return user info
    return res.json({
      msg: "Login successful",
      user: {
        fullName: user.fullName,
        userId: user.userId,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
