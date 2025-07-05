import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    {
      category: "Web Slinging",
      icon: "🕸️",
      color: "from-red-500 to-red-700",
      borderColor: "border-red-500/30",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "JavaScript", level: 90, icon: "🟨" },
        { name: "TypeScript", level: 85, icon: "🔷" },
        { name: "Next.js", level: 88, icon: "▲" }
      ]
    },
    {
      category: "Backend Powers",
      icon: "⚡",
      color: "from-blue-500 to-blue-700",
      borderColor: "border-blue-500/30",
      skills: [
        { name: "Node.js", level: 87, icon: "🟢" },
        { name: "Python", level: 82, icon: "🐍" },
        { name: "Express", level: 85, icon: "🚀" },
        { name: "MongoDB", level: 80, icon: "🍃" }
      ]
    },
    {
      category: "Design Vision",
      icon: "👁️",
      color: "from-purple-500 to-purple-700",
      borderColor: "border-purple-500/30",
      skills: [
        { name: "Tailwind CSS", level: 92, icon: "🎨" },
        { name: "Figma", level: 78, icon: "🎯" },
        { name: "Three.js", level: 75, icon: "🎮" },
        { name: "Framer Motion", level: 88, icon: "✨" }
      ]
    },
    {
      category: "Hero Tools",
      icon: "🛠️",
      color: "from-green-500 to-green-700",
      borderColor: "border-green-500/30",
      skills: [
        { name: "Git", level: 60, icon: "📝" },
        { name: "Docker", level: 20, icon: "🐳" },
        { name: "AWS", level: 20, icon: "☁️" },
        { name: "Webpack", level: 20, icon: "📦" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        className="max-w-7xl mx-auto"
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
            <span className="text-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Superpowers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every great hero has unique abilities. Here are mine, honed through countless battles with bugs and late-night coding sessions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6"></div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {skills.map((skillCategory, categoryIndex) => (
            <motion.div
              key={skillCategory.category}
              variants={itemVariants}
              className={`relative p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border ${skillCategory.borderColor} backdrop-blur-sm`}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skillCategory.color} opacity-5 rounded-2xl`}
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: categoryIndex * 0.5
                }}
              />

              <div className="relative z-10">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <motion.div
                    className="text-4xl mr-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: categoryIndex * 0.3
                    }}
                  >
                    {skillCategory.icon}
                  </motion.div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${skillCategory.color} bg-clip-text text-transparent`}>
                    {skillCategory.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{skill.icon}</span>
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      
                      {/* Skill Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skillCategory.color} relative`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          {/* Glowing effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${skillCategory.color} opacity-50`}
                            animate={{
                              opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Power Level Indicator */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="inline-block p-6 bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-2xl border border-red-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-2xl font-bold text-white mb-2">Overall Power Level</h4>
            <motion.div
              className="text-6xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              OVER 9000!
            </motion.div>
            <p className="text-gray-400 mt-2">Ready to tackle any web development challenge</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
