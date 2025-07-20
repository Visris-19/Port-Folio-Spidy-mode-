import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EdithAI = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Load conversation history from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedMessages = localStorage.getItem('edith-conversation');
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates.slice(-10)); // Keep last 10 messages
          setConversationHistory(messagesWithDates.slice(-10));
          setShowIntro(false);
        } catch (error) {
          console.error('Error loading conversation history:', error);
          // Clear corrupted data
          localStorage.removeItem('edith-conversation');
        }
      }
      
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('edith-conversation', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  // Show intro message
  useEffect(() => {
    if (isOpen && showIntro && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const introMessage = {
            id: Date.now(),
            type: 'edith',
            content: "Even Dead, I'm The Hero.\n\nHello! I'm EDITH, Vishal's personal AI assistant. I'm here to help you learn about his projects, skills, and experience. What would you like to know?",
            timestamp: new Date()
          };
          setMessages([introMessage]);
          setIsTyping(false);
          setShowIntro(false);
          
          // Speak the intro message
          if (isVoiceEnabled) {
            setTimeout(() => {
              speakText("Even Dead, I'm The Hero. Hello! I'm EDITH, Vishal's personal AI assistant. I'm here to help you learn about his projects, skills, and experience. What would you like to know?");
            }, 500);
          }
        }, 2000);
      }, 1000);
    }
  }, [isOpen, showIntro, messages.length, isVoiceEnabled]);

  // Text-to-Speech function
  const speakText = (text) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice to sound more AI-like
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to find a female voice for EDITH
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('hazel')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking function
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/edith-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const edithReply = {
          id: Date.now() + 1,
          type: 'edith',
          content: data.reply,
          timestamp: new Date()
        };

        setTimeout(() => {
          setMessages(prev => [...prev, edithReply]);
          setConversationHistory(prev => [
            ...prev,
            { type: 'user', content: userMessage.content },
            { type: 'edith', content: data.reply }
          ]);
          setIsTyping(false);
          speakText(data.reply); // Speak EDITH's reply
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to get response from EDITH');
      }
    } catch (error) {
      console.error('EDITH Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'edith',
        content: "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to contact Vishal directly!",
        timestamp: new Date(),
        isError: true
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setConversationHistory([]);
    setShowIntro(true);
    localStorage.removeItem('edith-conversation');
  };

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-black border-2 border-cyan-400 rounded-xl sm:rounded-2xl max-w-5xl w-full h-[98vh] sm:max-h-[95vh] flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/25"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 25%, rgba(15,15,35,0.95) 50%, rgba(20,20,40,0.9) 75%, rgba(0,0,0,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 50px rgba(34, 211, 238, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.1)'
          }}
        >
          {/* Animated Circuit Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="cyan" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="3" fill="cyan"/>
                  <path d="M50,10 L50,50 L90,50" fill="none" stroke="cyan" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          </div>

          {/* Header with Futuristic Design */}
          <div className="relative flex justify-between items-center p-3 sm:p-6 border-b border-cyan-400/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Animated EDITH Avatar */}
              <motion.div 
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden"
                animate={{ 
                  boxShadow: isSpeaking 
                    ? ['0 0 20px rgba(34, 211, 238, 0.8)', '0 0 40px rgba(34, 211, 238, 0.4)', '0 0 20px rgba(34, 211, 238, 0.8)']
                    : '0 0 20px rgba(34, 211, 238, 0.3)'
                }}
                transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
                style={{
                  background: 'linear-gradient(45deg, #00D2FF 0%, #3A7BD5 50%, #FF6B6B 100%)',
                  border: '2px solid #22D3EE'
                }}
              >
                <motion.div
                  animate={{ rotate: isSpeaking ? [0, 360] : 0 }}
                  transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "linear" }}
                  className="text-xl sm:text-2xl"
                >
                  🤖
                </motion.div>
                
                {/* Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400"
                  animate={{ 
                    scale: isSpeaking ? [1, 1.3, 1] : 1,
                    opacity: isSpeaking ? [0.8, 0.2, 0.8] : 0.8
                  }}
                  transition={{ duration: 1, repeat: isSpeaking ? Infinity : 0 }}
                />
              </motion.div>
              
              <div>
                <motion.h2 
                  className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  E.D.I.T.H.
                </motion.h2>
                <motion.p 
                  className="text-cyan-300 text-xs sm:text-sm font-mono hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Even Dead, I'm The Hero
                </motion.p>
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-cyan-300 font-mono">
                    {isSpeaking ? 'Speaking...' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Voice Toggle */}
              <motion.button
                onClick={() => {
                  setIsVoiceEnabled(!isVoiceEnabled);
                  if (!isVoiceEnabled) stopSpeaking();
                }}
                className={`p-2 sm:p-3 rounded-full border-2 transition-all duration-300 text-sm sm:text-base ${
                  isVoiceEnabled 
                    ? 'border-green-400 bg-green-400/20 text-green-400' 
                    : 'border-red-400 bg-red-400/20 text-red-400'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title={isVoiceEnabled ? 'Voice On' : 'Voice Off'}
              >
                {isVoiceEnabled ? '🔊' : '🔇'}
              </motion.button>
              
              {/* Clear Chat */}
              <motion.button
                onClick={clearConversation}
                className="p-2 sm:p-3 rounded-full border-2 border-yellow-400 bg-yellow-400/20 text-yellow-400 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                title="Clear conversation"
              >
                🗑️
              </motion.button>
              
              {/* Close Button */}
              <motion.button
                onClick={() => {
                  stopSpeaking();
                  onClose();
                }}
                className="p-2 sm:p-3 rounded-full border-2 border-red-400 bg-red-400/20 text-red-400 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </div>          {/* Chat Messages with Futuristic Design */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-6 min-h-0 relative">
            {/* Scan Line Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
              animate={{ y: [0, 400, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm relative ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-red-600/80 to-red-700/60 text-white ml-2 sm:ml-4 border border-red-400/50'
                      : message.isError
                      ? 'bg-gradient-to-br from-red-900/80 to-red-800/60 border border-red-500/50 text-red-200'
                      : 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-400/30 text-cyan-100 mr-2 sm:mr-4'
                  }`}
                  style={{
                    boxShadow: message.type === 'user' 
                      ? '0 8px 32px rgba(239, 68, 68, 0.2)' 
                      : '0 8px 32px rgba(34, 211, 238, 0.2)'
                  }}
                >
                  {/* Message Header for EDITH */}
                  {message.type === 'edith' && (
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-xs">
                        E
                      </div>
                      <span className="text-cyan-400 font-bold font-mono text-xs sm:text-sm">EDITH</span>
                      <motion.div 
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      {isSpeaking && message === messages[messages.length - 1] && (
                        <div className="flex items-center gap-1">
                          <motion.div className="w-1 h-2 sm:h-3 bg-cyan-400 rounded" animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                          <motion.div className="w-1 h-2 sm:h-3 bg-cyan-400 rounded" animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
                          <motion.div className="w-1 h-2 sm:h-3 bg-cyan-400 rounded" animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Message Content */}
                  <motion.p 
                    className="whitespace-pre-line leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {message.content}
                  </motion.p>
                  
                  {/* Timestamp */}
                  <div className="text-xs opacity-60 mt-2 sm:mt-3 font-mono">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  
                  {/* Holographic Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      background: message.type === 'user'
                        ? ['linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                           'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                           'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)']
                        : ['linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                           'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                           'linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.1), transparent)']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-400/30 text-cyan-100 max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-xl sm:rounded-2xl mr-2 sm:mr-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-xs">
                      E
                    </div>
                    <span className="text-cyan-400 font-bold font-mono text-xs sm:text-sm">EDITH</span>
                    <motion.div 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-300 text-xs sm:text-sm">Processing</span>
                    <div className="flex space-x-1">
                      <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} />
                      <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>          {/* Futuristic Input Area */}
          <div className="p-3 sm:p-6 border-t border-cyan-400/30 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 backdrop-blur-sm">
            <div className="flex gap-2 sm:gap-4 relative">
              {/* Input Field with Holographic Effect */}
              <div className="flex-1 relative">
                <motion.input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask EDITH about Vishal..."
                  className="w-full bg-gray-900/80 border-2 border-cyan-400/50 rounded-lg sm:rounded-xl px-3 sm:px-6 py-3 sm:py-4 text-white placeholder-cyan-300/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 backdrop-blur-sm font-mono text-sm sm:text-base"
                  disabled={isLoading}
                  maxLength={1000}
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.6) 100%)',
                    boxShadow: '0 8px 32px rgba(34, 211, 238, 0.1), inset 0 0 20px rgba(34, 211, 238, 0.05)'
                  }}
                  animate={{
                    boxShadow: inputMessage.length > 0 
                      ? '0 8px 32px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)'
                      : '0 8px 32px rgba(34, 211, 238, 0.1), inset 0 0 20px rgba(34, 211, 238, 0.05)'
                  }}
                />
                
                {/* Typing Animation Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    background: inputMessage.length > 0
                      ? 'linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.2), transparent)'
                      : 'transparent'
                  }}
                  transition={{ duration: 2, repeat: inputMessage.length > 0 ? Infinity : 0 }}
                />
              </div>
              
              {/* Futuristic Send Button */}
              <motion.button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${
                  !inputMessage.trim() || isLoading
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-2 border-gray-600/50'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/25'
                }`}
                whileHover={!inputMessage.trim() || isLoading ? {} : { 
                  scale: 1.05,
                  boxShadow: '0 12px 40px rgba(34, 211, 238, 0.4)'
                }}
                whileTap={!inputMessage.trim() || isLoading ? {} : { scale: 0.95 }}
                style={{
                  background: !inputMessage.trim() || isLoading
                    ? 'rgba(55, 65, 81, 0.5)'
                    : 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)'
                }}
              >
                {/* Button Content */}
                <div className="flex items-center gap-1 sm:gap-2 relative z-10">
                  {isLoading ? (
                    <>
                      <motion.div 
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-300 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="hidden sm:inline">SENDING</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">SEND</span>
                      <span className="sm:hidden">📨</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="hidden sm:block"
                      >
                        🚀
                      </motion.div>
                    </>
                  )}
                </div>
                
                {/* Button Glow Effect */}
                {!isLoading && inputMessage.trim() && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </div>
            
            {/* Enhanced Footer with Tech Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 text-xs font-mono gap-2 sm:gap-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-cyan-400/80">
                <span className="flex items-center gap-1">⚡ <span className="hidden sm:inline">Powered by </span>GPT-4</span>
                <span className="hidden sm:flex items-center gap-1">🔮 Neural Network Active</span>
                <span className="flex items-center gap-1">🛡️ <span className="hidden sm:inline">Spider-Protocol </span>Enabled</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <motion.span 
                  className={`${inputMessage.length > 800 ? 'text-red-400' : 'text-cyan-400/60'}`}
                  animate={{ 
                    color: inputMessage.length > 800 ? '#F87171' : '#67E8F9'
                  }}
                >
                  {inputMessage.length}/1000
                </motion.span>
                
                {/* Connection Status */}
                <div className="flex items-center gap-1">
                  <motion.div 
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-400/80">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EdithAI;
