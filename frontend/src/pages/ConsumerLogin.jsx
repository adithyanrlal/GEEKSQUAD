import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConsumerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after login

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect after successful login
      navigate("/consumer-dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Consumer Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-3">
          Don't have an account? <Link to="/consumer-signup" className="text-green-600">Sign Up</Link>
        </p>
        <Link to="/producer-login" className="block text-center bg-blue-600 text-white p-2 rounded hover:bg-green-700 mt-4">
          Login as Producer
        </Link>
      </div>
    </div>
  );
};

export default ConsumerLogin;
