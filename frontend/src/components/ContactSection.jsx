import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    urgency: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        urgency: 'medium'
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const urgencyLevels = [
    { value: 'low', label: 'Friendly Chat', color: 'from-green-500 to-green-600', icon: '😊' },
    { value: 'medium', label: 'Business Inquiry', color: 'from-blue-500 to-blue-600', icon: '💼' },
    { value: 'high', label: 'Project Emergency', color: 'from-orange-500 to-orange-600', icon: '🚨' },
    { value: 'critical', label: 'HERO NEEDED!', color: 'from-red-500 to-red-600', icon: '🦸‍♂️' }
  ];

  const contactMethods = [
    {
      method: 'Email',
      value: 'smartyvis258@gmail.com',
      icon: '📧',
      color: 'from-blue-500 to-blue-600',
      href: 'smartyvis258@gmail.com'
    },
    {
      method: 'LinkedIn',
      value: 'Vishal Pandey',
      icon: '💼',
      color: 'from-blue-600 to-blue-700',
      href: 'https://www.linkedin.com/in/vishal-pandey-aab2692b4/'
    },
    {
      method: 'GitHub',
      value: 'Visris-19',
      icon: '🐙',
      color: 'from-gray-600 to-gray-700',
      href: 'https://github.com/Visris-19'
    },
    // {
    //   method: 'Twitter',
    //   value: '@yourusername',
    //   icon: '🐦',
    //   color: 'from-cyan-500 to-cyan-600',
    //   href: 'https://twitter.com/yourusername'
    // }
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
            <span className="text-purple-500 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Call the Web
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need a hero for your next digital mission? Whether it's a simple website rescue or a complex web application, 
            I'm here to swing into action. Let's save the digital world together!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="relative p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="text-4xl mr-3">🕷️</span>
                  Send Signal
                </h3>

                {submitStatus === 'success' && (
                  <motion.div
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    🦸‍♂️ Message received! I'll swing by your inbox soon!
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Hero Name *
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Your secret identity..."
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Communication Channel *
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="hero@example.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-3">
                      Mission Urgency Level
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {urgencyLevels.map((level) => (
                        <motion.label
                          key={level.value}
                          className={`relative cursor-pointer p-3 rounded-lg border-2 transition-all ${
                            formData.urgency === level.value
                              ? `border-purple-500 bg-gradient-to-r ${level.color} bg-opacity-20`
                              : 'border-gray-600 bg-black/20 hover:border-gray-500'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level.value}
                            checked={formData.urgency === level.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{level.icon}</span>
                            <span className="text-white text-sm font-medium">{level.label}</span>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Mission Briefing *
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="What kind of web heroics do you need?"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Detailed Mission Report *
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project, timeline, and how I can help save the day..."
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending Web Signal...
                      </div>
                    ) : (
                      <span>🚀 Launch Mission Request</span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Info & Links */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Direct Contact Methods */}
            <motion.div
              className="relative p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-blue-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">📡</span>
                  Direct Channels
                </h3>

                <div className="space-y-4">
                  {contactMethods.map((contact, index) => (
                    <motion.a
                      key={contact.method}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-black/30 rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{contact.icon}</span>
                        <div>
                          <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                            {contact.method}
                          </div>
                          <div className="text-gray-400 text-sm">{contact.value}</div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              className="relative p-6 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl border border-green-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              <div className="relative z-10 text-center">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center justify-center">
                  <span className="text-2xl mr-2">⚡</span>
                  Spider-Speed Response
                </h4>
                <p className="text-gray-300">
                  I typically respond within <span className="text-green-400 font-bold">24 hours</span>.
                  For urgent missions, expect contact within <span className="text-red-400 font-bold">2-4 hours</span>!
                </p>
              </div>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              className="relative p-6 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 text-center">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center justify-center">
                  <span className="text-2xl mr-2">🕷️</span>
                  Web Fact
                </h4>
                <p className="text-gray-300">
                  Did you know? Spider-webs are proportionally stronger than steel! 
                  That's exactly how I build my code - <span className="text-red-400 font-bold">strong, resilient, and scalable</span>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
