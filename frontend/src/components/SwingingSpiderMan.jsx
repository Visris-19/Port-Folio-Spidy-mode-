import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const SwingingSpiderMan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [spiderPosition, setSpiderPosition] = useState({ x: 0, y: 0 });
  const [swingAngle, setSwingAngle] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const { scrollY } = useScroll();
    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Determine scroll direction and velocity
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // More realistic velocity calculation
      const newVelocity = Math.min(Math.abs(scrollDelta) * 0.5, 20);
      setVelocity(newVelocity);
      
      // Show Spider-Man when scrolling with minimum velocity
      setIsVisible(Math.abs(scrollDelta) > 3);
      
      // More realistic swinging physics
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / maxScroll, 1);
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate swing angle based on velocity and direction
      const baseAngle = scrollDirection === 'down' ? 15 : -15;
      const velocityAngle = (newVelocity / 20) * 30; // Max 30 degrees based on velocity
      const newSwingAngle = baseAngle + (scrollDirection === 'down' ? velocityAngle : -velocityAngle);
      setSwingAngle(newSwingAngle);
      
      // More natural arc movement
      const webLength = 150 + currentScrollY * 0.05;
      const swingRadius = webLength * 0.7;
      const pendulumX = Math.sin((progress * Math.PI * 2) + (scrollDelta * 0.01)) * swingRadius;
      
      setSpiderPosition({
        x: (windowWidth * 0.3) + pendulumX + (windowWidth * 0.4) * progress,
        y: Math.max(windowHeight * 0.1, windowHeight * 0.2 + (windowHeight * 0.5) * progress - Math.abs(pendulumX) * 0.3)
      });
      
      setLastScrollY(currentScrollY);
    };

    let scrollTimeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 150); // Hide after scroll stops
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollEnd);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
    }, [lastScrollY]);

  // Calculate realistic web line length and angle
  const webLength = 150 + window.scrollY * 0.05;
  const webAngle = swingAngle * 0.5; // Web follows but is more stable than Spider-Man  // Return a hidden div instead of null to maintain consistent rendering
  if (!isVisible) {
    return <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden opacity-0" />;
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Spider-Man with Web */}
      <motion.div
        className="absolute"
        style={{
          left: `${spiderPosition.x}px`,
          top: `${spiderPosition.y}px`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0,
          rotate: swingAngle,
          y: [0, -5, 0] // Subtle bobbing motion
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut",
          y: { duration: 1 + (velocity * 0.05), repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Web Line - More realistic physics */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            height: `${webLength}px`,
            width: '3px',
            background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.9), rgba(220, 38, 38, 0.4), rgba(255, 255, 255, 0.3))',
            transformOrigin: 'top center',
            boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)'
          }}
          animate={{
            rotate: webAngle,
            scaleY: [0.95, 1, 0.95], // Web stretches slightly
          }}
          transition={{
            duration: 0.8 + (velocity * 0.02),
            repeat: Infinity,
            ease: "easeInOut",
            rotate: { duration: 0.5, ease: "easeOut" }
          }}
        />
        
        {/* Web Attachment Point */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
        </motion.div>        {/* Spider-Man Figure - Enhanced proportions */}
        <motion.div
          className="relative w-20 h-32 flex flex-col items-center justify-start"
          animate={{
            rotate: scrollDirection === 'down' ? 
              [swingAngle * 0.3, swingAngle * 0.5, swingAngle * 0.3] : 
              [swingAngle * 0.3, swingAngle * 0.5, swingAngle * 0.3],
            y: [0, velocity * 0.3, 0], // More dynamic movement based on velocity
            scaleX: scrollDirection === 'down' ? [1, 0.95, 1] : [1, 1.05, 1] // Compression effect
          }}
          transition={{
            duration: 0.6 + (velocity * 0.02),
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Spider-Man Body Container */}
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Head - More realistic proportions */}
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full relative border-2 border-red-400 z-10"
              animate={{
                boxShadow: ['0 0 15px rgba(220, 38, 38, 0.6)', '0 0 25px rgba(220, 38, 38, 0.9)', '0 0 15px rgba(220, 38, 38, 0.6)'],
                scaleY: scrollDirection === 'down' ? [1, 1.1, 1] : [1, 0.9, 1] // Head movement with velocity
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                scaleY: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              {/* Enhanced Eyes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-1.5">
                  <motion.div 
                    className="w-3 h-4 bg-white rounded-full opacity-95 transform -skew-x-12 relative overflow-hidden"
                    animate={{
                      scaleY: velocity > 10 ? [1, 0.7, 1] : [1, 0.9, 1] // Squinting at high speed
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    {/* Eye reflection */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-blue-200 rounded-full opacity-70" />
                  </motion.div>
                  <motion.div 
                    className="w-3 h-4 bg-white rounded-full opacity-95 transform skew-x-12 relative overflow-hidden"
                    animate={{
                      scaleY: velocity > 10 ? [1, 0.7, 1] : [1, 0.9, 1]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <div className="absolute top-1 right-1 w-1 h-1 bg-blue-200 rounded-full opacity-70" />
                  </motion.div>
                </div>
              </div>
              
              {/* Enhanced Web Pattern */}
              <div className="absolute inset-0 opacity-40">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path 
                    d="M20 2 L20 38 M2 20 L38 20 M6 6 L34 34 M34 6 L6 34 M20 8 C25 8 32 15 32 20 C32 25 25 32 20 32 C15 32 8 25 8 20 C8 15 15 8 20 8" 
                    stroke="black" 
                    strokeWidth="0.8" 
                    fill="none" 
                  />
                </svg>
              </div>
            </motion.div>
            
            {/* Body/Torso - More athletic build */}
            <motion.div 
              className="w-8 h-14 bg-gradient-to-b from-red-600 via-blue-600 to-red-600 rounded-lg relative mt-1 z-10"
              style={{
                background: 'linear-gradient(to bottom, #dc2626 0%, #dc2626 30%, #2563eb 50%, #dc2626 70%, #dc2626 100%)',
                borderRadius: '16px'
              }}
              animate={{
                scaleY: scrollDirection === 'down' ? [1, 1.1, 1] : [1, 0.95, 1],
                scaleX: [1, 0.95, 1] // Breathing effect
              }}
              transition={{ 
                duration: 0.6 + (velocity * 0.02), 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Muscle definition */}
              <div className="absolute inset-2 bg-gradient-to-b from-red-500/30 to-blue-500/30 rounded-lg" />
              
              {/* Enhanced Spider Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-yellow-300 text-lg drop-shadow-lg"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    textShadow: ['0 0 5px rgba(0,0,0,0.5)', '0 0 10px rgba(0,0,0,0.8)', '0 0 5px rgba(0,0,0,0.5)']
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  🕷️
                </motion.div>
              </div>
              
              {/* Chest web pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 32 56" className="w-full h-full">
                  <path 
                    d="M16 8 L8 20 L16 32 L24 20 Z M16 16 L16 40 M8 28 L24 28" 
                    stroke="black" 
                    strokeWidth="1" 
                    fill="none" 
                  />
                </svg>
              </div>
            </motion.div>
            
            {/* Arms - More realistic swinging motion */}
            <motion.div 
              className="absolute top-10 left-0 right-0 flex justify-between items-center"
              style={{ width: '100%', paddingLeft: '6px', paddingRight: '6px' }}
              animate={{
                rotate: scrollDirection === 'down' ? 
                  [swingAngle * 0.2, -swingAngle * 0.2, swingAngle * 0.2] : 
                  [-swingAngle * 0.2, swingAngle * 0.2, -swingAngle * 0.2]
              }}
              transition={{ duration: 0.5 + (velocity * 0.02), repeat: Infinity }}
            >
              {/* Left Arm - Web shooting arm */}
              <motion.div 
                className="w-3 h-9 bg-gradient-to-b from-red-600 to-blue-600 rounded-full transform origin-top shadow-lg"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? 
                    [-60 - (velocity * 2), -30 - (velocity), -60 - (velocity * 2)] : 
                    [-80 - (velocity * 2), -50 - (velocity), -80 - (velocity * 2)]
                }}
                transition={{ duration: 0.7 + (velocity * 0.02), repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Web shooter detail */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-silver rounded-full opacity-80" />
              </motion.div>
              
              {/* Right Arm */}
              <motion.div 
                className="w-3 h-9 bg-gradient-to-b from-red-600 to-blue-600 rounded-full transform origin-top shadow-lg"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? 
                    [60 + (velocity * 2), 30 + (velocity), 60 + (velocity * 2)] : 
                    [80 + (velocity * 2), 50 + (velocity), 80 + (velocity * 2)]
                }}
                transition={{ duration: 0.7 + (velocity * 0.02), repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-silver rounded-full opacity-80" />
              </motion.div>
            </motion.div>
            
            {/* Legs - More dynamic swinging motion */}
            <motion.div 
              className="absolute bottom-2 left-0 right-0 flex justify-between items-end"
              style={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}
              animate={{
                rotate: scrollDirection === 'down' ? 
                  [-swingAngle * 0.1, swingAngle * 0.1, -swingAngle * 0.1] : 
                  [swingAngle * 0.1, -swingAngle * 0.1, swingAngle * 0.1]
              }}
              transition={{ duration: 0.6 + (velocity * 0.02), repeat: Infinity }}
            >
              {/* Left Leg */}
              <motion.div 
                className="w-3 h-10 bg-gradient-to-b from-blue-600 to-red-600 rounded-full transform origin-top shadow-lg"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? 
                    [-15 - (velocity * 0.5), 10 + (velocity * 0.5), -15 - (velocity * 0.5)] : 
                    [15 + (velocity * 0.5), -10 - (velocity * 0.5), 15 + (velocity * 0.5)]
                }}
                transition={{ duration: 0.8 + (velocity * 0.02), repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Boot detail */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-800 rounded-b-full" />
              </motion.div>
              
              {/* Right Leg */}
              <motion.div 
                className="w-3 h-10 bg-gradient-to-b from-blue-600 to-red-600 rounded-full transform origin-top shadow-lg"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? 
                    [15 + (velocity * 0.5), -10 - (velocity * 0.5), 15 + (velocity * 0.5)] : 
                    [-15 - (velocity * 0.5), 10 + (velocity * 0.5), -15 - (velocity * 0.5)]
                }}
                transition={{ duration: 0.8 + (velocity * 0.02), repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-800 rounded-b-full" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Web Particles with physics */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-white rounded-full"
            style={{
              left: `${25 + i * 18}px`,
              top: `${15 + i * 25}px`,
              boxShadow: '0 0 4px rgba(220, 38, 38, 0.8)'
            }}
            animate={{
              opacity: [0, 1, 0.7, 0],
              scale: [0, 1.2, 0.8, 0],
              y: [0, -15, -30, -45],
              x: [0, Math.sin(i) * 10, Math.sin(i * 2) * 15, Math.sin(i * 3) * 20]
            }}
            transition={{
              duration: 2 - (velocity * 0.05),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>      {/* Spider Sense Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${spiderPosition.x}px`,
          top: `${spiderPosition.y}px`,
        }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      >
        <div className="w-32 h-32 border-2 border-red-500 rounded-full" />
      </motion.div>

      {/* Web Trail Effect */}
      <motion.div
        className="absolute"
        style={{
          left: `${spiderPosition.x - 100}px`,
          top: `${spiderPosition.y}px`,
        }}
        animate={{
          opacity: isVisible ? [0, 0.6, 0] : 0
        }}
        transition={{ duration: 1 }}
      >
        <svg width="100" height="20" viewBox="0 0 100 20" className="transform rotate-12">
          <motion.path
            d="M0 10 Q25 5 50 10 T100 10"
            stroke="rgba(220, 38, 38, 0.6)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [0, -20]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default SwingingSpiderMan;
