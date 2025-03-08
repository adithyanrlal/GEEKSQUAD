import React, { useState, useEffect } from 'react';
import { ArrowRight, Bolt, DollarSign, Sparkles } from 'lucide-react';

const ProducerSell = () => {
  const [creditAmount, setCreditAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Default prices
  const currentCreditPrice = 0.1; // Price per credit in dollars
  const governmentElectricityPrice = 0.15; // Government price per unit of electricity in dollars
  
  // Calculate profit
  const profit = (governmentElectricityPrice - currentCreditPrice) * (parseFloat(creditAmount) || 0);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setCreditAmount('');
      }, 3000);
    }, 1500);
  };
  
  // Animation for numbers
  const [animatedProfit, setAnimatedProfit] = useState(0);
  
  useEffect(() => {
    const targetProfit = profit;
    let startTimestamp;
    const duration = 1000; // 1 second animation
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setAnimatedProfit(progress * targetProfit);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [profit]);

  // Snowflakes animation
  const [snowflakes, setSnowflakes] = useState([]);
  
  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 40 }, () => createSnowflake());
    setSnowflakes(initialSnowflakes);
    
    // Animation interval for snowflakes
    const intervalId = setInterval(() => {
      setSnowflakes(prevSnowflakes => {
        // Update snowflakes position
        const updatedSnowflakes = prevSnowflakes.map(snowflake => {
          const updatedSnowflake = {
            ...snowflake,
            x: snowflake.x + snowflake.speedX,
            y: snowflake.y + snowflake.speedY,
            rotation: snowflake.rotation + snowflake.rotationSpeed
          };
          
          // If snowflake is out of bounds, reset it to the top
          if (updatedSnowflake.y > window.innerHeight) {
            return {
              ...createSnowflake(),
              y: -20 // Start from above the viewport
            };
          }
          
          return updatedSnowflake;
        });
        
        return updatedSnowflakes;
      });
    }, 50);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Create a new snowflake
  const createSnowflake = () => {
    const types = ['dot', 'sparkle', 'tiny-bolt'];
    const sizes = [2, 3, 4, 5];
    
    // Color distribution - mostly white/blue with occasional accent colors
    const colorDistribution = [
      'white', 'white', 'white', 'white', 
      'blue', 'blue', 
      'purple', 
      'green'
    ];
    
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 0.5, // Slight horizontal drift
      speedY: Math.random() * 0.8 + 0.2, // Slower vertical fall
      size: sizes[Math.floor(Math.random() * sizes.length)],
      type: types[Math.floor(Math.random() * types.length)],
      color: colorDistribution[Math.floor(Math.random() * colorDistribution.length)],
      opacity: Math.random() * 0.6 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    };
  };
  
  // Function to get color class based on snowflake color
  const getColorClass = (color) => {
    switch(color) {
      case 'purple': return 'text-purple-200';
      case 'blue': return 'text-blue-200';
      case 'green': return 'text-green-200';
      case 'white':
      default: return 'text-white';
    }
  };
  
  // Function to render snowflake based on type
  const renderSnowflake = (snowflake) => {
    const colorClass = getColorClass(snowflake.color);
    
    switch(snowflake.type) {
      case 'sparkle':
        return <Sparkles className={`${colorClass}`} style={{ width: snowflake.size * 2, height: snowflake.size * 2 }} />;
      case 'tiny-bolt':
        return <Bolt className={`${colorClass}`} style={{ width: snowflake.size * 2, height: snowflake.size * 2 }} />;
      case 'dot':
      default:
        return (
          <div className={`rounded-full ${colorClass} bg-current`} style={{
            width: snowflake.size,
            height: snowflake.size
          }}></div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 relative overflow-hidden">
      {/* Snowflake animation */}
      {snowflakes.map((snowflake, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            transform: `translate(${snowflake.x}px, ${snowflake.y}px) rotate(${snowflake.rotation}deg)`,
            opacity: snowflake.opacity,
            transition: 'transform 0.5s linear',
            zIndex: 0
          }}
        >
          {renderSnowflake(snowflake)}
        </div>
      ))}
      
      {/* Main content */}
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 space-y-6 z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-white flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-yellow-400" />
            Sell Your Credits
          </h2>
          <div className="p-2 bg-purple-700 rounded-full">
            <Bolt className="h-6 w-6 text-white" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-300 mb-2">
              Amount of Credits to Sell
            </label>
            <input
              type="number"
              id="creditAmount"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter amount"
              min="1"
              required
            />
          </div>

          <div className="p-4 bg-gray-700 bg-opacity-80 backdrop-blur-sm rounded-lg space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>Current Credit Price:</span>
              <span className="text-blue-400">${currentCreditPrice.toFixed(2)} per unit</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Government Electricity Price:</span>
              <span className="text-blue-400">${governmentElectricityPrice.toFixed(2)} per unit</span>
            </div>
            <div className="border-t border-gray-600 my-2"></div>
            <div className="flex justify-between text-white font-bold">
              <span>Potential Profit:</span>
              <span className="text-green-400 flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                {animatedProfit.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-700'
                : isSubmitting
                ? 'bg-blue-500 cursor-wait'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            disabled={isSubmitting || creditAmount === ''}
          >
            {isSuccess ? 'Transaction Complete' : isSubmitting ? 'Processing...' : 'Sell Credits'}
          </button>
        </form>
        
        {/* Animated glow effect */}
        <div className="absolute -z-10 inset-0 overflow-hidden rounded-xl opacity-20">
          <div 
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-green-400"
            style={{
              filter: 'blur(20px)',
              animation: 'gentlePulse 8s infinite alternate',
            }}
          ></div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes gentlePulse {
          0% { opacity: 0.2; transform: scale(0.98); }
          100% { opacity: 0.4; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default ProducerSell;