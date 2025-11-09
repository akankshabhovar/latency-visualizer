'use client';

import { useState } from 'react';
import { Search, Filter, Settings, Sun, Moon, Download } from 'lucide-react';
import { useAppStore } from '@/lib/stores/appStore';
import { EXCHANGES } from '@/lib/data/exchanges';
import { CloudProvider } from '@/types';

export default function ControlPanel() {
  const {
    selectedProviders,
    setSelectedProviders,
    selectedExchanges,
    setSelectedExchanges,
    showRealtime,
    setShowRealtime,
    showHistorical,
    setShowHistorical,
    showRegions,
    setShowRegions,
    isDarkMode,
    setIsDarkMode,
    searchQuery,
    setSearchQuery,
    latencyRange,
    setLatencyRange,
  } = useAppStore();

  const [showFilters, setShowFilters] = useState(false);

  const uniqueExchangeNames = Array.from(
    new Set(EXCHANGES.map((e) => e.name))
  ).sort();

  const providers: CloudProvider[] = ['AWS', 'GCP', 'Azure'];

  const handleProviderToggle = (provider: CloudProvider) => {
    if (selectedProviders.includes(provider)) {
      setSelectedProviders(selectedProviders.filter((p) => p !== provider));
    } else {
      setSelectedProviders([...selectedProviders, provider]);
    }
  };

  const handleExchangeToggle = (exchange: string) => {
    if (selectedExchanges.includes(exchange)) {
      setSelectedExchanges(selectedExchanges.filter((e) => e !== exchange));
    } else {
      setSelectedExchanges([...selectedExchanges, exchange]);
    }
  };

  const handleExportData = () => {
    // Export functionality
    const data = {
      exchanges: EXCHANGES,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `latency-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Controls
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </button>
              <button
                onClick={handleExportData}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Export data"
              >
                <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exchanges or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Visualization Toggles */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Display
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showRealtime}
                onChange={(e) => setShowRealtime(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Real-time Connections
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHistorical}
                onChange={(e) => setShowHistorical(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Historical Data
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showRegions}
                onChange={(e) => setShowRegions(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Cloud Regions
              </span>
            </label>
          </div>
        </div>

        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </span>
          <span className="text-xs text-gray-500">
            {showFilters ? 'Hide' : 'Show'}
          </span>
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
            {/* Cloud Providers */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Cloud Providers
              </h3>
              <div className="space-y-2">
                {providers.map((provider) => (
                  <label
                    key={provider}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProviders.includes(provider)}
                      onChange={() => handleProviderToggle(provider)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {provider}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exchanges */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Exchanges
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uniqueExchangeNames.map((exchange) => (
                  <label
                    key={exchange}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedExchanges.length === 0 ||
                        selectedExchanges.includes(exchange)
                      }
                      onChange={() => handleExchangeToggle(exchange)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {exchange}
                    </span>
                  </label>
                ))}
              </div>
              {selectedExchanges.length > 0 && (
                <button
                  onClick={() => setSelectedExchanges([])}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear selection
                </button>
              )}
            </div>

            {/* Latency Range */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Latency Range
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>{latencyRange[0]}ms</span>
                  <span>{latencyRange[1]}ms</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={latencyRange[1]}
                  onChange={(e) =>
                    setLatencyRange([latencyRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
