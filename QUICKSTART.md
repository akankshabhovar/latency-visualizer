# Quick Start Guide

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Features to Try

### 1. Explore the 3D Globe
- **Rotate**: Click and drag
- **Zoom**: Scroll wheel
- **Pan**: Right-click and drag (or Ctrl+drag)

### 2. View Exchange Information
- **Hover** over any glowing marker to see exchange details
- Markers are color-coded by cloud provider:
  - Orange = AWS
  - Blue = GCP
  - Light Blue = Azure

### 3. View Historical Latency
- Click **Controls** panel (top right)
- Enable "Historical Data" toggle
- Click on **any two exchange markers** to see latency history
- Selected exchanges turn gold
- Chart appears on the right side

### 4. Filter Data
- Open the **Filters** section in the Control Panel
- Toggle cloud providers (AWS/GCP/Azure)
- Select specific exchanges
- Adjust latency range slider

### 5. Real-time Connections
- Enable "Real-time Connections" to see animated latency lines
- Lines update every 5 seconds
- Color indicates latency:
  - Green: < 50ms (Low)
  - Yellow: 50-150ms (Medium)
  - Red: > 150ms (High)

### 6. Theme Toggle
- Click the sun/moon icon to switch between light/dark mode

### 7. Export Data
- Click the download icon to export current latency data as JSON

## Performance Stats
- Top left panel shows:
  - FPS (frames per second)
  - Active exchanges count
  - Connection count
  - Average latency

## Tips
- For best performance, limit visible connections using filters
- Use search to quickly find specific exchanges
- Historical charts support 4 time ranges: 1h, 24h, 7d, 30d
