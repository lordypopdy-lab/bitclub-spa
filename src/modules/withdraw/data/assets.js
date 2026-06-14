// Static asset catalog with networks, fees, limits, and address regex.
// In production, replace with API fetch — same shape, same consumer code.

export const ASSETS = [
  {
    symbol: "BTC", name: "Bitcoin", color: "#f7931a", priceUsd: 68000,
    networks: [
      { id: "BTC", label: "Bitcoin", fee: 0.0002, min: 0.001, max: 50, eta: "~30 min", regex: /^(bc1[a-z0-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/ },
      { id: "BEP20", label: "BNB Smart Chain (BEP20)", fee: 0.00001, min: 0.0005, max: 50, eta: "~3 min", regex: /^0x[a-fA-F0-9]{40}$/ },
    ],
  },
  {
    symbol: "ETH", name: "Ethereum", color: "#627eea", priceUsd: 3500,
    networks: [
      { id: "ERC20", label: "Ethereum (ERC20)", fee: 0.0015, min: 0.005, max: 500, eta: "~5 min", regex: /^0x[a-fA-F0-9]{40}$/ },
      { id: "ARB", label: "Arbitrum One", fee: 0.0001, min: 0.001, max: 500, eta: "~2 min", regex: /^0x[a-fA-F0-9]{40}$/ },
      { id: "OP", label: "Optimism", fee: 0.0001, min: 0.001, max: 500, eta: "~2 min", regex: /^0x[a-fA-F0-9]{40}$/ },
    ],
  },
  {
    symbol: "USDT", name: "Tether", color: "#26a17b", priceUsd: 1,
    networks: [
      { id: "TRC20", label: "Tron (TRC20)", fee: 1, min: 10, max: 1000000, eta: "~3 min", regex: /^T[a-zA-HJ-NP-Z0-9]{33}$/ },
      { id: "ERC20", label: "Ethereum (ERC20)", fee: 5, min: 20, max: 1000000, eta: "~5 min", regex: /^0x[a-fA-F0-9]{40}$/ },
      { id: "BEP20", label: "BNB Smart Chain (BEP20)", fee: 0.5, min: 5, max: 1000000, eta: "~3 min", regex: /^0x[a-fA-F0-9]{40}$/ },
      { id: "POLY", label: "Polygon", fee: 0.8, min: 5, max: 1000000, eta: "~3 min", regex: /^0x[a-fA-F0-9]{40}$/ },
    ],
  },
  {
    symbol: "BNB", name: "BNB", color: "#f3ba2f", priceUsd: 600,
    networks: [
      { id: "BEP20", label: "BNB Smart Chain (BEP20)", fee: 0.0005, min: 0.01, max: 1000, eta: "~3 min", regex: /^0x[a-fA-F0-9]{40}$/ },
    ],
  },
  {
    symbol: "SOL", name: "Solana", color: "#14f195", priceUsd: 160,
    networks: [
      { id: "SOL", label: "Solana", fee: 0.001, min: 0.05, max: 10000, eta: "~2 min", regex: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/ },
    ],
  },
  {
    symbol: "XRP", name: "Ripple", color: "#23292f", priceUsd: 0.55,
    networks: [{ id: "XRP", label: "XRP Ledger", fee: 0.25, min: 22, max: 1000000, eta: "~2 min", regex: /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/ }],
  },
  {
    symbol: "DOGE", name: "Dogecoin", color: "#c2a633", priceUsd: 0.16,
    networks: [{ id: "DOGE", label: "Dogecoin", fee: 5, min: 20, max: 1000000, eta: "~10 min", regex: /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}$/ }],
  },
  {
    symbol: "ADA", name: "Cardano", color: "#0033ad", priceUsd: 0.45,
    networks: [{ id: "ADA", label: "Cardano", fee: 1, min: 5, max: 1000000, eta: "~5 min", regex: /^(addr1|stake1)[a-z0-9]{30,120}$/ }],
  },
  {
    symbol: "GOATS", name: "GOATS", color: "#222", priceUsd: 0.05,
    networks: [{ id: "TON", label: "TON (The Open Network)", fee: 0.5, min: 0.001, max: 1000000, eta: "~2 min", regex: /^[EU]Q[A-Za-z0-9_-]{46}$/ }],
  },
];

export const FIAT = [
  { symbol: "EUR", name: "Euro", color: "#1a73e8" },
  { symbol: "USD", name: "US Dollar", color: "#2ecc71" },
  { symbol: "GBP", name: "British Pound", color: "#7c3aed" },
];

export const PAYMENT_METHODS = [
  { id: "bank", name: "Bank Transfer", fee: 0.5, eta: "1–3 business days" },
  { id: "card", name: "Visa / Mastercard", fee: 1.5, eta: "Instant" },
  { id: "wallet", name: "EUR Wallet Balance", fee: 0, eta: "Instant" },
];

export const getAsset = (sym) => ASSETS.find((a) => a.symbol === sym) || null;
