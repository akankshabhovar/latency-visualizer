# Latency Topology Visualizer

A Next.js application that displays a 3D world map visualizing cryptocurrency exchange server locations and real-time/historical latency data across AWS, GCP, and Azure co-location regions.

## Features

### Core Functionality

- **3D World Map Display**
  - Interactive 3D globe with smooth camera controls
  - Rotate, zoom, and pan functionality
  - Auto-rotation for continuous exploration

- **Exchange Server Locations**
  - 16+ major cryptocurrency exchanges (Binance, OKX, Bybit, Deribit, Coinbase, Kraken, etc.)
  - Visual markers with hover information
  - Color-coded by cloud provider (AWS, GCP, Azure)

- **Real-time Latency Visualization**
  - Animated connections between exchange servers
  - Color-coded latency (green < 50ms, yellow 50-150ms, red > 150ms)
  - Live updates every 5 seconds

- **Historical Latency Trends**
  - Time-series charts with multiple time ranges (1h, 24h, 7d, 30d)
  - Min, max, and average latency statistics
  - Interactive selection of exchange pairs

- **Cloud Provider Regions**
  - Visual representation of AWS, GCP, and Azure regions
  - Region information and server counts

### Bonus Features

- Dark/Light Theme Toggle
- Data Export (JSON)
- Responsive Design
- Real-time Performance Metrics

## Technology Stack

- Next.js 16 with App Router
- TypeScript
- React Three Fiber & Three.js
- Recharts
- Zustand (State Management)
- Tailwind CSS

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
latency-visualizer/
├── app/                    # Next.js App Router
├── components/
│   ├── globe/             # 3D Globe components
│   ├── ui/                # UI components
│   └── charts/            # Chart components
├── lib/
│   ├── data/              # Exchange & region data
│   ├── stores/            # State management
│   └── utils/             # Utilities
└── types/                 # TypeScript types
```

## Usage

### Controls

- **Mouse**: Drag to rotate, scroll to zoom
- **Search**: Find exchanges by name/location
- **Filters**: Toggle providers, exchanges, latency ranges
- **Theme**: Toggle dark/light mode
- **Export**: Download latency data

### Viewing Historical Data

1. Enable "Historical Data" in control panel
2. Click two exchange markers to select connection
3. View latency chart with selectable time ranges

## Data Simulation

Latency is simulated based on:
- Geographical distance (Haversine formula)
- Base latency (~10ms per 1000km)
- Provider overhead
- Random jitter (±20%)

For production, replace with actual network measurements.

## Browser Support

Requires WebGL 2.0 support:
- Chrome/Edge (recommended)
- Firefox
- Safari

## License

MIT
