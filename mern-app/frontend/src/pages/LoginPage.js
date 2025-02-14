import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [role, setRole] = useState("student"); // Default role: student
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
    setError(""); // Reset error when role changes
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents page refresh on form submit

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        userId,
        password,
        role,
      });

      // Get response data
      const data = response.data;
      
      console.log("Login successful:", data);

      // Store JWT token in local storage
      localStorage.setItem("token", data.token);

      // Redirect user based on role
      if (data.user.role === "student") {
        navigate("/student-dashboard");
      } else if (data.user.role === "faculty") {
        navigate("/faculty-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.msg || error.message);
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/edu_logo.png" alt="University Logo" className="logo" />
        <h1>EAST DELTA UNIVERSITY</h1>
        <p>Advising System Portal</p>

        {/* Role Tabs */}
        <div className="role-tabs">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => handleRoleClick("student")}
          >
            Student
          </button>
          <button
            className={role === "faculty" ? "active" : ""}
            onClick={() => handleRoleClick("faculty")}
          >
            Faculty
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <label>{role === "student" ? "Student ID" : "Faculty ID"}</label>
          <input
            type="text"
            placeholder={role === "student" ? "Enter your Student ID" : "Enter your Faculty ID"}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          {error && <p className="error-msg">{error}</p>}
        </form>

        <a href="#!" className="forgot-password">
          Forgot Password?
        </a>
      </div>

      <footer>
        <p>© 2025 EAST DELTA University. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
