import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpiderCommandsHelper = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownHint, setHasShownHint] = useState(false);

  // Show hint after 3 seconds on first visit
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('spider-commands-hint-seen');
    if (!hasSeenHint) {
      setTimeout(() => {
        setHasShownHint(true);
        localStorage.setItem('spider-commands-hint-seen', 'true');
      }, 3000);
    }
  }, []);

  const commands = [
    { 
      cmd: 'help()', 
      desc: 'Show all available commands',
      icon: '❓'
    },
    { 
      cmd: 'webShoot()', 
      desc: 'Shoot a web effect',
      icon: '🕸️'
    },
    { 
      cmd: 'spiderSense()', 
      desc: 'Activate spider-sense visual effect',
      icon: '🕷️'
    },
    { 
      cmd: 'spideySwing()', 
      desc: 'Manual Spider-Man swing animation',
      icon: '🔴'
    },
    { 
      cmd: 'alienTransform()', 
      desc: 'Ben 10 transformation',
      icon: '👽'
    },
    { 
      cmd: 'playWebGame()', 
      desc: 'Launch web shooter game',
      icon: '🎮'
    },
    { 
      cmd: 'talkToEdith()', 
      desc: 'Open EDITH AI chat',
      icon: '🤖'
    }
  ];

  const copyToClipboard = (command) => {
    navigator.clipboard.writeText(command);
    // Could add a toast notification here
  };

  return (
    <>
      {/* Floating Spider Helper Button */}
      <motion.div
        className="fixed bottom-28 right-6 z-40"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => setIsVisible(true)}
          className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-2xl shadow-red-500/50 flex items-center justify-center text-white border-2 border-red-400 relative overflow-hidden"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.8)',
            rotate: [0, -10, 10, 0]
          }}
          whileTap={{ scale: 0.9 }}
          title="Spider Commands"
        >
          {/* Spider Icon */}
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🕷️
          </motion.div>
          
          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-400"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.8, 0.2, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Web Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path 
                d="M28 4 L28 52 M4 28 L52 28 M12 12 L44 44 M44 12 L12 44 M28 12 C34 12 44 22 44 28 C44 34 34 44 28 44 C22 44 12 34 12 28 C12 22 22 12 28 12" 
                stroke="white" 
                strokeWidth="1.5" 
                fill="none" 
              />
            </svg>
          </div>
        </motion.button>
      </motion.div>

      {/* Hint Tooltip for First-time Visitors */}
      <AnimatePresence>
        {hasShownHint && !localStorage.getItem('spider-commands-hint-dismissed') && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-42 right-6 z-50 bg-gradient-to-br from-gray-900 to-black border-2 border-red-400 rounded-lg p-4 max-w-xs shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🕷️</div>
              <div>
                <h4 className="text-red-400 font-bold text-sm mb-1">Spider Powers Available!</h4>
                <p className="text-gray-300 text-xs mb-3">
                  Press <code className="bg-red-900/50 px-1 rounded text-red-300">F12</code> and try console commands, or click the spider icon!
                </p>
                <button
                  onClick={() => {
                    setHasShownHint(false);
                    localStorage.setItem('spider-commands-hint-dismissed', 'true');
                  }}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Got it! ✨
                </button>
              </div>
            </div>
            
            {/* Arrow pointing to button */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-400"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Commands Modal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 180 }}
              className="bg-gradient-to-br from-gray-900 via-red-900/20 to-black border-2 border-red-400 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(60,5,5,0.9) 25%, rgba(15,15,35,0.95) 50%, rgba(20,5,5,0.9) 75%, rgba(0,0,0,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 50px rgba(220, 38, 38, 0.3)'
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-red-400/30 bg-gradient-to-r from-red-900/20 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      🕷️
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Spider Commands
                      </h2>
                      <p className="text-gray-400 text-sm">Interactive console commands for this portfolio</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsVisible(false)}
                    className="w-10 h-10 rounded-full bg-red-600/20 border border-red-400 text-red-400 flex items-center justify-center hover:bg-red-600/40 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* How to Use */}
              <div className="p-6 border-b border-red-400/20">
                <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span>🎯</span> How to Use
                </h3>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-red-400/20">
                  <ol className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">1.</span>
                      <span>Open Developer Console: Press <code className="bg-red-900/50 px-2 py-1 rounded text-red-300">F12</code> (or right-click → Inspect)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">2.</span>
                      <span>Click on the <strong>Console</strong> tab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">3.</span>
                      <span>Type any command below and press <strong>Enter</strong></span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Commands List */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span>⚡</span> Available Commands
                </h3>
                <div className="space-y-3">
                  {commands.map((command, index) => (
                    <motion.div
                      key={command.cmd}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-900/50 rounded-lg p-4 border border-red-400/20 hover:border-red-400/40 transition-colors group cursor-pointer"
                      onClick={() => copyToClipboard(command.cmd)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{command.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="bg-red-900/50 text-red-300 px-2 py-1 rounded font-mono text-sm">
                              {command.cmd}
                            </code>
                            <motion.span
                              className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              Click to copy
                            </motion.span>
                          </div>
                          <p className="text-gray-400 text-sm">{command.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-red-400/20 bg-gradient-to-r from-red-900/10 to-transparent">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span>🕸️ With great power comes great responsibility</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpiderCommandsHelper;
