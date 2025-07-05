import React from 'react';

function SimpleApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          <span className="text-red-500">🕷️ Spider-Dev Portfolio</span>
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Your Friendly Neighborhood Web Developer
        </p>
        <div className="text-lg text-gray-400">
          <p>✅ React is working!</p>
          <p>✅ Tailwind CSS is working!</p>
          <p>🔧 Loading full portfolio...</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleApp;
