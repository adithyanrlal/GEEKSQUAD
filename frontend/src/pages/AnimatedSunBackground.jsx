import React from 'react';

const AnimatedSunBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-400 to-blue-700">
      {/* Sun */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-500/50">
        {/* Inner glow */}
        <div className="absolute inset-2 bg-yellow-200 rounded-full blur-sm"></div>
        {/* Core */}
        <div className="absolute inset-4 bg-yellow-100 rounded-full"></div>
      </div>
      
      {/* Sun rays */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute top-40 left-1/2 origin-bottom w-2 h-32 bg-yellow-300 animate-pulse"
          style={{ 
            transform: `rotate(${i * 30}deg) translateY(-72px)`,
            opacity: 0.7,
            animationDelay: `${i * 100}ms`
          }}
        ></div>
      ))}
      
      {/* Animated clouds */}
      <div className="absolute top-24 left-0 w-32 h-10 bg-white rounded-full animate-bounce opacity-80"></div>
      <div className="absolute top-36 left-16 w-24 h-8 bg-white rounded-full animate-bounce opacity-80" style={{ animationDelay: '300ms' }}></div>
      <div className="absolute top-32 right-0 w-36 h-12 bg-white rounded-full animate-bounce opacity-80" style={{ animationDelay: '600ms' }}></div>
      <div className="absolute top-48 right-16 w-28 h-9 bg-white rounded-full animate-bounce opacity-80" style={{ animationDelay: '900ms' }}></div>
      
      {/* Long moving clouds */}
      <div className="absolute top-16 -left-32 w-48 h-16 bg-white rounded-full opacity-80 animate-cloud"></div>
      <div className="absolute top-44 -right-32 w-56 h-16 bg-white rounded-full opacity-80 animate-cloud-reverse"></div>
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Your content goes here */}
      </div>
      
      <style jsx>{`
        @keyframes cloudMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100vw + 100%)); }
        }
        @keyframes cloudMoveReverse {
          0% { transform: translateX(calc(100vw + 100%)); }
          100% { transform: translateX(-100%); }
        }
        .animate-cloud {
          animation: cloudMove 30s linear infinite;
        }
        .animate-cloud-reverse {
          animation: cloudMoveReverse 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSunBackground;
