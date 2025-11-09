'use client';

import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Earth from './Earth';
import ExchangeMarkers from './ExchangeMarkers';
import LatencyConnections from './LatencyConnections';
import RegionMarkers from './RegionMarkers';
import { useAppStore } from '@/lib/stores/appStore';
import * as THREE from 'three';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showRealtime, showRegions, isDarkMode } = useAppStore();

  return (
    <div className="w-full h-full relative">
      <Canvas
        ref={canvasRef}
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 300]} fov={45} />

        {/* Lights */}
        <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
        <pointLight position={[100, 100, 100]} intensity={1} />
        <pointLight position={[-100, -100, -100]} intensity={0.3} />

        {/* Earth */}
        <Earth />

        {/* Exchange Markers */}
        <ExchangeMarkers />

        {/* Latency Connections */}
        {showRealtime && <LatencyConnections />}

        {/* Cloud Region Markers */}
        {showRegions && <RegionMarkers />}

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={150}
          maxDistance={500}
          autoRotate={true}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
        <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
          Cloud Providers
        </h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF9900]" />
            <span className="text-gray-700 dark:text-gray-300">AWS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4285F4]" />
            <span className="text-gray-700 dark:text-gray-300">GCP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0089D6]" />
            <span className="text-gray-700 dark:text-gray-300">Azure</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
          Latency
        </h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-500" />
            <span className="text-gray-700 dark:text-gray-300">&lt; 50ms (Low)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-yellow-500" />
            <span className="text-gray-700 dark:text-gray-300">50-150ms (Medium)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-red-500" />
            <span className="text-gray-700 dark:text-gray-300">&gt; 150ms (High)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
