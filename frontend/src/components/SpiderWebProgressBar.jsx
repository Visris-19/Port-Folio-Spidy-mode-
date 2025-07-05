import { motion, useScroll, useTransform } from 'framer-motion';

const SpiderWebProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const spiderLeft = useTransform(scrollYProgress, [0, 1], ['0%', 'calc(100% - 24px)']);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Main Progress Web */}
      <motion.div
        className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 origin-left shadow-lg shadow-red-500/50"
        style={{
          scaleX: scrollYProgress
        }}
      />
      
      {/* Spider traveling on the web */}
      <motion.div
        className="absolute top-0 w-6 h-6 flex items-center justify-center"
        style={{
          left: spiderLeft
        }}
      >
        <motion.div
          className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          🕷️
        </motion.div>
        
        {/* Trailing web effect */}
        <motion.div
          className="absolute top-1/2 right-full w-8 h-0.5 bg-gradient-to-l from-red-500 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
        {/* Web droplets */}
      {[...Array(5)].map((_, i) => {
        const dropletLeft = useTransform(scrollYProgress, [0, 1], [`${i * 20}%`, `${i * 20 + 20}%`]);
        return (
          <motion.div
            key={i}
            className="absolute top-2 w-1 h-1 bg-red-400 rounded-full"
            style={{
              left: dropletLeft
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />
        );
      })}
    </div>
  );
};

export default SpiderWebProgressBar;
