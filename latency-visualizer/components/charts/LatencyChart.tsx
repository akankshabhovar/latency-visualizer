'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { useAppStore } from '@/lib/stores/appStore';
import { formatLatency, calculateStats } from '@/lib/utils/latency';
import { TimeRange } from '@/types';

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '1h', label: '1 Hour' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
];

export default function LatencyChart() {
  const {
    selectedConnection,
    historicalData,
    timeRange,
    setTimeRange,
    isDarkMode,
  } = useAppStore();

  const stats = useMemo(() => {
    return calculateStats(historicalData);
  }, [historicalData]);

  const chartData = useMemo(() => {
    return historicalData.map((data) => ({
      time: new Date(data.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      latency: data.latency,
      min: data.min,
      max: data.max,
      avg: data.avg,
    }));
  }, [historicalData]);

  if (!selectedConnection) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <p className="text-lg font-medium">No connection selected</p>
          <p className="text-sm mt-2">Click on two exchange markers to view latency history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latency History
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedConnection.from.name} ({selectedConnection.from.location}) →{' '}
            {selectedConnection.to.name} ({selectedConnection.to.location})
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400">Min Latency</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            {formatLatency(stats.min)}
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Latency</div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatLatency(stats.avg)}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400">Max Latency</div>
          <div className="text-xl font-bold text-red-600 dark:text-red-400">
            {formatLatency(stats.max)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? '#374151' : '#e5e7eb'}
            />
            <XAxis
              dataKey="time"
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
              label={{
                value: 'Latency (ms)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: isDarkMode ? '#9ca3af' : '#6b7280' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: isDarkMode ? '#f3f4f6' : '#111827' }}
            />
            <Legend />

            {/* Min-Max range */}
            <Area
              type="monotone"
              dataKey="max"
              stroke="none"
              fill="#ef4444"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="none"
              fill="#ffffff"
              fillOpacity={1}
            />

            {/* Average line */}
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Average"
            />

            {/* Current latency line */}
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Current"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
