'use client';

import { useEffect, useState } from 'react';
import { Activity, Server, Wifi } from 'lucide-react';
import { useAppStore } from '@/lib/stores/appStore';

export default function StatsPanel() {
  const { exchanges, latencyData, selectedProviders } = useAppStore();
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFps = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFps);
    };

    const animationId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const filteredExchanges = exchanges.filter((e) =>
    selectedProviders.includes(e.provider)
  );

  const avgLatency =
    latencyData.length > 0
      ? Math.round(
          latencyData.reduce((sum, d) => sum + d.latency, 0) / latencyData.length
        )
      : 0;

  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-4 min-w-[200px]">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          System Stats
        </h3>

        <div className="space-y-2">
          {/* FPS */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              FPS
            </span>
            <span className={`text-sm font-medium ${
              fps >= 50 ? 'text-green-600 dark:text-green-400' :
              fps >= 30 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {fps}
            </span>
          </div>

          {/* Active Exchanges */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Server className="w-3 h-3" />
              Exchanges
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {filteredExchanges.length}
            </span>
          </div>

          {/* Active Connections */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Connections
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {latencyData.length}
            </span>
          </div>

          {/* Average Latency */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Avg Latency
            </span>
            <span className={`text-sm font-medium ${
              avgLatency < 50 ? 'text-green-600 dark:text-green-400' :
              avgLatency < 150 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {avgLatency}ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
