'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  // Subtle rotation animation
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Main Earth Sphere */}
      <Sphere ref={earthRef} args={[100, 64, 64]}>
        <meshPhongMaterial
          color="#1a472a"
          emissive="#0a1f14"
          specular="#333333"
          shininess={10}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[102, 64, 64]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Continents overlay (simplified) */}
      <Sphere args={[100.5, 64, 64]}>
        <meshBasicMaterial
          color="#2d5a3d"
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
}
