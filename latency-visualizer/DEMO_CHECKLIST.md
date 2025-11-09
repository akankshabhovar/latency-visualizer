# Video Demo Checklist
## Ensure You Show Every Feature

---

## Pre-Recording Setup

- [ ] Application running at http://localhost:3000
- [ ] VS Code open with project loaded
- [ ] Browser window sized appropriately (1920x1080 recommended)
- [ ] Audio test completed
- [ ] Desktop cleaned (close unnecessary apps/tabs)
- [ ] Screen recording software ready (OBS/Loom)

---

## Feature Demonstration Checklist

### Part 1: Initial View (First 10 seconds)
- [ ] Show the full application interface
- [ ] Point out the header "Latency Topology Visualizer"
- [ ] Note the 3D globe in the center
- [ ] Point to the Stats Panel (top left)
- [ ] Point to the Control Panel (top right)

### Part 2: 3D Globe Interaction (1 minute)
- [ ] Click and drag to rotate the globe
- [ ] Scroll to zoom in and out
- [ ] Right-click and drag to pan (if supported)
- [ ] Show auto-rotation feature
- [ ] Mention FPS counter showing 60 FPS

### Part 3: Exchange Markers (1 minute)
- [ ] Hover over at least 3 different exchange markers
- [ ] Show tooltip with exchange details:
  - [ ] Exchange name
  - [ ] Location
  - [ ] Cloud provider
  - [ ] Region code
- [ ] Point out different colored markers:
  - [ ] Orange (AWS)
  - [ ] Blue (GCP)
  - [ ] Light blue (Azure)
- [ ] Show the pulsing animation on markers

### Part 4: Cloud Region Markers (30 seconds)
- [ ] Point out the ring markers (cloud regions)
- [ ] Hover over a region to show details
- [ ] Show the rotating animation
- [ ] Toggle regions on/off in control panel

### Part 5: Real-time Latency Connections (1-2 minutes)
- [ ] Open the Control Panel
- [ ] Enable "Real-time Connections" toggle
- [ ] Show animated connection lines appearing
- [ ] Point out color coding:
  - [ ] Green line (low latency)
  - [ ] Yellow line (medium latency)
  - [ ] Red line (high latency)
- [ ] Show pulse animations along the lines
- [ ] Mention "updates every 5 seconds"
- [ ] Wait 5 seconds to show an update
- [ ] Check Stats Panel for connection count

### Part 6: Historical Latency Chart (2 minutes)
- [ ] Enable "Historical Data" toggle
- [ ] Click on first exchange marker
  - [ ] Show it turns gold
- [ ] Click on second exchange marker
  - [ ] Show chart appears on the right
- [ ] Point out chart features:
  - [ ] Connection details at top
  - [ ] Time range buttons (1h, 24h, 7d, 30d)
  - [ ] Statistics cards (Min, Avg, Max)
  - [ ] Latency graph with lines and shaded area
- [ ] Click each time range button:
  - [ ] 1h
  - [ ] 24h
  - [ ] 7d
  - [ ] 30d
- [ ] Show the chart updating with different data
- [ ] Click same exchange to deselect

### Part 7: Search Functionality (30 seconds)
- [ ] Open Control Panel
- [ ] Click in search box
- [ ] Type "Binance"
  - [ ] Show only Binance markers remain
- [ ] Clear search
- [ ] Type "Singapore"
  - [ ] Show all Singapore-based exchanges
- [ ] Clear search

### Part 8: Provider Filters (1 minute)
- [ ] Open Filters section
- [ ] Uncheck AWS
  - [ ] Show AWS markers disappear
- [ ] Re-check AWS
- [ ] Uncheck GCP
  - [ ] Show GCP markers disappear
- [ ] Uncheck Azure
  - [ ] Show Azure markers disappear
- [ ] Re-check all providers

### Part 9: Exchange Filters (45 seconds)
- [ ] In Filters section, find Exchanges list
- [ ] Select only "Binance"
  - [ ] Show only Binance markers
