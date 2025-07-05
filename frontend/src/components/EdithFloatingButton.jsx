import { useState } from 'react';
import { motion } from 'framer-motion';
import EdithAI from './EdithAI';

const EdithFloatingButton = () => {
  const [showEdith, setShowEdith] = useState(false);

  return (
    <>
      {/* Floating EDITH Button */}
      <motion.button
        onClick={() => setShowEdith(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 2 // Appear after page loads
        }}
      >
        <div className="relative">
          {/* AI Icon */}
          <div className="text-2xl">🤖</div>
          
          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-full opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="fixed bottom-6 right-20 z-40 bg-black text-white px-3 py-2 rounded-lg text-sm pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.5 }}
        whileHover={{ opacity: 0 }}
      >
        💬 Talk to EDITH
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-black transform rotate-45 -translate-y-1/2"></div>
      </motion.div>

      {/* EDITH AI Modal */}
      <EdithAI 
        isOpen={showEdith} 
        onClose={() => setShowEdith(false)} 
      />
    </>
  );
};

export default EdithFloatingButton;
