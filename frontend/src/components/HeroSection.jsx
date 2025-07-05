import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SpiderWebGame from './SpiderWebGame';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showGame, setShowGame] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set up audio event listeners
      const handleCanPlay = () => setAudioLoaded(true);
      const handlePlay = () => setIsAudioPlaying(true);
      const handlePause = () => setIsAudioPlaying(false);
      const handleEnded = () => setIsAudioPlaying(false);

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      // Try to play when component mounts (with user interaction)
      const tryAutoPlay = () => {
        if (audioLoaded) {
          audio.play().catch(err => {
            console.log('Autoplay prevented:', err);
          });
        }
      };

      // Delay autoplay attempt
      const timer = setTimeout(tryAutoPlay, 1000);

      return () => {
        clearTimeout(timer);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioLoaded]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isAudioPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => {
          console.log('Play failed:', err);
        });
      }
    }
  };

  const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
  return (    <section 
      ref={ref} 
      className="min-h-screen flex items-center justify-center relative px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{
        background: 'linear-gradient(135deg, #111827 0%, #000000 25%, #1f2937 50%, #000000 75%, #111827 100%)'
      }}
    >
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        onError={(e) => console.log('Audio error:', e)}
      >
        <source src="/audio/hero-background.mp3" type="audio/mpeg" />
        <source src="/audio/portfolio-theme.mp3" type="audio/mpeg" />
        {/* Fallback message */}
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button */}
      <motion.button
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-30 p-3 bg-black/80 border border-red-500/30 rounded-full text-white hover:bg-red-600/20 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        title={isAudioPlaying ? 'Pause Music' : 'Play Music'}
      >
        <motion.div
          animate={{ rotate: isAudioPlaying ? [0, 360] : 0 }}
          transition={{ duration: 3, repeat: isAudioPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isAudioPlaying ? '🎵' : '🎶'}
        </motion.div>
      </motion.button><div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-white">Your</span>{' '}
            <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Friendly Neighborhood
            </span>{' '}
            <span className="text-white">Developer</span>
          </motion.h1>
            <motion.p 
            className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Spinning webs of code and crafting digital experiences
          </motion.p>            <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-red-600 text-white text-xl font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-red-600 text-red-600 text-xl font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>

            {/* Spider-Web Game Button */}
            <motion.button
              onClick={() => setShowGame(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🕷️ Play Web Shooter
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-red-600 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>        </motion.div>
      </div>

      {/* Spider-Web Game Modal */}
      <SpiderWebGame 
        isOpen={showGame} 
        onClose={() => setShowGame(false)} 
      />
    </section>
  );
};

export default HeroSection;
