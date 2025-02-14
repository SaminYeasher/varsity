const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    // Check if user exists
    const user = await User.findOne({ userId, role });
    if (!user) {
      return res.status(400).json({ msg: "User not found or role mismatch" });
    }

    // Check password (if stored as plain text; ideally, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.userId, role: user.role },  // Payload
      process.env.JWT_SECRET,                    // Secret key
      { expiresIn: "1h" }                        // Token expiration time
    );

    // On success, return token & user info
    return res.json({
      msg: "Login successful",
      token,
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
