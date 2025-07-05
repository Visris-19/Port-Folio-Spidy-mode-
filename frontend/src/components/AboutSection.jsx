import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 relative">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-green-500 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Origin Story
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              className="relative p-8 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl border border-green-500/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Ben 10 Alien Force style background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">
                  From Spider-Bite to Code-Write
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  It all started when I was bitten by a radioactive computer bug during a late-night coding session. 
                  Since then, I've developed superhuman abilities to debug code, swing between different tech stacks, 
                  and sense when websites need responsive design from miles away.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With great power comes great responsibility... to create amazing web experiences that users love. 
                  Whether it's crafting pixel-perfect UIs or architecting robust backend systems, 
                  I'm here to save the day (and your project deadlines).
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              <div className="text-center p-6 bg-black/40 rounded-xl border border-green-500/30">
                <div className="text-3xl font-bold text-green-500 mb-2">10+</div>
                <div className="text-gray-300">Projects Saved</div>
              </div>
              <div className="text-center p-6 bg-black/40 rounded-xl border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-500 mb-2">Fresher</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-black/40 rounded-xl border border-red-500/30">
                <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                <div className="text-gray-300">Bug Fighting</div>
              </div>
              <div className="text-center p-6 bg-black/40 rounded-xl border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-500 mb-2">∞</div>
                <div className="text-gray-300">Coffee Consumed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Character Card */}          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-80 h-[420px] bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-2xl p-6 border border-red-500/30 shadow-xl"
              whileHover={{ rotateY: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Comic book style background */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.03) 50%, transparent 51%)
                  `
                }}
              />              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Character Image */}
                <motion.div
                  className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-500 shadow-lg shadow-red-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/character-avatar.png"
                    alt="Developer Avatar"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cdefs%3E%3CradialGradient id='heroGrad' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23991b1b;stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23heroGrad)'/%3E%3Ccircle cx='80' cy='60' r='20' fill='%23fff' opacity='0.9'/%3E%3Ccircle cx='70' cy='55' r='3' fill='%23000'/%3E%3Ccircle cx='90' cy='55' r='3' fill='%23000'/%3E%3Cpath d='M70 70 Q80 80 90 70' stroke='%23000' stroke-width='2' fill='none'/%3E%3Ctext x='50%25' y='85%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='12' fill='%23fff' font-weight='bold'%3ESpider-Dev%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </motion.div>                {/* Character Info */}
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h4 className="text-2xl font-bold text-white mb-2">Spider-Dev</h4>
                  <p className="text-red-400 mb-6">Full-Stack Hero</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Debugging</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-green-500 rounded-full mx-0.5 shadow-sm shadow-green-500/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Web Slinging</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-red-500 rounded-full mx-0.5 shadow-sm shadow-red-500/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Problem Solving</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-blue-500 rounded-full mx-0.5 shadow-sm shadow-blue-500/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + 1 }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Coffee Addiction</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-yellow-500 rounded-full mx-0.5 shadow-sm shadow-yellow-500/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + 1.5 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
