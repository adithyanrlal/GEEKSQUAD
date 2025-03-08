import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

// New professional particle animation component
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

function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    // Trigger card animation after component mounts
    const timer = setTimeout(() => setAnimateCard(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Authentication handlers
  const handleProducerAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // This would connect to your actual auth service
      // const response = await authService.checkProducerSession();
      // if (response.isAuthenticated) {
      //   navigate('/producer-dashboard');
      // } else {
      navigate('/Producer-login');
      // }
    } catch (err) {
      setError("Authentication service unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleConsumerAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // This would connect to your actual auth service
      // const response = await authService.checkConsumerSession();
      // if (response.isAuthenticated) {
      //   navigate('/consumer-dashboard');
      // } else {
      navigate('/Consumer-login');
      // }
    } catch (err) {
      setError("Authentication service unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    navigate('/guest-portal');
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
      {/* Professional animated background */}
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.591 1.591z" />
            </svg>
          </div>
    
        </div> 
      </motion.div>
      
      {/* Login card */}
      <motion.div 
        className="w-full max-w-md px-4 z-10 mt-24"
        initial="hidden"
        animate={animateCard ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className="w-full p-8 space-y-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white">Welcome</h2>
            <p className="mt-3 text-sm text-gray-300">
              Select your account type to continue
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
          
          <motion.div className="mt-8 space-y-4" variants={itemVariants}>
            <motion.button
              onClick={handleProducerAuth}
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-indigo-500/50 text-lg font-medium rounded-xl text-white bg-indigo-600/80 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-600/20 disabled:hover:translate-y-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              {loading ? 'Loading...' : 'Sign in as Producer'}
            </motion.button>
            
            <motion.button
              onClick={handleConsumerAuth}
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-purple-500/50 text-lg font-medium rounded-xl text-white bg-purple-600/80 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-600/20 disabled:hover:translate-y-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-purple-300 group-hover:text-purple-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </span>
              {loading ? 'Loading...' : 'Sign in as Consumer'}
            </motion.button>
          </motion.div>
          
          <motion.div className="pt-4 text-center" variants={itemVariants}>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-4 bg-gray-400/20 border-0" />
              <span className="absolute px-3 text-xs text-gray-400 bg-slate-800/40 backdrop-blur-xl">or</span>
            </div>
            
            <motion.button
              onClick={handleGuestAccess}
              className="mt-4 w-full py-3 px-4 rounded-xl border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Continue as Guest
            </motion.button>
          </motion.div>
          
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Need help? <a href="#" className="font-medium text-amber-400 hover:text-amber-300 transition-colors duration-200">Contact support</a>
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
}

export default Welcome;