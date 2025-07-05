import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Floating Web Particles
const WebParticle = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#dc2626" 
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Web Grid Background
const WebGrid = () => {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      gridRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -10]}>
      <mesh>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// 3D Spider Web
const SpiderWeb = ({ position = [0, 0, 0], scale = 1 }) => {
  const webRef = useRef();
  
  useFrame((state) => {
    if (webRef.current) {
      webRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={webRef} position={position} scale={scale}>
      {/* Radial lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const y = Math.sin(angle) * 3;
        
        return (
          <mesh key={`radial-${i}`} position={[x/2, y/2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshStandardMaterial color="#dc2626" transparent opacity={0.6} />
          </mesh>
        );
      })}
      
      {/* Concentric circles */}
      {[1, 2, 3].map((radius, i) => (
        <mesh key={`circle-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 8, 32]} />
          <meshStandardMaterial color="#dc2626" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

// Floating 3D Text (simplified without drei)
const FloatingText = ({ text, position, size = 1, color = "#ffffff" }) => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={position}>
      {/* Simple 3D text replacement using geometry */}
      <mesh>
        <boxGeometry args={[text.length * size * 0.5, size * 0.8, 0.2]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Main 3D Scene (simplified without drei dependencies)
const Scene3D = ({ currentSection = 'hero' }) => {
  return (
    <>
      {/* Basic Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#dc2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      {/* Background Web Grid */}
      <WebGrid />
      
      {/* Spider Webs */}
      <SpiderWeb position={[-5, 3, -2]} scale={0.5} />
      <SpiderWeb position={[4, -2, -3]} scale={0.7} />
      <SpiderWeb position={[0, 0, -5]} scale={1} />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <WebParticle 
          key={i} 
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
          ]} 
        />
      ))}
      
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
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene3D currentSection={currentSection} />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
