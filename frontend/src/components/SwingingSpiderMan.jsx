import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const SwingingSpiderMan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [spiderPosition, setSpiderPosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // Show Spider-Man when scrolling and hide when stopped
      setIsVisible(Math.abs(currentScrollY - lastScrollY) > 5);
      
      // Calculate Spider-Man position based on scroll
      const maxScroll = 2000;
      const progress = Math.min(currentScrollY / maxScroll, 1);
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setSpiderPosition({
        x: -100 + (windowWidth + 200) * progress,
        y: windowHeight * 0.2 + (windowHeight * 0.6) * progress
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

  // Return a hidden div instead of null to maintain consistent rendering
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
          rotate: scrollDirection === 'down' ? 15 : -15
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {/* Web Line */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            height: `${100 + window.scrollY * 0.1}px`,
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.8), rgba(220, 38, 38, 0.3))',
            transformOrigin: 'top center'
          }}
          animate={{
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
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
        </motion.div>        {/* Spider-Man Figure */}
        <motion.div
          className="relative w-16 h-24 flex flex-col items-center justify-start"
          animate={{
            rotate: scrollDirection === 'down' ? [10, 20, 10] : [-10, -20, -10],
            y: [0, 3, 0]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Spider-Man Body Container */}
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Head */}
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full relative border-2 border-red-400 z-10"
              animate={{
                boxShadow: ['0 0 10px rgba(220, 38, 38, 0.5)', '0 0 20px rgba(220, 38, 38, 0.8)', '0 0 10px rgba(220, 38, 38, 0.5)']
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {/* Eyes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-2 h-3 bg-white rounded-full opacity-90 transform -skew-x-12" />
                  <div className="w-2 h-3 bg-white rounded-full opacity-90 transform skew-x-12" />
                </div>
              </div>
              
              {/* Web Pattern on Mask */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path d="M16 4 L16 28 M4 16 L28 16 M8 8 L24 24 M24 8 L8 24" stroke="black" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            </motion.div>
            
            {/* Body/Torso */}
            <motion.div 
              className="w-6 h-10 bg-gradient-to-b from-red-600 via-blue-600 to-red-600 rounded-full relative mt-1 z-10"
              animate={{
                scaleY: [1, 1.05, 1]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {/* Spider Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-white text-xs"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🕷️
                </motion.div>
              </div>
            </motion.div>
            
            {/* Arms */}
            <motion.div 
              className="absolute top-8 left-0 right-0 flex justify-between items-center"
              style={{ width: '100%', paddingLeft: '4px', paddingRight: '4px' }}
              animate={{
                rotate: scrollDirection === 'down' ? [5, -5, 5] : [-5, 5, -5]
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              {/* Left Arm */}
              <motion.div 
                className="w-2.5 h-7 bg-gradient-to-b from-red-600 to-blue-600 rounded-full transform origin-top"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? [-45, -30, -45] : [-60, -45, -60]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              {/* Right Arm */}
              <motion.div 
                className="w-2.5 h-7 bg-gradient-to-b from-red-600 to-blue-600 rounded-full transform origin-top"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? [45, 30, 45] : [60, 45, 60]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Legs */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 flex justify-between items-end"
              style={{ width: '100%', paddingLeft: '8px', paddingRight: '8px' }}
              animate={{
                rotate: scrollDirection === 'down' ? [-2, 2, -2] : [2, -2, 2]
              }}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              {/* Left Leg */}
              <motion.div 
                className="w-2.5 h-8 bg-gradient-to-b from-blue-600 to-red-600 rounded-full transform origin-top"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? [-10, 5, -10] : [10, -5, 10]
                }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
              {/* Right Leg */}
              <motion.div 
                className="w-2.5 h-8 bg-gradient-to-b from-blue-600 to-red-600 rounded-full transform origin-top"
                style={{ transformOrigin: 'top center' }}
                animate={{
                  rotate: scrollDirection === 'down' ? [10, -5, 10] : [-10, 5, -10]
                }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Web Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              left: `${20 + i * 15}px`,
              top: `${10 + i * 20}px`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -10, -20]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3
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