- [ ] Select "OKX" as well
  - [ ] Show both Binance and OKX
- [ ] Click "Clear selection"
  - [ ] Show all exchanges return

### Part 10: Latency Range Slider (30 seconds)
- [ ] Find Latency Range slider in Filters
- [ ] Show current range (0-500ms)
- [ ] Drag slider to reduce max to 100ms
- [ ] Show high-latency connections disappear
- [ ] Reset slider to 500ms

### Part 11: Theme Toggle (30 seconds)
- [ ] Click sun/moon icon
- [ ] Show transition to dark mode
  - [ ] Dark background
  - [ ] Light text
  - [ ] Adjusted colors
- [ ] Click again to return to light mode
- [ ] Mention smooth transitions

### Part 12: Data Export (30 seconds)
- [ ] Click download icon
- [ ] Show file download
- [ ] Open the downloaded JSON file
- [ ] Show the exported data structure

### Part 13: Performance Stats (30 seconds)
- [ ] Focus on Stats Panel (top left)
- [ ] Point out:
  - [ ] FPS (should be ~60)
  - [ ] Active exchanges count
  - [ ] Connection count
  - [ ] Average latency

### Part 14: Responsive Design (45 seconds)
- [ ] Open browser DevTools (F12)
- [ ] Click device toolbar/responsive mode
- [ ] Switch to mobile view (iPhone/Android)
- [ ] Show layout adaptation:
  - [ ] Stacked layout
  - [ ] Accessible controls
  - [ ] Touch-friendly UI
- [ ] Switch back to desktop view

### Part 15: Legend (15 seconds)
- [ ] Point to legend in bottom left
- [ ] Show cloud provider colors
- [ ] Show latency color coding

---

## Code Walkthrough Checklist

### Part 1: Project Structure (1 minute)
- [ ] Show folder tree in VS Code
- [ ] Highlight key directories:
  - [ ] `app/` - Next.js pages
  - [ ] `components/` - React components
  - [ ] `lib/` - Business logic
  - [ ] `types/` - TypeScript definitions
- [ ] Mention file count (16 TypeScript files)

### Part 2: Type Definitions (30 seconds)
- [ ] Open `types/index.ts`
- [ ] Show key interfaces:
  - [ ] ExchangeServer
  - [ ] LatencyData
  - [ ] CloudRegion
- [ ] Mention TypeScript benefits

### Part 3: State Management (1 minute)
- [ ] Open `lib/stores/appStore.ts`
- [ ] Show store structure
- [ ] Point out:
  - [ ] State properties
  - [ ] Actions/setters
  - [ ] `updateLatencyData` function
- [ ] Mention Zustand advantages

### Part 4: Data (30 seconds)
- [ ] Open `lib/data/exchanges.ts`
- [ ] Show EXCHANGES array
- [ ] Show example exchange object
- [ ] Show CLOUD_REGIONS array
- [ ] Show PROVIDER_COLORS

### Part 5: Latency Calculations (1 minute)
- [ ] Open `lib/utils/latency.ts`
- [ ] Show `calculateDistance` function
  - [ ] Mention Haversine formula
- [ ] Show `simulateLatency` function
  - [ ] Base latency calculation
  - [ ] Provider overhead
  - [ ] Random jitter
- [ ] Mention this would be replaced with real API

### Part 6: Main Page (45 seconds)
- [ ] Open `app/page.tsx`
- [ ] Show dynamic import (line 11-21)
  - [ ] Explain SSR avoidance for Three.js
- [ ] Show layout structure
- [ ] Show conditional rendering for historical chart

### Part 7: Globe Component (1 minute)
- [ ] Open `components/globe/Globe.tsx`
- [ ] Show Canvas setup
- [ ] Point out child components:
  - [ ] Earth
  - [ ] ExchangeMarkers
  - [ ] LatencyConnections
  - [ ] RegionMarkers
- [ ] Show OrbitControls configuration

