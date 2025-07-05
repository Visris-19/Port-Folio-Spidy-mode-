import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import IntroSequence from './components/IntroSequence';
import ThreeDBackground from './components/ThreeDBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import ConsoleEasterEgg from './components/ConsoleEasterEgg';
import EdithFloatingButton from './components/EdithFloatingButton';
import SwingingSpiderMan from './components/SwingingSpiderMan';
import SpiderWebProgressBar from './components/SpiderWebProgressBar';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  // Track scroll position to update current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    if (!showIntro) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showIntro]);

  // Track scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrolled / maxHeight;
      setScrollYProgress(progress);
    };

    if (!showIntro) {
      window.addEventListener('scroll', updateScrollProgress);
      return () => window.removeEventListener('scroll', updateScrollProgress);
    }
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Console Easter Egg */}
      <ConsoleEasterEgg />

      {/* Intro Sequence */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSequence 
            onIntroComplete={handleIntroComplete}
            onSkip={handleSkipIntro}
          />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full min-h-screen"
        >
            {/* 3D Background */}
            <ThreeDBackground currentSection={currentSection} />

            {/* Swinging Spider-Man on Scroll */}
            <SwingingSpiderMan />

            {/* Navigation */}
            <Navigation 
              currentSection={currentSection} 
              setCurrentSection={setCurrentSection} 
            />

            {/* Audio Control */}
            <motion.button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="fixed top-4 left-4 z-50 p-3 bg-black/80 border border-red-500/30 rounded-full text-white hover:bg-red-600/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isAudioMuted ? '🔇' : '🔊'}
            </motion.button>

            {/* Spider Web Scroll Progress */}
            <SpiderWebProgressBar />

            {/* Main Content Sections */}
            <main>
              <section id="hero">
                <HeroSection />
              </section>

              <section id="about">
                <AboutSection />
              </section>

              <section id="skills">
                <SkillsSection />
              </section>

              <section id="projects">
                <ProjectsSection />
              </section>

              <section id="contact">
                <ContactSection />
              </section>
            </main>

            {/* Footer */}
            <motion.footer
              className="relative py-12 px-4 border-t border-gray-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto text-center">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      S
                    </motion.div>
                    <span className="text-gray-300">
                      © 2025 Spider-Dev Portfolio. Built with 🕷️ and ⚡
                    </span>
                  </div>

                  <div className="flex space-x-6">
                    {[
                      { href: 'https://github.com/yourusername', icon: '🐙', label: 'GitHub' },
                      { href: 'https://linkedin.com/in/yourprofile', icon: '💼', label: 'LinkedIn' },
                      { href: 'https://twitter.com/yourusername', icon: '🐦', label: 'Twitter' },
                      { href: 'mailto:your.email@example.com', icon: '📧', label: 'Email' }
                    ].map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:scale-110 transition-transform"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        title={link.label}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>
                    "With great power comes great responsibility" - Spider-Man
                  </p>
                  <p className="mt-2">
                    🕸️ Spinning webs of code since 2021 • Made with React, Three.js & lots of ☕
                  </p>
                </motion.div>
              </div>
            </motion.footer>

            {/* Floating Web Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-red-500/20 text-6xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  🕸️
                </motion.div>
              ))}
            </div>

            {/* EDITH AI Floating Button */}
            <EdithFloatingButton />
          </motion.div>
        )}
    </div>
  );
}

export default App;
