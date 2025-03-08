import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

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

const ConsumerSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    // Trigger card animation after component mounts
    const timer = setTimeout(() => setAnimateCard(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Signing up with", { email, password });
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
          {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
          </div> */}
        </div> 
      </motion.div>
      
      {/* Signup form card */}
      <motion.div 
        className="w-full max-w-md px-4 z-10 mt-24"
        initial="hidden"
        animate={animateCard ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className="w-full p-8 space-y-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-3 text-sm text-gray-300">
              Join us today and start your journey
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
          
          <motion.form onSubmit={handleSignup} className="space-y-5" variants={itemVariants}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 border border-gray-700 bg-slate-800/50 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 border border-gray-700 bg-slate-800/50 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 border border-gray-700 bg-slate-800/50 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-indigo-500/50 text-lg font-medium rounded-xl text-white bg-indigo-600/80 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-600/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-300 group-hover:text-indigo-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </span>
              Create Account
            </motion.button>
          </motion.form>
          
          <motion.div className="pt-4 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/consumer-login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign in instead
              </Link>
            </p>
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

export default ConsumerSignup;