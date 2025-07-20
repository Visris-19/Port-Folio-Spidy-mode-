import { useEffect } from 'react';

const KeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl + Shift + S = Show Spider Commands
      if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        event.preventDefault();
        
        // Trigger the spider commands modal
        const spiderButton = document.querySelector('[title="Spider Commands"]');
        if (spiderButton) {
          spiderButton.click();
        }
        
        // Also log to console
        console.log('%c🕷️ SPIDER COMMANDS ACTIVATED! 🕷️', 
          'color: #dc2626; font-size: 18px; font-weight: bold;');
        console.log('%cKeyboard shortcut detected: Ctrl+Shift+S', 
          'color: #3b82f6; font-size: 14px;');
        console.log('%cTip: Type help() for all available commands!', 
          'color: #10b981; font-size: 14px;');
      }
      
      // Ctrl + Shift + H = Show Help
      if (event.ctrlKey && event.shiftKey && event.key === 'H') {
        event.preventDefault();
        
        if (window.help) {
          window.help();
        }
      }
      
      // Ctrl + Shift + W = Web Shoot
      if (event.ctrlKey && event.shiftKey && event.key === 'W') {
        event.preventDefault();
        
        if (window.webShoot) {
          window.webShoot();
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Show keyboard shortcuts in console
    console.log('%c⌨️ KEYBOARD SHORTCUTS ACTIVATED:', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    console.log('%c• Ctrl+Shift+S = Open Spider Commands Modal', 'color: #3b82f6;');
    console.log('%c• Ctrl+Shift+H = Show Help in Console', 'color: #3b82f6;');
    console.log('%c• Ctrl+Shift+W = Quick Web Shoot', 'color: #3b82f6;');

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;
