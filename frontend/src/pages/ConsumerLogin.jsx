import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import axios from "axios";


// Particle Background Component
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create 50 particles with random properties
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speed * particle.direction + 100) % 100,
          opacity: (Math.sin(Date.now() / 2000 + particle.id) + 1) / 2 * 0.5 + 0.1
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: `blur(${particle.size > 3 ? 2 : 1}px)`,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      ))}
    </div>
  );
};

// Decorative geometric element
const GeometricElement = ({ className, style }) => (
  <div
    className={`absolute ${className}`}
    style={style}
  />
);

const ConsumerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animateCard, setAnimateCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger card animation after component mounts
    const timer = setTimeout(() => setAnimateCard(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/consumers/login", {
        email,
        password,
      });
      console.log("Login Response:", response.data);

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect after successful login
      navigate("/consumer");



      setError(""); // Clear errors
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <ParticleBackground />

      {/* Decorative geometric elements */}
      <GeometricElement
        className="w-64 h-64 rounded-full"
        style={{
          top: '15%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0) 70%)',
        }}
      />
      <GeometricElement
        className="w-96 h-96 rounded-full"
        style={{
          bottom: '10%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%)',
        }}
      />
      <GeometricElement
        className="w-32 h-32 rotate-45"
        style={{
          top: '30%',
          right: '20%',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />
      <GeometricElement
        className="w-64 h-1"
        style={{
          top: '60%',
          left: '5%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Logo/Branding */}
      <motion.div
        className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div> */}
        </div>
      </motion.div>

      {/* Login form card */}
      <motion.div
        className="w-full max-w-md px-4 z-10 mt-24"
        initial="hidden"
        animate={animateCard ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className="w-full p-8 space-y-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-3 text-sm text-gray-300">
              Sign in to your Consumer account
            </p>
          </motion.div>

          {error && (
            <motion.div
              variants={itemVariants}
              className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.form onSubmit={handleLogin} className="space-y-5" variants={itemVariants}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-700 bg-slate-800/50 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className="w-full p-3 border border-gray-700 bg-slate-800/50 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-purple-500/50 text-lg font-medium rounded-xl text-white bg-purple-600/80 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-600/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-purple-300 group-hover:text-purple-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              Sign In
            </motion.button>
          </motion.form>

          <motion.div className="pt-4 text-center" variants={itemVariants}>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-4 bg-gray-400/20 border-0" />
              <span className="absolute px-3 text-xs text-gray-400 bg-slate-800/40 backdrop-blur-xl">or</span>
            </div>

            <div className="mt-6 pt-2">
              <p className="text-sm text-gray-400 mb-4">
                Don't have an account?{" "}
                <Link to="/consumer-signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
                  Create Account
                </Link>
              </p>

              <Link
                to="/producer-login"
                className="mt-4 w-full py-3 px-4 rounded-xl border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Login as Producer
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center space-x-4"
          variants={itemVariants}
        >
          <span>&copy; 2025 Ray Vault Technologies</span>
          <span>•</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConsumerLogin;