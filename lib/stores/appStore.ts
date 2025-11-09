import { create } from 'zustand';
import {
  CloudProvider,
  ExchangeServer,
  LatencyData,
  TimeRange,
  HistoricalLatency,
} from '@/types';
import { EXCHANGES } from '@/lib/data/exchanges';
import { generateLatencyData, generateHistoricalData } from '@/lib/utils/latency';

interface AppState {
  // Data
  exchanges: ExchangeServer[];
  latencyData: LatencyData[];
  selectedConnection: { from: ExchangeServer; to: ExchangeServer } | null;
  historicalData: HistoricalLatency[];

  // Filters
  selectedExchanges: string[];
  selectedProviders: CloudProvider[];
  latencyRange: [number, number];
  timeRange: TimeRange;

  // UI State
  showRealtime: boolean;
  showHistorical: boolean;
  showRegions: boolean;
  isDarkMode: boolean;
  searchQuery: string;

  // Actions
  setSelectedExchanges: (exchanges: string[]) => void;
  setSelectedProviders: (providers: CloudProvider[]) => void;
  setLatencyRange: (range: [number, number]) => void;
  setTimeRange: (range: TimeRange) => void;
  setShowRealtime: (show: boolean) => void;
  setShowHistorical: (show: boolean) => void;
  setShowRegions: (show: boolean) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedConnection: (from: ExchangeServer, to: ExchangeServer) => void;
  clearSelectedConnection: () => void;
  updateLatencyData: () => void;
  initializeHistoricalData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial data
  exchanges: EXCHANGES,
  latencyData: [],
  selectedConnection: null,
  historicalData: [],

  // Initial filters
  selectedExchanges: [],
  selectedProviders: ['AWS', 'GCP', 'Azure'],
  latencyRange: [0, 500],
  timeRange: '24h',

  // Initial UI state
  showRealtime: true,
  showHistorical: false,
  showRegions: true,
  isDarkMode: false,
  searchQuery: '',

  // Actions
  setSelectedExchanges: (exchanges) => set({ selectedExchanges: exchanges }),
  setSelectedProviders: (providers) => set({ selectedProviders: providers }),
  setLatencyRange: (range) => set({ latencyRange: range }),
  setTimeRange: (range) => {
    set({ timeRange: range });
    get().initializeHistoricalData();
  },
  setShowRealtime: (show) => set({ showRealtime: show }),
  setShowHistorical: (show) => set({ showHistorical: show }),
  setShowRegions: (show) => set({ showRegions: show }),
  setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedConnection: (from, to) => {
    set({ selectedConnection: { from, to } });
    get().initializeHistoricalData();
  },

  clearSelectedConnection: () => {
    set({ selectedConnection: null, historicalData: [] });
  },

  updateLatencyData: () => {
    const latencyData = generateLatencyData(EXCHANGES);
    set({ latencyData });
  },

  initializeHistoricalData: () => {
    const { selectedConnection, timeRange } = get();
    if (selectedConnection) {
      const historicalData = generateHistoricalData(
        selectedConnection.from,
        selectedConnection.to,
        timeRange
      );
      set({ historicalData });
    }
  },
}));
