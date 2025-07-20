import { useEffect } from 'react';

const ConsoleEasterEgg = () => {
  useEffect(() => {
    // Console styling
    const styles = {
      title: 'color: #dc2626; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(220, 38, 38, 0.5);',
      subtitle: 'color: #3b82f6; font-size: 16px; font-weight: bold;',
      normal: 'color: #10b981; font-size: 14px;',
      warning: 'color: #f59e0b; font-size: 14px; font-weight: bold;',
      error: 'color: #ef4444; font-size: 14px; font-weight: bold;',
      success: 'color: #22c55e; font-size: 14px; font-weight: bold;'
    };

    // Clear console and add spider web art
    console.clear();
    
    // ASCII Spider Web
    console.log(`%c
    ╭─────────╮     ╭─────────╮
    │  ╭───╮  │     │  ╭───╮  │
    │  │🕷️ │  │     │  │ 💻 │  │
    │  ╰───╯  │     │  ╰───╯  │
    ╰─────────╯     ╰─────────╯
         ╲               ╱
          ╲             ╱
           ╲___________╱
           ╱           ╲
          ╱             ╲
         ╱               ╲
    ╭─────────╮     ╭─────────╮
    │  ╭───╮  │     │  ╭───╮  │
    │  │ ⚡ │  │     │  │ 🚀 │  │
    │  ╰───╯  │     │  ╰───╯  │
    ╰─────────╯     ╰─────────╯
    `, styles.title);

    console.log('%c🕸️ SPIDER-DEV PORTFOLIO ACTIVATED 🕸️', styles.title);
    console.log('%c======================================', styles.subtitle);
    
    console.log('%c🦸‍♂️ Hey there, fellow web crawler!', styles.normal);
    console.log('%cI see you\'ve found your way into the developer console...', styles.normal);
    console.log('%cWith great power comes great responsibility! 🕷️', styles.warning);
    
    console.log('\n%c🔧 TECH STACK DETECTED:', styles.subtitle);
    console.log('%c• React ⚛️', styles.normal);
    console.log('%c• Three.js 🎮', styles.normal);
    console.log('%c• Framer Motion ✨', styles.normal);
    console.log('%c• Tailwind CSS 🎨', styles.normal);      console.log('\n%c🕸️ SECRET COMMANDS:', styles.subtitle);
    console.log('%cType "help()" to see all available commands!', styles.warning);
    console.log('%cType "webShoot()" to shoot web!', styles.normal);
    console.log('%cType "spiderSense()" to activate spider-sense!', styles.normal);
    console.log('%cType "spideySwing()" to trigger Spider-Man swing!', styles.normal);
    console.log('%cType "alienTransform()" for Ben 10 transformation!', styles.normal);
    console.log('%cType "showSecrets()" to reveal all secrets!', styles.normal);
    console.log('%cType "playWebGame()" to play the Spider-Web Shooter game!', styles.normal);
    console.log('%cType "talkToEdith()" to chat with EDITH AI!', styles.normal);

    console.log('\n%c⚠️ RESPONSIBILITY NOTICE:', styles.warning);
    console.log('%cRemember: With great power comes great responsibility.', styles.normal);
    console.log('%cUse your web development powers for good! 🌟', styles.normal);

    console.log('\n%c📧 CONTACT THE SPIDER-DEV:', styles.subtitle);
    console.log('%cEmail: your.email@example.com', styles.normal);
    console.log('%cLinkedIn: /in/yourprofile', styles.normal);
    console.log('%cGitHub: /yourusername', styles.normal);

    // Add secret functions to window object
    window.webShoot = () => {
      console.log('%c🕸️ THWIP! 🕸️', 'color: #dc2626; font-size: 20px; font-weight: bold;');
      console.log('%cWeb shot! You hit the target! 🎯', styles.success);
      
      // Create a visual web effect on the page
      const web = document.createElement('div');
      web.innerHTML = '🕸️';
      web.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 100px;
        z-index: 9999;
        pointer-events: none;
        animation: webShoot 2s ease-out forwards;
      `;
      
      // Add animation keyframes
      if (!document.getElementById('web-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'web-animation-styles';
        style.textContent = `
          @keyframes webShoot {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(0) rotate(360deg); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(web);
      setTimeout(() => web.remove(), 2000);
    };

    window.spiderSense = () => {
      console.log('%c🚨 SPIDER-SENSE ACTIVATED! 🚨', 'color: #ef4444; font-size: 18px; font-weight: bold; animation: blink 1s infinite;');
      console.log('%cI sense... incredible coding skills nearby! 💫', styles.warning);
      console.log('%cDanger Level: ZERO ✅', styles.success);
      console.log('%cAwesome Level: MAXIMUM 📈', styles.success);
      
      // Create visual spider-sense effect
      document.body.style.animation = 'spider-sense 0.5s ease-in-out 3';
      
      if (!document.getElementById('spider-sense-styles')) {
        const style = document.createElement('style');
        style.id = 'spider-sense-styles';
        style.textContent = `
          @keyframes spider-sense {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.5) hue-rotate(10deg); }
          }
        `;
        document.head.appendChild(style);
      }
        setTimeout(() => {
        document.body.style.animation = '';
      }, 1500);
    };

    window.spideySwing = () => {
      console.log('%c🕷️ SWINGING INTO ACTION! 🕸️', 'color: #dc2626; font-size: 18px; font-weight: bold;');
      console.log('%cTHWIP! Web-slinging across the viewport! 🌆', styles.success);
      
      // Trigger a temporary Spider-Man swing across screen
      const spidey = document.createElement('div');
      spidey.innerHTML = '🕷️';
      spidey.style.cssText = `
        position: fixed;
        top: 20%;
        left: -50px;
        font-size: 40px;
        z-index: 9999;
        pointer-events: none;
        animation: swingAcross 3s ease-in-out forwards;
      `;
      
      // Add swing animation
      if (!document.getElementById('swing-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'swing-animation-styles';
        style.textContent = `
          @keyframes swingAcross {
            0% { 
              left: -50px; 
              top: 20%; 
              transform: rotate(0deg) scale(1); 
            }
            25% { 
              left: 25vw; 
              top: 10%; 
              transform: rotate(-15deg) scale(1.2); 
            }
            50% { 
              left: 50vw; 
              top: 30%; 
              transform: rotate(0deg) scale(1); 
            }
            75% { 
              left: 75vw; 
              top: 15%; 
              transform: rotate(15deg) scale(1.1); 
            }
            100% { 
              left: calc(100vw + 50px); 
              top: 25%; 
              transform: rotate(0deg) scale(1); 
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(spidey);
      setTimeout(() => spidey.remove(), 3000);
      
      console.log('%cSPIDER-MAN SWING COMPLETE! 🎯', styles.success);
    };

    window.alienTransform = () => {
      console.log('%c🛸 BEN 10 TRANSFORMATION INITIATED! 🛸', 'color: #10b981; font-size: 18px; font-weight: bold;');
      console.log('%c⚡ IT\'S HERO TIME! ⚡', 'color: #22c55e; font-size: 16px; font-weight: bold;');
      
      const aliens = [
        '👽 Heatblast - Fire powers activated!',
        '💎 Diamondhead - Crystal form engaged!',
        '⚡ XLR8 - Super speed enabled!',
        '👻 Ghostfreak - Phasing through code!',
        '🦾 Four Arms - Quadruple coding power!',
        '🧠 Grey Matter - Enhanced intelligence!',
        '🔋 Upgrade - Tech integration complete!',
        '🌊 Ripjaws - Deep web diving mode!',
        '🕷️ Stinkfly - Web development flight!',
        '💪 Wildmutt - Debugging instincts!'
      ];
      
      const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
      console.log(`%c${randomAlien}`, styles.success);
      console.log('%cTransformation complete! Ready to code! 🚀', styles.normal);
      
      // Visual transformation effect
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(45deg, #10b981, #22c55e, #34d399);
        z-index: 9999;
        pointer-events: none;
        animation: alienFlash 1s ease-out forwards;
      `;
      
      if (!document.getElementById('alien-flash-styles')) {
        const style = document.createElement('style');
        style.id = 'alien-flash-styles';
        style.textContent = `
          @keyframes alienFlash {
            0% { opacity: 0; }
            10% { opacity: 0.8; }
            100% { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 1000);
    };

    window.showSecrets = () => {
      console.log('%c🔐 ALL SECRETS REVEALED! 🔐', 'color: #8b5cf6; font-size: 18px; font-weight: bold;');
      console.log('%c🌟 Portfolio Secrets:', styles.subtitle);
      console.log('%c• Built with love and lots of coffee ☕', styles.normal);
      console.log('%c• Contains 42 hidden Spider-Man references 🕷️', styles.normal);
      console.log('%c• Uses real alien technology from Ben 10 universe 👽', styles.normal);
      console.log('%c• Powered by the Web of Life and Destiny 🕸️', styles.normal);
      console.log('%c• Tested by J. Jonah Jameson (not approved) 📰', styles.normal);
      console.log('%c• Includes quantum entanglement with GitHub repos 🔬', styles.normal);
      
      console.log('\n%c🎯 Developer Stats:', styles.subtitle);
      console.log('%c• Bugs defeated: 9,000+ 🐛', styles.normal);
      console.log('%c• Coffee consumed: ∞ ☕', styles.normal);
      console.log('%c• Lines of code: Over 100,000! 📝', styles.normal);
      console.log('%c• Projects saved: Countless 🦸‍♂️', styles.normal);
      
      console.log('\n%c💝 Thank you for exploring!', styles.success);
      console.log('%cYou are now part of the Spider-Dev universe! 🕷️', styles.success);
    };

    window.playWebGame = () => {
      console.log('%c🎮 SPIDER-WEB SHOOTER GAME! 🎮', 'color: #8b5cf6; font-size: 18px; font-weight: bold;');
      console.log('%cTime to test your web-shooting skills!', styles.normal);
      console.log('%c🎯 Instructions:', styles.subtitle);
      console.log('%c• Click targets to shoot webs', styles.normal);
      console.log('%c• Red villains = 100 points', styles.normal);
      console.log('%c• Blue citizens = 50 points', styles.normal);
      console.log('%c• You have 30 seconds!', styles.normal);
      console.log('%c📍 Look for the "Play Web Shooter" button in the hero section!', styles.warning);
      
      // Trigger game button glow effect
      const gameButton = document.querySelector('button:has-text("Play Web Shooter")');
      if (gameButton) {
        gameButton.style.animation = 'pulse 2s ease-in-out 3';
        gameButton.style.boxShadow = '0 0 20px #8b5cf6';
      }
    };

    window.talkToEdith = () => {
      console.log('%c🤖 EDITH AI ASSISTANT ACTIVATED! 🤖', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
      console.log('%c"Even Dead, I\'m The Hero"', 'color: #8b5cf6; font-style: italic; font-size: 16px;');
      console.log('%cEDITH is ready to help you learn about Vishal!', styles.normal);
      console.log('%c🔍 Ask EDITH about:', styles.subtitle);
      console.log('%c• Projects and technical details', styles.normal);
      console.log('%c• Skills and experience', styles.normal);
      console.log('%c• Background and personality', styles.normal);
      console.log('%c• Contact information', styles.normal);
      console.log('%c💬 Look for the floating AI button in the bottom-right corner!', styles.warning);
      
      // Trigger EDITH button glow effect
      setTimeout(() => {
        const edithButton = document.querySelector('button:has([data-edith-button])');
        if (edithButton) {
          edithButton.style.animation = 'pulse 2s ease-in-out 3';
          edithButton.style.boxShadow = '0 0 30px #3b82f6';
        }
      }, 1000);
    };

    // Add help function as the first command
    window.help = () => {
      console.clear();
      console.log('%c🕷️ SPIDER-DEV PORTFOLIO - COMMAND CENTER 🕷️', 'color: #dc2626; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(220, 38, 38, 0.5);');
      console.log('%c================================================', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
      
      console.log('\n%c🎯 AVAILABLE COMMANDS:', 'color: #f59e0b; font-size: 18px; font-weight: bold;');
      console.log('%c┌────────────────────────────────────────────────────────┐', 'color: #6b7280;');
      console.log('%c│  🕸️  webShoot()       - Shoot a web effect            │', 'color: #10b981;');
      console.log('%c│  🚨  spiderSense()    - Activate spider-sense effect  │', 'color: #10b981;');
      console.log('%c│  🔴  spideySwing()    - Manual Spider-Man swing       │', 'color: #10b981;');
      console.log('%c│  👽  alienTransform() - Ben 10 transformation         │', 'color: #10b981;');
      console.log('%c│  🎮  playWebGame()    - Launch web shooter game       │', 'color: #10b981;');
      console.log('%c│  🤖  talkToEdith()    - Open EDITH AI chat            │', 'color: #10b981;');
      console.log('%c│  🔍  showSecrets()    - Reveal all hidden features    │', 'color: #10b981;');
      console.log('%c└────────────────────────────────────────────────────────┘', 'color: #6b7280;');
      
      console.log('\n%c💡 PRO TIPS:', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
      console.log('%c• Click the floating spider icon (🕷️) for a visual command list', 'color: #3b82f6;');
      console.log('%c• Try scrolling to see Spider-Man swing automatically!', 'color: #3b82f6;');
      console.log('%c• Open EDITH AI for interactive portfolio exploration', 'color: #3b82f6;');
      
      console.log('\n%c🎨 EASTER EGGS:', 'color: #ec4899; font-size: 16px; font-weight: bold;');
      console.log('%c• Check out the 3D Spider-Web background', 'color: #10b981;');
      console.log('%c• Watch the Spider-Man progress indicator at the top', 'color: #10b981;');
      console.log('%c• Look for hidden animations throughout the site', 'color: #10b981;');
      
      console.log('\n%c⚡ QUICK START:', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
      console.log('%cTry: webShoot() ← Start with this one!', 'color: #ef4444; font-size: 16px; font-weight: bold;');
      
      console.log('\n%c🕸️ Remember: With great power comes great responsibility! 🕸️', 'color: #dc2626; font-size: 14px; font-style: italic;');
    };

    // Welcome message with delayed reveals
    setTimeout(() => {
      console.log('\n%c🎉 BONUS TIP:', styles.warning);
      console.log('%cTry typing one of the secret commands above! 👆', styles.normal);
    }, 2000);

    setTimeout(() => {
      console.log('\n%c💡 DID YOU KNOW?', styles.subtitle);
      console.log('%cThis portfolio updates in real-time using React! ⚛️', styles.normal);
      console.log('%cEvery animation is crafted with Framer Motion! ✨', styles.normal);
    }, 4000);

    setTimeout(() => {
      console.log('\n%c🚀 Ready to build something amazing together?', styles.success);
      console.log('%cLet\'s connect and create the next web sensation! 🌟', styles.success);
    }, 6000);

  }, []);

  return null; // This component doesn't render anything
};

export default ConsoleEasterEgg;
