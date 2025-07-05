# 🕷️ Spider-Dev Portfolio### 🤖 EDITH AI Assistant
- **Talk to EDITH**: Full-featured AI chatbot powered by OpenAI GPT-4
- **Personality**: "Even Dead, I'm The Hero" - Professional but friendly with superhero references
- **Knowledge Base**: Deep understanding of Vishal's projects, skills, and experience
- **Conversation Memory**: Saves last 10 messages for context
- **Floating Interface**: Always accessible via floating button in bottom-right
- **Real-time Chat**: Typing indicators and smooth animations
- **Error Handling**: Graceful fallbacks and user-friendly error messages
A stunning 3D animated portfolio website inspired by Spider-Man and Ben 10 Alien Force aesthetics, built with React, Three.js, Framer Motion, and Tailwind CSS.

## 🌟 Features

### ✨ Intro Sequence
- **Opening Screen**: Loading animation with "Wanna meet a Web Developer?" text
- **Web Animation**: Animated web shooting across the screen like The Amazing Spider-Man
- **Hero Entry**: Split-screen animation with profile photo and typewriter name effect
- **Web Wipe Transition**: Web mesh animation that reveals the main homepage
- **Skip Option**: Always accessible skip button for direct homepage access

### 🎮 3D Interactive Elements
- **Three.js 3D Background**: Floating web particles, spider webs, and animated grids
- **Dynamic Scenes**: Changes based on current section (Hero, About, Skills, etc.)
- **Parallax Effects**: Depth and movement that responds to user interaction
- **WebGL Shaders**: Advanced visual effects for modern browsers

### 🦸‍♂️ Main Sections
- **Origin Story (About)**: Character card with Ben 10 Alien Force inspired effects
- **Superpowers (Skills)**: Animated skill bars with power level indicators
- **Missions Completed (Projects)**: Interactive project cards with hover effects
- **Call the Web (Contact)**: Mission-style contact form with urgency levels
- **Web Links (Social)**: Animated social media connections

### � Interactive Mini-Game
### 🎮 Interactive Mini-Game
- **Spider-Web Shooter**: Fun clicking game where you shoot webs at moving targets
- **Score System**: Different points for villains (100) vs citizens (50)
- **Leaderboard**: Local high score tracking
- **Time Challenge**: 30-second rounds with moving targets
- **Responsive Controls**: Works on both desktop and mobile
- **Console Integration**: Can be triggered via `playWebGame()` command
### 🎨 Animations & Effects
- **Framer Motion**: Smooth scroll-based transitions and micro-interactions
- **Scroll Progress**: Visual progress bar as users navigate
- **Hover Effects**: 3D card rotations and scale transformations
- **Background Music**: Optional Spider-Man theme with mute controls
- **Console Easter Eggs**: Secret commands and hidden messages in DevTools

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **Three.js / React Three Fiber** - 3D graphics and interactive scenes
- **Framer Motion** - Advanced animations and page transitions
- **Tailwind CSS** - Utility-first styling with custom components
- **Vite** - Fast development and optimized builds
- **TypeScript Ready** - Fully typed for better development experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spider-dev-portfolio.git
   cd spider-dev-portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start the EDITH AI backend** (in a new terminal)
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```
   The backend will run on http://localhost:8000

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── IntroSequence.jsx      # Animated intro sequence
│   │   ├── ThreeDBackground.jsx   # Three.js 3D scenes
│   │   ├── Navigation.jsx         # Responsive navigation
│   │   ├── HeroSection.jsx        # Landing hero section
│   │   ├── AboutSection.jsx       # Origin story section
│   │   ├── SkillsSection.jsx      # Superpowers/skills
│   │   ├── ProjectsSection.jsx    # Projects showcase
│   │   ├── ContactSection.jsx     # Contact form
│   │   └── ConsoleEasterEgg.jsx   # DevTools easter eggs
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Custom styles
│   └── index.css                  # Tailwind & global styles
├── public/
│   ├── images/                    # Profile photos, project screenshots
│   ├── audio/                     # Background music files
│   └── fonts/                     # Custom fonts
└── package.json
```

## 🎯 Customization

### Personal Information
1. **Update contact details** in `ContactSection.jsx`
2. **Add your photo** to `public/images/profile-photo.jpg`
3. **Update social links** in `App.jsx` footer
4. **Modify project data** in `ProjectsSection.jsx`

### Styling & Branding
1. **Colors**: Modify Tailwind config or CSS custom properties
2. **Fonts**: Add custom fonts to `public/fonts/` and update CSS
3. **3D Elements**: Customize Three.js scenes in `ThreeDBackground.jsx`
4. **Animations**: Adjust Framer Motion settings in component files

### Content
1. **Skills & Technologies**: Update the skills array in `SkillsSection.jsx`
2. **Project Showcase**: Add your projects to `ProjectsSection.jsx`
3. **About Story**: Personalize the origin story in `AboutSection.jsx`
4. **Console Messages**: Customize easter eggs in `ConsoleEasterEgg.jsx`

## 🎵 Audio Setup (Optional)

1. Add `spiderman-theme.mp3` to `public/audio/`
2. Audio will auto-play with user interaction (browser restrictions)
3. Includes mute/unmute controls
4. Gracefully handles missing audio files

## 🕸️ Easter Eggs

Open the browser console (F12) to discover hidden features:
- `webShoot()` - Shoot a web animation
- `spiderSense()` - Activate spider-sense effect
- `alienTransform()` - Ben 10 transformation
- `playWebGame()` - Launch the Spider-Web Shooter game
- `talkToEdith()` - Launch the EDITH AI chat interface
- `showSecrets()` - Reveal all hidden features

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Mobile navigation and interactions
- **Performance**: Optimized animations for mobile devices
- **Accessibility**: WCAG compliant with proper focus states

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **WebGL Required**: For 3D effects (graceful fallbacks included)
- **ES6+ Features**: Modern JavaScript support needed

## 📈 Performance

- **Code Splitting**: Automatic component lazy loading
- **Asset Optimization**: Compressed images and minified code
- **3D Optimization**: Efficient Three.js rendering
- **Animation Performance**: Hardware-accelerated animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stan Lee & Steve Ditko** - For creating Spider-Man
- **Man of Action Studios** - For Ben 10 Alien Force inspiration
- **Three.js Community** - For amazing 3D web technologies
- **Framer Motion Team** - For powerful animation tools
- **React Team** - For the incredible framework

## 🚨 With Great Power...

*Comes great responsibility.* Use this portfolio template to showcase your skills and help make the web a more amazing place! 🕷️

---

**🕸️ Made with ❤️ by Spider-Dev**

*Your friendly neighborhood web developer*+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
