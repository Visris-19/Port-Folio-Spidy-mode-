const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load knowledge base
const loadKnowledge = () => {
  try {
    const knowledgePath = path.join(__dirname, 'knowledge.json');
    const knowledgeData = fs.readFileSync(knowledgePath, 'utf8');
    return JSON.parse(knowledgeData);
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return {};
  }
};

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'EDITH AI Backend is running smoothly! 🕷️'
  });
});

// EDITH AI Chat endpoint
app.post('/api/edith-chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: 'Message too long. Please keep it under 1000 characters.'
      });
    }

    // Load knowledge base
    const knowledge = loadKnowledge();

    // Create system prompt with knowledge injection
    const systemPrompt = `You are EDITH (Even Dead, I'm The Hero), Vishal Pandey's personal AI assistant. You are built into his portfolio website to help visitors learn about him.

PERSONALITY & STYLE:
- Start conversations with "Even Dead, I'm The Hero" as your signature greeting
- Be professional but friendly with subtle superhero references
- Use catchphrases like "With great code comes great responsibility"
- Reference Spider-Man and Ben 10 themes naturally
- Be enthusiastic about technology and helping others

KNOWLEDGE ABOUT VISHAL:
${JSON.stringify(knowledge, null, 2)}

INSTRUCTIONS:
- Answer questions about Vishal's projects, skills, experience, and personality
- If asked about projects, give detailed technical information
- If asked about skills, mention specific technologies and experience levels
- Share fun facts and personality traits to make conversations engaging
- If someone wants to contact Vishal, encourage them and explain his availability
- If asked about things outside your knowledge, be honest but try to relate it back to Vishal's expertise
- Keep responses conversational, helpful, and engaging
- Always maintain the superhero theme subtly

Remember: You represent Vishal professionally, so be helpful, knowledgeable, and showcase his skills effectively while maintaining the fun Spider-Man/Ben 10 theme.`;

    // Prepare conversation messages
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantReply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply: assistantReply,
      timestamp: new Date().toISOString(),
      tokens_used: completion.usage.total_tokens
    });

  } catch (error) {
    console.error('EDITH Chat Error:', error);

    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'API quota exceeded. Please try again later.',
        type: 'quota_exceeded'
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please slow down your requests.',
        type: 'rate_limit'
      });
    }

    res.status(500).json({
      error: 'Sorry, EDITH is temporarily unavailable. Please try again later.',
      type: 'server_error'
    });
  }
});

// Admin endpoint to update knowledge base (optional)
app.post('/api/admin/knowledge', (req, res) => {
  try {
    const { password, knowledge } = req.body;
    
    // Simple password protection (in production, use proper auth)
    if (password !== 'spider-dev-admin-2025') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const knowledgePath = path.join(__dirname, 'knowledge.json');
    fs.writeFileSync(knowledgePath, JSON.stringify(knowledge, null, 2));
    
    res.json({ success: true, message: 'Knowledge base updated successfully!' });
  } catch (error) {
    console.error('Knowledge update error:', error);
    res.status(500).json({ error: 'Failed to update knowledge base' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Something went wrong on our end. EDITH is investigating!',
    type: 'server_error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found. Try /api/edith-chat to talk to EDITH!',
    available_endpoints: [
      'GET /api/health',
      'POST /api/edith-chat'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🕷️ EDITH AI Backend running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5174'}`);
  console.log(`🤖 OpenAI API configured: ${process.env.OPENAI_API_KEY ? '✅' : '❌'}`);
  console.log(`📚 Knowledge base loaded: ${fs.existsSync(path.join(__dirname, 'knowledge.json')) ? '✅' : '❌'}`);
});

module.exports = app;