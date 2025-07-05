import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpiderWebGame = ({ isOpen, onClose }) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState([]);
  const [webs, setWebs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem('spiderWebHighScore') || 0);
  const gameAreaRef = useRef();

  // Generate random targets
  const generateTarget = () => {
    return {
      id: Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of width
      y: Math.random() * 70 + 15, // 15% to 85% of height
      size: Math.random() * 30 + 20, // 20px to 50px
      type: Math.random() > 0.8 ? 'villain' : 'citizen' // 20% villains, 80% citizens
    };
  };

  // Start game
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setTargets([generateTarget(), generateTarget(), generateTarget()]);
    setWebs([]);
  };

  // Shoot web
  const shootWeb = (e) => {
    if (!gameActive || gameOver) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newWeb = {
      id: Math.random(),
      x,
      y,
      timestamp: Date.now()
    };
    
    setWebs(prev => [...prev, newWeb]);
    
    // Check for hits
    const hitTargets = targets.filter(target => {
      const distance = Math.sqrt(
        Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2)
      );
      return distance < 8; // Hit radius
    });
    
    hitTargets.forEach(target => {
      if (target.type === 'villain') {
        setScore(prev => prev + 100); // Bonus for villains
      } else {
        setScore(prev => prev + 50); // Regular points for citizens
      }
    });
    
    // Remove hit targets and add new ones
    if (hitTargets.length > 0) {
      setTargets(prev => {
        const remaining = prev.filter(target => !hitTargets.includes(target));
        const newTargets = [];
        for (let i = remaining.length; i < 3; i++) {
          newTargets.push(generateTarget());
        }
        return [...remaining, ...newTargets];
      });
    }
    
    // Remove web after animation
    setTimeout(() => {
      setWebs(prev => prev.filter(web => web.id !== newWeb.id));
    }, 500);
  };

  // Game timer
  useEffect(() => {
    if (gameActive && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('spiderWebHighScore', score);
      }
    }
  }, [gameActive, timeLeft, gameOver, score, highScore]);

  // Move targets periodically
  useEffect(() => {
    if (gameActive && !gameOver) {
      const moveTargets = setInterval(() => {
        setTargets(prev => prev.map(target => ({
          ...target,
          x: Math.max(5, Math.min(95, target.x + (Math.random() - 0.5) * 20)),
          y: Math.max(10, Math.min(90, target.y + (Math.random() - 0.5) * 20))
        })));
      }, 2000);
      return () => clearInterval(moveTargets);
    }
  }, [gameActive, gameOver]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-red-900 to-black border-2 border-red-500 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Game Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🕷️ Spider-Web Shooter
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Game Stats */}
          <div className="flex justify-between items-center mb-4 text-white">
            <div className="flex gap-6">
              <span>Score: <span className="text-red-400 font-bold">{score}</span></span>
              <span>Time: <span className="text-blue-400 font-bold">{timeLeft}s</span></span>
              <span>High Score: <span className="text-yellow-400 font-bold">{highScore}</span></span>
            </div>
            {!gameActive && !gameOver && (
              <button
                onClick={startGame}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Start Game
              </button>
            )}
          </div>

          {/* Game Instructions */}
          {!gameActive && !gameOver && (
            <div className="text-center text-gray-300 mb-6">
              <p className="mb-2">🎯 Click to shoot webs at moving targets!</p>
              <p className="mb-2">🦹‍♂️ Red targets (villains) = 100 points | 👥 Blue targets (citizens) = 50 points</p>
              <p>⏱️ You have 30 seconds to get the highest score!</p>
            </div>
          )}

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-b from-blue-900 to-purple-900 border-2 border-red-500 rounded-lg h-96 cursor-crosshair overflow-hidden"
            onClick={shootWeb}
          >
            {/* City Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gray-700"
                  style={{
                    left: `${(i % 5) * 20}%`,
                    bottom: 0,
                    width: '15%',
                    height: `${Math.random() * 60 + 20}%`,
                  }}
                />
              ))}
            </div>

            {/* Targets */}
            {targets.map((target) => (
              <motion.div
                key={target.id}
                className={`absolute rounded-full border-2 flex items-center justify-center font-bold text-white ${
                  target.type === 'villain' 
                    ? 'bg-red-600 border-red-400' 
                    : 'bg-blue-600 border-blue-400'
                }`}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {target.type === 'villain' ? '🦹‍♂️' : '👥'}
              </motion.div>
            ))}

            {/* Web Shots */}
            {webs.map((web) => (
              <motion.div
                key={web.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${web.x}%`,
                  top: `${web.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  {/* Web pattern */}
                  <div className="w-16 h-16 relative">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white h-0.5 w-8 origin-left"
                        style={{
                          transform: `rotate(${i * 45}deg)`,
                          left: '50%',
                          top: '50%',
                          marginLeft: '-16px',
                          marginTop: '-1px'
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 border-2 border-white rounded-full w-4 h-4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute inset-0 border border-white rounded-full w-8 h-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Game Over Overlay */}
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">Game Over!</h3>
                  <p className="text-xl mb-2">Final Score: <span className="text-red-400">{score}</span></p>
                  {score > highScore && (
                    <p className="text-yellow-400 mb-4">🎉 New High Score!</p>
                  )}
                  <button
                    onClick={startGame}
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Game Active Indicator */}
            {gameActive && !gameOver && (
              <div className="absolute top-4 left-4 text-white">
                <p className="text-sm opacity-75">Click to shoot webs! 🕸️</p>
              </div>
            )}
          </div>

          {/* Game Tips */}
          <div className="mt-4 text-sm text-gray-400 text-center">
            <p>💡 Tip: Aim carefully - targets move every 2 seconds! Red villains give bonus points!</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpiderWebGame;
