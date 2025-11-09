import { ExchangeServer, LatencyData, HistoricalLatency } from '@/types';

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Simulate latency based on distance and add randomness
 */
export function simulateLatency(
  from: ExchangeServer,
  to: ExchangeServer
): number {
  const distance = calculateDistance(
    from.coordinates.lat,
    from.coordinates.lng,
    to.coordinates.lat,
    to.coordinates.lng
  );

  // Base latency: ~10ms per 1000km + provider overhead
  let baseLatency = (distance / 1000) * 10;

  // Add provider overhead (same provider = better peering)
  if (from.provider !== to.provider) {
    baseLatency += 5 + Math.random() * 10;
  }

  // Add random jitter (±20%)
  const jitter = baseLatency * 0.2 * (Math.random() - 0.5);

  return Math.max(1, Math.round(baseLatency + jitter));
}

/**
 * Generate real-time latency data for all exchange pairs
 */
export function generateLatencyData(
  exchanges: ExchangeServer[]
): LatencyData[] {
  const latencyData: LatencyData[] = [];
  const now = Date.now();

  for (let i = 0; i < exchanges.length; i++) {
    for (let j = i + 1; j < exchanges.length; j++) {
      const from = exchanges[i];
      const to = exchanges[j];
      const latency = simulateLatency(from, to);

      latencyData.push({
        fromId: from.id,
        toId: to.id,
        latency,
        timestamp: now,
      });
    }
  }

  return latencyData;
}

/**
 * Get latency color based on value
 */
export function getLatencyColor(latency: number): string {
  if (latency < 50) return '#10B981'; // Green
  if (latency < 150) return '#F59E0B'; // Yellow/Orange
  return '#EF4444'; // Red
}

/**
 * Generate historical latency data for a specific connection
 */
export function generateHistoricalData(
  from: ExchangeServer,
  to: ExchangeServer,
  timeRange: '1h' | '24h' | '7d' | '30d'
): HistoricalLatency[] {
  const now = Date.now();
  const ranges = {
    '1h': { duration: 60 * 60 * 1000, interval: 60 * 1000 }, // 1 minute intervals
    '24h': { duration: 24 * 60 * 60 * 1000, interval: 15 * 60 * 1000 }, // 15 minute intervals
    '7d': { duration: 7 * 24 * 60 * 60 * 1000, interval: 60 * 60 * 1000 }, // 1 hour intervals
    '30d': { duration: 30 * 24 * 60 * 60 * 1000, interval: 6 * 60 * 60 * 1000 }, // 6 hour intervals
  };

  const { duration, interval } = ranges[timeRange];
  const data: HistoricalLatency[] = [];
  const baseLatency = simulateLatency(from, to);

  for (let i = duration; i >= 0; i -= interval) {
    const timestamp = now - i;

    // Add some variation over time
    const variation = Math.sin(i / interval) * 15 + Math.random() * 10;
    const latency = Math.max(1, baseLatency + variation);

    const min = latency - Math.random() * 5;
    const max = latency + Math.random() * 15;
    const avg = (min + max) / 2;

    data.push({
      timestamp,
      latency: Math.round(latency),
      min: Math.round(min),
      max: Math.round(max),
      avg: Math.round(avg),
    });
  }

  return data;
}

/**
 * Format latency value with unit
 */
export function formatLatency(latency: number): string {
  return `${latency}ms`;
}

/**
 * Calculate statistics for latency data
 */
export function calculateStats(data: HistoricalLatency[]) {
  if (data.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  const latencies = data.map(d => d.latency);
  return {
    min: Math.min(...latencies),
    max: Math.max(...latencies),
    avg: Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length),
  };
}