### Part 8: Earth Component (30 seconds)
- [ ] Open `components/globe/Earth.tsx`
- [ ] Show sphere creation
- [ ] Show atmosphere glow effect
- [ ] Show rotation animation in useFrame

### Part 9: Exchange Markers (1.5 minutes)
- [ ] Open `components/globe/ExchangeMarkers.tsx`
- [ ] Show `latLngToVector3` function
  - [ ] Explain coordinate conversion
- [ ] Show Marker component
- [ ] Show useFrame animation
- [ ] Show click handler logic
  - [ ] First click selection
  - [ ] Second click connection

### Part 10: Latency Connections (1 minute)
- [ ] Open `components/globe/LatencyConnections.tsx`
- [ ] Show `createCurve` function
- [ ] Show Connection component
- [ ] Show pulse animation in useFrame
- [ ] Show update interval (useEffect)

### Part 11: Region Markers (30 seconds)
- [ ] Open `components/globe/RegionMarkers.tsx`
- [ ] Show ring geometry
- [ ] Show rotation animation
- [ ] Show filtering logic

### Part 12: Chart Component (1 minute)
- [ ] Open `components/charts/LatencyChart.tsx`
- [ ] Show Recharts usage
- [ ] Show ComposedChart structure
- [ ] Show statistics calculation
- [ ] Show time range handling

### Part 13: Control Panel (45 seconds)
- [ ] Open `components/ui/ControlPanel.tsx`
- [ ] Show search implementation
- [ ] Show filter toggles
- [ ] Show handleProviderToggle
- [ ] Show export functionality

### Part 14: Stats Panel (30 seconds)
- [ ] Open `components/ui/StatsPanel.tsx`
- [ ] Show FPS measurement
- [ ] Show stat calculations
- [ ] Show color coding logic

---

## Key Points to Mention

### Technical Highlights
- [ ] Next.js 16 with App Router
- [ ] TypeScript for type safety (100%)
- [ ] React Three Fiber for 3D
- [ ] Zustand for state management
- [ ] Recharts for data visualization
- [ ] Tailwind CSS for styling
- [ ] Dynamic imports for performance
- [ ] useMemo/useCallback optimizations

### Feature Completeness
- [ ] All 7 core requirements met
- [ ] All bonus features implemented
- [ ] 16 exchange servers
- [ ] 13 cloud regions
- [ ] Real-time updates (5s interval)
- [ ] Historical data with 4 time ranges
- [ ] Comprehensive filtering
- [ ] Responsive design

### Code Quality
- [ ] Clean architecture
- [ ] Separation of concerns
- [ ] Reusable components
- [ ] Performance optimized (60 FPS)
- [ ] Comprehensive documentation
- [ ] Production-ready

---

## Time Estimates

| Section | Time |
|---------|------|
| Introduction | 1 min |
| Feature Demo | 3-4 min |
| Code Walkthrough | 3-4 min |
| Conclusion | 30 sec |
| **Total** | **7-10 min** |

---

## Common Mistakes to Avoid

- [ ] Don't forget to show real-time updates actually updating
- [ ] Don't skip the selection interaction (click two exchanges)
- [ ] Don't forget to show mobile responsive view
- [ ] Don't speak too fast
- [ ] Don't skip showing the code files
- [ ] Don't forget to mention TypeScript and performance
- [ ] Don't skip the export feature
- [ ] Don't forget to show all 4 time ranges

---

## Final Checks Before Uploading

- [ ] Video length is 7-10 minutes
- [ ] Audio is clear and understandable
- [ ] Screen is visible and readable
- [ ] All features were demonstrated
- [ ] Code was shown and explained
- [ ] No personal information visible
- [ ] Video quality is 1080p
- [ ] File size is reasonable for upload

---

## Post-Recording

- [ ] Review entire video
- [ ] Check for any mistakes or unclear parts
- [ ] Add title card (optional)
- [ ] Export in high quality (MP4, H.264)
- [ ] Upload to YouTube/Vimeo/Loom
- [ ] Add to README
- [ ] Include link in submission

---

Good luck with your demonstration!
