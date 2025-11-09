import { ExchangeServer, CloudRegion } from '@/types';

export const EXCHANGES: ExchangeServer[] = [
  // Binance - Multiple regions
  {
    id: 'binance-tokyo',
    name: 'Binance',
    location: 'Tokyo, Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    provider: 'AWS',
    region: 'ap-northeast-1',
    color: '#F3BA2F',
  },
  {
    id: 'binance-singapore',
    name: 'Binance',
    location: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    provider: 'AWS',
    region: 'ap-southeast-1',
    color: '#F3BA2F',
  },
  {
    id: 'binance-ireland',
    name: 'Binance',
    location: 'Dublin, Ireland',
    coordinates: { lat: 53.3498, lng: -6.2603 },
    provider: 'AWS',
    region: 'eu-west-1',
    color: '#F3BA2F',
  },

  // OKX
  {
    id: 'okx-singapore',
    name: 'OKX',
    location: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    provider: 'AWS',
    region: 'ap-southeast-1',
    color: '#00D6B9',
  },
  {
    id: 'okx-hongkong',
    name: 'OKX',
    location: 'Hong Kong',
    coordinates: { lat: 22.3193, lng: 114.1694 },
    provider: 'GCP',
    region: 'asia-east2',
    color: '#00D6B9',
  },

  // Bybit
  {
    id: 'bybit-singapore',
    name: 'Bybit',
    location: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    provider: 'AWS',
    region: 'ap-southeast-1',
    color: '#F7A600',
  },
  {
    id: 'bybit-tokyo',
    name: 'Bybit',
    location: 'Tokyo, Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    provider: 'AWS',
    region: 'ap-northeast-1',
    color: '#F7A600',
  },

  // Deribit
  {
    id: 'deribit-amsterdam',
    name: 'Deribit',
    location: 'Amsterdam, Netherlands',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    provider: 'GCP',
    region: 'europe-west4',
    color: '#FF6B6B',
  },

  // Coinbase
  {
    id: 'coinbase-virginia',
    name: 'Coinbase',
    location: 'Virginia, USA',
    coordinates: { lat: 37.4316, lng: -78.6569 },
    provider: 'AWS',
    region: 'us-east-1',
    color: '#0052FF',
  },
  {
    id: 'coinbase-oregon',
    name: 'Coinbase',
    location: 'Oregon, USA',
    coordinates: { lat: 43.8041, lng: -120.5542 },
    provider: 'GCP',
    region: 'us-west1',
    color: '#0052FF',
  },

  // Kraken
  {
    id: 'kraken-frankfurt',
    name: 'Kraken',
    location: 'Frankfurt, Germany',
    coordinates: { lat: 50.1109, lng: 8.6821 },
    provider: 'Azure',
    region: 'germanywestcentral',
    color: '#5741D9',
  },
  {
    id: 'kraken-tokyo',
    name: 'Kraken',
    location: 'Tokyo, Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    provider: 'Azure',
    region: 'japaneast',
    color: '#5741D9',
  },

  // Bitfinex
  {
    id: 'bitfinex-london',
    name: 'Bitfinex',
    location: 'London, UK',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    provider: 'AWS',
    region: 'eu-west-2',
    color: '#2ECC71',
  },

  // Huobi
  {
    id: 'huobi-singapore',
    name: 'Huobi',
    location: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    provider: 'AWS',
    region: 'ap-southeast-1',
    color: '#2EACD9',
  },

  // KuCoin
  {
    id: 'kucoin-singapore',
    name: 'KuCoin',
    location: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    provider: 'GCP',
    region: 'asia-southeast1',
    color: '#24AE8F',
  },

  // Gate.io
  {
    id: 'gate-seoul',
    name: 'Gate.io',
    location: 'Seoul, South Korea',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    provider: 'AWS',
    region: 'ap-northeast-2',
    color: '#17E3A0',
  },
];

export const CLOUD_REGIONS: CloudRegion[] = [
  // AWS Regions
  {
    id: 'aws-us-east-1',
    provider: 'AWS',
    name: 'US East (N. Virginia)',
    code: 'us-east-1',
    coordinates: { lat: 37.4316, lng: -78.6569 },
    serverCount: 1,
  },
  {
    id: 'aws-us-west-1',
    provider: 'AWS',
    name: 'US West (Oregon)',
    code: 'us-west-1',
    coordinates: { lat: 43.8041, lng: -120.5542 },
    serverCount: 0,
  },
  {
    id: 'aws-eu-west-1',
    provider: 'AWS',
    name: 'EU (Ireland)',
    code: 'eu-west-1',
    coordinates: { lat: 53.3498, lng: -6.2603 },
    serverCount: 1,
  },
  {
    id: 'aws-eu-west-2',
    provider: 'AWS',
    name: 'EU (London)',
    code: 'eu-west-2',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    serverCount: 1,
  },
  {
    id: 'aws-ap-southeast-1',
    provider: 'AWS',
    name: 'Asia Pacific (Singapore)',
    code: 'ap-southeast-1',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    serverCount: 4,
  },
  {
    id: 'aws-ap-northeast-1',
    provider: 'AWS',
    name: 'Asia Pacific (Tokyo)',
    code: 'ap-northeast-1',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    serverCount: 2,
  },
  {
    id: 'aws-ap-northeast-2',
    provider: 'AWS',
    name: 'Asia Pacific (Seoul)',
    code: 'ap-northeast-2',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    serverCount: 1,
  },

  // GCP Regions
  {
    id: 'gcp-us-west1',
    provider: 'GCP',
    name: 'us-west1 (Oregon)',
    code: 'us-west1',
    coordinates: { lat: 45.5152, lng: -122.6784 },
    serverCount: 1,
  },
  {
    id: 'gcp-europe-west4',
    provider: 'GCP',
    name: 'europe-west4 (Netherlands)',
    code: 'europe-west4',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    serverCount: 1,
  },
  {
    id: 'gcp-asia-east2',
    provider: 'GCP',
    name: 'asia-east2 (Hong Kong)',
    code: 'asia-east2',
    coordinates: { lat: 22.3193, lng: 114.1694 },
    serverCount: 1,
  },
  {
    id: 'gcp-asia-southeast1',
    provider: 'GCP',
    name: 'asia-southeast1 (Singapore)',
    code: 'asia-southeast1',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    serverCount: 1,
  },

  // Azure Regions
  {
    id: 'azure-germanywestcentral',
    provider: 'Azure',
    name: 'Germany West Central',
    code: 'germanywestcentral',
    coordinates: { lat: 50.1109, lng: 8.6821 },
    serverCount: 1,
  },
  {
    id: 'azure-japaneast',
    provider: 'Azure',
    name: 'Japan East',
    code: 'japaneast',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    serverCount: 1,
  },
];

export const PROVIDER_COLORS = {
  AWS: '#FF9900',
  GCP: '#4285F4',
  Azure: '#0089D6',
};
