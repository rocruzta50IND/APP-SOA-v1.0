
export const MOCK_METRICS = [
  { label: 'Total Assets under Custody', value: '$1.28B', change: '+4.2%', trend: 'up' },
  { label: 'Real-time Settlement Volume', value: '$45.2M', change: '+12.5%', trend: 'up' },
  { label: 'Active Institutional Nodes', value: '124', change: 'Stable', trend: 'neutral' },
  { label: 'Risk Exposure Score', value: '0.02%', change: '-0.01%', trend: 'down' },
];

export const SETTLEMENT_DATA = [
  { time: '09:00', volume: 4000, latency: 24 },
  { time: '10:00', volume: 3000, latency: 18 },
  { time: '11:00', volume: 2000, latency: 22 },
  { time: '12:00', volume: 2780, latency: 25 },
  { time: '13:00', volume: 1890, latency: 20 },
  { time: '14:00', volume: 2390, latency: 21 },
  { time: '15:00', volume: 3490, latency: 19 },
];

export const ASSET_ALLOCATION = [
  { name: 'BTC', value: 45, color: '#F7931A' },
  { name: 'ETH', value: 30, color: '#627EEA' },
  { name: 'USDC', value: 15, color: '#2775CA' },
  { name: 'Others', value: 10, color: '#9CA3AF' },
];

export const RECENT_TRANSACTIONS = [
  { id: 'TX-9021', type: 'Settlement', asset: 'BTC', amount: '12.40', status: 'Completed', counterparty: 'Goldman Sachs' },
  { id: 'TX-9022', type: 'Custody', asset: 'ETH', amount: '450.00', status: 'Processing', counterparty: 'BlackRock' },
  { id: 'TX-9023', type: 'Transfer', asset: 'USDC', amount: '1,000,000', status: 'Completed', counterparty: 'J.P. Morgan' },
  { id: 'TX-9024', type: 'Settlement', asset: 'SOL', amount: '2,500.00', status: 'Failed', counterparty: 'Fidelity' },
  { id: 'TX-9025', type: 'Custody', asset: 'BTC', amount: '5.20', status: 'Completed', counterparty: 'Morgan Stanley' },
];

export const PREDICTIVE_DATA = [
  { month: 'Jan', actual: 4000, predicted: 4100 },
  { month: 'Feb', actual: 3000, predicted: 3200 },
  { month: 'Mar', actual: 2000, predicted: 2500 },
  { month: 'Apr', actual: 2780, predicted: 2800 },
  { month: 'May', actual: 1890, predicted: 2100 },
  { month: 'Jun', actual: 2390, predicted: 2400 },
];
