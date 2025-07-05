import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence = ({ onIntroComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState('loading');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Step progression: loading -> webAnimation -> heroEntry -> webWipe -> complete
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('webAnimation'), 2000);
    const timer2 = setTimeout(() => setCurrentStep('heroEntry'), 4000);
    const timer3 = setTimeout(() => setCurrentStep('webWipe'), 7000);    const timer4 = setTimeout(() => {
      setCurrentStep('complete');
      // Add a slight delay to ensure smooth transition
      setTimeout(() => {
        onIntroComplete();
      }, 300);
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onIntroComplete]);

  // Try to play audio when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio autoplay blocked:', err);
      });
    }
  }, []);

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onSkip();
  };
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/spiderman-theme.mp3" type="audio/mpeg" />
      </audio>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-60 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Skip Intro
      </motion.button>

      <AnimatePresence mode="wait">
        {/* Loading Screen */}
        {currentStep === 'loading' && (
          <motion.div
            key="loading"
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Wanna meet a{' '}
                <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Web Developer?
                </span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* Web Animation */}
        {currentStep === 'webAnimation' && (
          <motion.div
            key="webAnimation"
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Web shooting across screen */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 300 Q300 200 600 300 T1200 300"
                  stroke="url(#webGradient)"
                  strokeWidth="8"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <defs>
                  <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Text being pulled away */}
            <motion.div
              className="text-4xl md:text-6xl font-bold text-white text-center"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.8, x: 200, opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Wanna meet a Web Developer?
            </motion.div>
          </motion.div>
        )}

        {/* Hero Entry */}
        {currentStep === 'heroEntry' && (
          <motion.div
            key="heroEntry"
            className="h-full flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Ben 10 Alien Force inspired background flicker */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"
              animate={{
                opacity: [0.2, 0.4, 0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full relative z-10">
              {/* Profile Photo */}
              <motion.div
                className="flex justify-center md:justify-end"
                initial={{ x: -100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div className="relative">
                  <motion.div
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-red-600 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >                    <img
                      src="/images/Vishal.jpg"
                      alt="Vishal Pandey - Profile Photo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', e.target.src);
                        // First fallback to SVG placeholder
                        if (e.target.src.includes('Vishal.jpg')) {
                          console.log('Falling back to SVG placeholder');
                          e.target.src = "/images/placeholder-profile.svg";
                        } else if (e.target.src.includes('placeholder-profile.svg')) {
                          console.log('SVG also failed, using inline SVG');
                          // Final fallback to inline SVG
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23991b1b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='320' fill='url(%23grad1)'/%3E%3Ccircle cx='160' cy='120' r='40' fill='%23ffffff' opacity='0.9'/%3E%3Cpath d='M120 200 Q160 180 200 200 L200 280 Q160 260 120 280 Z' fill='%23ffffff' opacity='0.9'/%3E%3Ctext x='160' y='300' font-family='Arial, sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle' font-weight='bold'%3EVishal Pandey%3C/text%3E%3C/svg%3E";
                        }
                      }}
                      onLoad={() => console.log('Image loaded successfully:', arguments[0].target.src)}
                    />
                  </motion.div>
                  
                  {/* Glowing ring effect */}
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-red-500/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              {/* Name and About */}
              <motion.div
                className="text-center md:text-left"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Typewriter Name Effect */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-white">Vishal</span>{' '}
                  <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    Pandey
                  </span>
                </motion.h1>

                {/* About Me Summary */}
                <motion.div
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <p className="mb-4">
                    MERN Web Developer, AI-ML Enthusiast.
                    <span className="text-red-400"> Spinning webs of code</span> and
                  </p>
                  <p className="text-lg text-gray-400">
                    Crafting digital experiences with the power of modern web technologies.
                    Ready to swing into your next project!
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Web Wipe Transition */}
        {currentStep === 'webWipe' && (
          <motion.div
            key="webWipe"
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Web mesh overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.3) 2px, transparent 2px),
                  radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.3) 2px, transparent 2px),
                  linear-gradient(45deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                  linear-gradient(-45deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px, 50px 50px, 20px 20px, 20px 20px'
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 2, rotate: 180 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Glass breaking effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
              animate={{
                clipPath: [
                  'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                ]
              }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroSequence;
