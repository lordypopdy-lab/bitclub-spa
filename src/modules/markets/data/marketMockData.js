// Premium markets mock data — Bitget/Bybit style
const seedSpark = (base, vol = 0.02, len = 24, dir = 1) => {
  const arr = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v = v * (1 + (Math.sin(i * 0.7) * vol + (Math.random() - 0.5) * vol) * dir);
    arr.push(v);
  }
  return arr;
};

export const OVERVIEW_CARDS = [
  { symbol: "BTC", price: 75362.0, change: -1.82 },
  { symbol: "BGB", price: 2.0529, change: 3.01 },
  { symbol: "CTR", price: 0.01932, change: -12.24 },
  { symbol: "NAS100", price: 30059.98, change: 0.19 },
  { symbol: "Gold", price: 4501.27, change: -0.23 },
  { symbol: "EURUSD", price: 1.16411, change: 0.11 },
].map((c) => ({
  ...c,
  spark: seedSpark(c.price, 0.015, 22, c.change >= 0 ? 1 : -1),
}));

const make = (sym, quote, price, change, vol, badge) => ({
  id: `${sym}-${quote}`,
  symbol: sym,
  quote,
  price,
  change,
  volume: vol,
  badge,
  fiat: price * 0.858,
});

export const CRYPTO_COINS = [
  make("BTC", "USDT", 75361.15, -1.82, "513.52M"),
  make("ETH", "USDT", 2064.54, -1.43, "197.44M"),
  make("BGB", "USDT", 2.0528, 3.01, "19.11M"),
  make("XRP", "USDT", 1.3246, -1.56, "18M"),
  make("UNI", "USDT", 3.243, -1.73, "791.38K"),
  make("DOGE", "USDT", 0.10074, -0.68, "13.58M"),
  make("SOL", "USDT", 83.21, -1.39, "45.34M"),
  make("HYPE", "USDT", 60.22, 0.97, "98.46M"),
  make("USDC", "USDT", 1.0012, 0.04, "33.61M", "0 fees"),
  make("ICP", "USDT", 2.707, 2.34, "25.8M"),
  make("BILL", "USDT", 0.083655, -3.48, "22.53M"),
  make("XAUT", "USDT", 4498.3, -0.38, "21.85M", "TradFi gold"),
  make("NEAR", "USDT", 2.4926, -10.12, "8.2M"),
];

export const NEW_LISTINGS = [
  make("SLX", "USDT", 0.19467, 18.23, "12.16M", "Candybomb"),
  make("U", "USDT", 1.0012, 0.02, "637.5K", "New"),
  make("U", "USDC", 1.0001, 0.01, "440.81K", "New"),
  make("NEX", "USDT", 0.000003421, -12.1, "526.74K", "Candybomb"),
  make("UP", "USDT", 0.1032, -7.61, "109.22K", "Candybomb"),
  make("HOOLI", "USDT", 0.003598, -26.27, "76.65K", "PoolX"),
  make("BABYSHARK", "USDT", 0.00958, 5.51, "78.4K"),
  make("PREOPAI", "USDT", 1035.29, 3.11, "3.35M", "TradFi stocks"),
];

export const FUTURES_COINS = [
  make("BTC", "USDT", 75300.2, -1.88, "3.77B"),
  make("ETH", "USDT", 2062.12, -1.52, "2.07B"),
  make("SOL", "USDT", 83.151, -1.4, "289.67M"),
  make("XAU", "USDT", 4513.17, -0.39, "240.48M", "TradFi gold"),
  make("HYPE", "USDT", 60.213, 0.97, "220.53M"),
  make("WLD", "USDT", 0.3553, 4.44, "164.53M"),
  make("NEAR", "USDT", 2.5002, -9.68, "159.25M"),
  make("XRP", "USDT", 1.3236, -1.58, "135.03M"),
];

export const MARGIN_COINS = CRYPTO_COINS.slice(0, 10).map((c, i) => ({
  ...c,
  leverage: [10, 10, 5, 10, 10, 5, 10, 5, 10, 5][i] || 10,
}));

