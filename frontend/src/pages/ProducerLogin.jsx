import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProducerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-300 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Producer Login</h2>
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
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-3">
          Don't have an account? <Link to='/producer-signup'className="text-blue-600">Sign Up</Link>
        </p>
        <Link to='/consumer-login'
          className="block text-center bg-green-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
        >
          Login in as Consumer
        </Link>
      </div>
    </div>
  );
};

export default ProducerLogin;