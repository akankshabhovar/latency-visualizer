export type CloudProvider = 'AWS' | 'GCP' | 'Azure';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ExchangeServer {
  id: string;
  name: string;
  location: string;
  coordinates: Coordinates;
  provider: CloudProvider;
  region: string;
  color: string;
}

export interface CloudRegion {
  id: string;
  provider: CloudProvider;
  name: string;
  code: string;
  coordinates: Coordinates;
  serverCount: number;
}

export interface LatencyData {
  fromId: string;
  toId: string;
  latency: number;
  timestamp: number;
}

export interface LatencyConnection {
  from: ExchangeServer;
  to: ExchangeServer;
  latency: number;
  color: string;
}

export interface HistoricalLatency {
  timestamp: number;
  latency: number;
  min: number;
  max: number;
  avg: number;
}

export type LatencyRange = 'low' | 'medium' | 'high';

export interface FilterState {
  exchanges: string[];
  providers: CloudProvider[];
  latencyRange: [number, number];
  showRealtime: boolean;
  showHistorical: boolean;
  showRegions: boolean;
}

export type TimeRange = '1h' | '24h' | '7d' | '30d';