export const STOCKS_COINS = [
  make("AAPL", "USD", 232.45, 1.24, "82.4M"),
  make("NVDA", "USD", 142.18, -0.14, "210.8M"),
  make("TSLA", "USD", 245.92, 2.18, "120.3M"),
  make("MSFT", "USD", 428.5, 0.42, "55.1M"),
  make("META", "USD", 588.7, -0.91, "30.2M"),
  make("GOOGL", "USD", 182.4, 1.05, "44.6M"),
  make("AMZN", "USD", 215.3, -0.62, "61.9M"),
];

export const TRADFI_COINS = [
  make("Gold", "USD", 4501.27, -0.23, "—"),
  make("Silver", "USD", 38.42, 0.18, "—"),
  make("Oil", "USD", 72.15, 1.42, "—"),
  make("NAS100", "USD", 30059.98, 0.19, "—"),
  make("SPX500", "USD", 5821.4, 0.12, "—"),
  make("EUR", "USD", 1.16411, 0.11, "—"),
  make("GBP", "USD", 1.2845, -0.08, "—"),
  make("USD", "JPY", 154.32, 0.22, "—"),
];

export const PROMO_BANNERS = [
  {
    title: "RWA",
    body: "Bitclub launches RWA platform Reality in tokenization push",
    tags: [
      { label: "NVDA", change: -0.14 },
      { label: "BGB/USDT", change: 3.01 },
    ],
  },
  {
    title: "Earn",
    body: "Lock USDT for 30 days and earn up to 12% APR — limited spots",
    tags: [
      { label: "USDT", change: 0.01 },
      { label: "BTC/USDT", change: -1.82 },
    ],
  },
];

export const MAIN_TABS = [
  "Overview",
  "Favorites",
  "Crypto",
  "Stocks",
  "TradFi",
];

export const SUB_TABS = {
  Overview: ["Hot", "Gainers", "Losers", "New", "Volume"],
  Favorites: ["All", "Holdings", "Spot", "Futures", "Margin"],
  Crypto: ["Spot", "Futures", "Margin"],
  Stocks: ["Tech", "AI", "Energy", "Finance"],
  TradFi: ["Forex", "Commodities", "Indices", "Metals"],
};

export const SPOT_FILTERS = ["All", "New", "Key Assets", "Pre-IPO", "Stocks"];
export const FUTURES_FILTERS = ["All", "New", "Key Assets", "Meta"];
export const MARGIN_FILTERS = ["All", "Key Assets", "Stablecoin", "AI", "Meme"];

export const COIN_COLORS = {
  BTC: "#f7931a",
  ETH: "#627eea",
  BGB: "#00d1c1",
  XRP: "#0d0d0d",
  UNI: "#ff007a",
  DOGE: "#c2a633",
  SOL: "#9945ff",
  HYPE: "#22c55e",
  USDC: "#2775ca",
  ICP: "#29abe2",
  BILL: "#3b82f6",
  XAUT: "#d4af37",
  NEAR: "#000",
  SLX: "#7c3aed",
  U: "#fbbf24",
  NEX: "#64748b",
  UP: "#84cc16",
  HOOLI: "#1e293b",
  BABYSHARK: "#fde047",
  PREOPAI: "#0891b2",
  CTR: "#ef4444",
  NAS100: "#3b82f6",
  Gold: "#d4af37",
  EURUSD: "#22d3ee",
  XAU: "#d4af37",
  WLD: "#ffffff",
  AAPL: "#a3a3a3",
  NVDA: "#76b900",
  TSLA: "#cc0000",
  MSFT: "#00a4ef",
  META: "#0866ff",
  GOOGL: "#ea4335",
  AMZN: "#ff9900",
  Silver: "#c0c0c0",
  Oil: "#1e293b",
  SPX500: "#10b981",
  EUR: "#003399",
  GBP: "#012169",
  USD: "#3c3b6e",
};
