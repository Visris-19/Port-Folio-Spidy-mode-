import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Floating Web Particles - Static version
const WebParticle = ({ position }) => {
  // Completely static particles - no animation
  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#dc2626" 
          emissiveIntensity={0.05}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

// Web Grid Background - Static version
const WebGrid = () => {
  // Completely static grid - no movement
  return (
    <group position={[0, 0, -10]}>
      <mesh>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

// 3D Spider Web - Static version
const SpiderWeb = ({ position = [0, 0, 0], scale = 1 }) => {
  // Removed all animations to make it completely static
  return (
    <group position={position} scale={scale}>
      {/* Radial lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const y = Math.sin(angle) * 3;
        
        return (
          <mesh key={`radial-${i}`} position={[x/2, y/2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshStandardMaterial color="#dc2626" transparent opacity={0.3} />
          </mesh>
        );
      })}
      
      {/* Concentric circles */}
      {[1, 2, 3].map((radius, i) => (
        <mesh key={`circle-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 8, 32]} />
          <meshStandardMaterial color="#dc2626" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// Floating 3D Text - Static version
const FloatingText = ({ text, position, size = 1, color = "#ffffff" }) => {
  // Completely static text - no animation
  return (
    <group position={position}>
      {/* Simple 3D text replacement using geometry */}
      <mesh>
        <boxGeometry args={[text.length * size * 0.5, size * 0.8, 0.2]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Main 3D Scene (simplified without drei dependencies)
const Scene3D = ({ currentSection = 'hero' }) => {
  return (
    <>
      {/* Basic Lighting - More subtle */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#dc2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#3b82f6" />
      
      {/* Background Web Grid */}
      <WebGrid />
      
      {/* Spider Webs */}
      <SpiderWeb position={[-5, 3, -2]} scale={0.5} />
      <SpiderWeb position={[4, -2, -3]} scale={0.7} />
      <SpiderWeb position={[0, 0, -5]} scale={1} />
      
      {/* Static Particles - Fixed positions */}
      <WebParticle position={[-8, 5, -2]} />
      <WebParticle position={[6, -3, -1]} />
      <WebParticle position={[-3, -6, -3]} />
      <WebParticle position={[8, 2, -4]} />
      <WebParticle position={[0, 8, -2]} />
      
      {/* Section-specific content */}
      {currentSection === 'hero' && (
        <FloatingText 
          text="Web Developer" 
          position={[0, 2, 0]} 
          size={2} 
          color="#dc2626" 
        />
      )}
      
      {currentSection === 'about' && (
        <FloatingText 
          text="Origin Story" 
          position={[0, 2, 0]} 
          size={1.5} 
          color="#10b981" 
        />
      )}
      
      {currentSection === 'skills' && (
        <FloatingText 
          text="Superpowers" 
          position={[0, 2, 0]} 
          size={1.5} 
          color="#3b82f6" 
        />
      )}
      
      {currentSection === 'projects' && (
        <FloatingText 
          text="Missions Completed" 
          position={[0, 2, 0]} 
          size={1.5} 
          color="#f59e0b" 
        />
      )}
      
      {currentSection === 'contact' && (
        <FloatingText 
          text="Call the Web" 
          position={[0, 2, 0]} 
          size={1.5} 
          color="#8b5cf6" 
        />
      )}
    </>
  );
};

// Main 3D Background Component
const ThreeDBackground = ({ currentSection, className = "" }) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Auto-adjust performance
      >
        <Scene3D currentSection={currentSection} />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
