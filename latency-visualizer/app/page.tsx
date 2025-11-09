'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/lib/stores/appStore';
import ControlPanel from '@/components/ui/ControlPanel';
import StatsPanel from '@/components/ui/StatsPanel';
import LatencyChart from '@/components/charts/LatencyChart';

// Dynamically import Globe with no SSR to avoid Three.js hydration issues
const Globe = dynamic(() => import('@/components/globe/Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading 3D Globe...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const { isDarkMode, showHistorical } = useAppStore();

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latency Topology Visualizer
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Real-time visualization of cryptocurrency exchange server locations and network latency
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full h-full pt-20">
        <div className={`w-full h-full ${showHistorical ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 p-4' : ''}`}>
          {/* Globe Container */}
          <div className={`relative ${showHistorical ? 'h-full' : 'w-full h-full'}`}>
            <Globe />
            <StatsPanel />
            <ControlPanel />
          </div>

          {/* Chart Container */}
          {showHistorical && (
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <LatencyChart />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-2 px-6">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Built with Next.js, React Three Fiber, and Recharts | Data updates every 5 seconds
        </p>
      </footer>
    </div>
  );
}
