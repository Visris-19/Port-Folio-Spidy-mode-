import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Skill Mela",
      subtitle: "Sikhega India tabhi toh badhega India",
      description: "A full-stack freelancing platform connecting skilled professionals with clients. Features include user profiles, job listings, and secure payment processing, with having learning opportunities for freelancers to enhance their skills, mentorship programs.",
      image: "/images/project1.jpg",
      tech: [ "CSS", "Node.js", "MongoDB", "Express JS", "EJS"],
      status: "IN PROGRESS",
      difficulty: "★★★★☆",
      liveUrl: 'https://skillmela.onrender.com',
      githubUrl: null,
      color: "from-red-500 to-orange-500"
    },
    {
      id: 2,
      title: "A To-Do App",
      subtitle: "Mission: Complete task like a hero",
      description: "A task management application that helps users organize their daily tasks with features like due dates, reminders, and priority levels. Built with a focus on user experience and performance, with profile management and task sharing capabilities, having google authentication and real-time updates.",
      image: "/images/project2.jpg",
      tech: ["MONGO DB", "React", "Tailwind", "Express", "Node.js"],
      status: "COMPLETED",
      difficulty: "★★★★★",
      liveUrl: null,
      githubUrl: "https://github.com/Visris-19/To-Do-App",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      title: "Baatify",
      subtitle: "Mission: Unite the Heroes",
      description: "A real time chat application for managing superhero teams, tracking missions, and coordinating responses to threats. Real-time communication and mission planning included.",
      image: "/images/project3.jpg",
      tech: ["MONGO DB", "Express", "React", "WebRTC", "Socket.io", "Node.js"],
      status: "IN PROGRESS",
      difficulty: "★★★★☆",
      liveUrl: null,
      githubUrl: "https://github.com/Visris-19/Baatify",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Time-Space Portfolio",
      subtitle: "Mission: Showcase Powers",
      description: "This very portfolio you're viewing! A 3D interactive experience showcasing web development skills through Spider-Man and Ben 10 inspired design elements.",
      image: "/images/project4.jpg",
      tech: ["React", "Three.js", "Framer Motion", "Tailwind"],
      status: "COMPLETED",
      difficulty: "★★★★★",
      liveUrl: "#",
      githubUrl: "https://github.com/visris-19/portfolio",
      color: "from-purple-500 to-pink-500"
    },
     {
      id: 5,
      title: "SANJIVANI",
      subtitle: "Mission: Provide medicinal cure with taste of Ayurveda",
      description: "An web application that provides users with personalized Ayurvedic remedies based on their symptoms and health conditions. Features include symptom analysis, remedy suggestions, and a user-friendly interface for tracking health progress, with having a blog section for Ayurvedic knowledge sharing and community engagement.",
      image: "/images/project5.jpg",
      tech: ["React Native", "Express", "Redis", "Weather API"],
      status: "PLANNED",
      difficulty: "★★★★★",
      liveUrl: null,
      githubUrl: null,
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 6,
      title: "Quantum Code Editor",
      subtitle: "Mission: Revolutionary Coding",
      description: "Next-generation code editor with AI assistance, collaborative features, and alien-tech inspired UI. Built for the developers of tomorrow.",
      image: "/images/project6.jpg",
      tech: ["Electron", "Monaco Editor", "WebSockets", "AI API"],
      status: "PLANNED",
      difficulty: "★★★★★",
      liveUrl: null,
      githubUrl: null,
      color: "from-indigo-500 to-purple-500"
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 border-green-400';
      case 'IN PROGRESS': return 'text-yellow-400 border-yellow-400';
      case 'PLANNED': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
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
            <span className="text-yellow-500 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Missions Completed
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every project is a mission to save the digital world. Here's my track record of successful operations, 
            each one making the web a better place for users everywhere.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div
                className="relative h-96 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%23fff'%3E${project.title}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='12' fill='%23999'%3EMission Screenshot%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}
                        animate={hoveredProject === project.id ? { scale: 1.1 } : { scale: 1 }}
                      >
                        {project.status}
                      </motion.div>
                      <div className="text-yellow-400 text-sm font-medium">
                        {project.difficulty}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm font-medium bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-3`}>
                      {project.subtitle}
                    </p>

                    <motion.p 
                      className="text-gray-300 text-sm leading-relaxed mb-4"
                      initial={{ opacity: 0.8 }}
                      animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0.8 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Footer */}
                  <div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 bg-black/40 text-gray-300 text-xs rounded-lg border border-gray-600/50"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 text-center py-2 px-3 bg-gradient-to-r ${project.color} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          🚀 Launch
                        </motion.a>
                      )}
                      
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 px-3 border border-gray-600 text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          📝 Code
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {[
            { label: "Missions Completed", value: "10+", icon: "✅", color: "text-green-400" },
            // { label: "Lives Saved", value: "∞", icon: "💚", color: "text-red-400" },
            { label: "Overthinking", value: "∞", icon: "🙂", color: "text-red-400" },
            { label: "Bugs Defeated", value: "1000+", icon: "🐛", color: "text-yellow-400" },
            { label: "Coffee Consumed", value: "☕++", icon: "☕", color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 bg-black/40 rounded-xl border border-gray-700/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {stat.icon}
              </motion.div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
