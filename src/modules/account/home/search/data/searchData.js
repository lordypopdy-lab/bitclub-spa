// Mock data for the global search experience.
// Architecture supports later swap to live API.

const coinBg = {
  BTC: "#f7931a", ETH: "#627eea", SOL: "#14f195", USDT: "#26a17b",
  USDC: "#2775ca", XRP: "#23292f", ADA: "#0033ad", DOGE: "#c2a633",
  BGB: "#54f", PI: "#5a3fbf", NEAR: "#111", WLD: "#000", HYPE: "#0aa68b",
  SAHARA: "#d4d44a", LAB: "#1eff8e", ZEC: "#f4b728", ENA: "#222",
  SUI: "#4ca2ff", LINK: "#2a5ada", DOT: "#e6007a", TRX: "#ef0027",
  LTC: "#345d9d", UNI: "#ff007a", SUSHI: "#fa52a0",
};

const icon = (s) => s.slice(0, 1);

export const TOP_SEARCHES = {
  Spot: [
    { rank: 1, symbol: "SOL", quote: "USDT", leverage: "10x", price: 68.29, change: -9.23 },
    { rank: 2, symbol: "BTC", quote: "USDT", leverage: "10x", price: 62937.23, change: -6.32 },
    { rank: 3, symbol: "WLD", quote: "USDT", leverage: "5x", price: 0.5121, change: 8.82 },
    { rank: 4, symbol: "PI", quote: "USDT", leverage: "5x", price: 0.1268, change: -8.91 },
    { rank: 5, symbol: "ADA", quote: "USDT", leverage: "10x", price: 0.1889, change: -13.03 },
    { rank: 6, symbol: "SAHARA", quote: "USDT", leverage: "5x", price: 0.03319, change: 0.06 },
    { rank: 7, symbol: "NEAR", quote: "USDT", leverage: "5x", price: 2.331, change: -18.72 },
    { rank: 8, symbol: "USDC", quote: "USDT", leverage: "10x", price: 1.0009, change: -0.02, tag: "0 fees" },
    { rank: 9, symbol: "HYPE", quote: "USDT", leverage: "5x", price: 66.57, change: -8.03, tag: "Candybomb" },
    { rank: 10, symbol: "ETH", quote: "USDT", leverage: "10x", price: 1755.79, change: -6.68 },
  ],
  Futures: [
    { rank: 1, symbol: "BTC", pair: "BTCUSDT", badge: "Perp", price: 62908.1, change: -6.24 },
    { rank: 2, symbol: "ETH", pair: "ETHUSDT", badge: "Perp", price: 1755.04, change: -6.64 },
    { rank: 3, symbol: "LAB", pair: "LABUSDT", badge: "Perp", price: 16.16539, change: 0.77 },
    { rank: 4, symbol: "WLD", pair: "WLDUSDT", badge: "Perp", price: 0.5122, change: 9.19 },
    { rank: 5, symbol: "NEAR", pair: "NEARUSDT", badge: "Perp", price: 2.3286, change: -18.52 },
    { rank: 6, symbol: "HYPE", pair: "HYPEUSDT", badge: "Perp", price: 66.681, change: -7.74 },
    { rank: 7, symbol: "SOL", pair: "SOLUSDT", badge: "Perp", price: 68.256, change: -9.10 },
    { rank: 8, symbol: "ZEC", pair: "ZECUSDT", badge: "Perp", price: 540.24, change: -11.79 },
    { rank: 9, symbol: "ENA", pair: "ENAUSDT", badge: "Perp", price: 0.10057, change: -0.72 },
    { rank: 10, symbol: "SUI", pair: "SUIUSDT", badge: "Perp", price: 0.77, change: -7.55 },
  ],
  Onchain: [
    { rank: 1, symbol: "BASED", vol: "$12.05M", price: "$4.17M", change: -11.26 },
    { rank: 2, symbol: "three", vol: "$7.2M", price: "$12.03M", change: 264.76 },
    { rank: 3, symbol: "AIA", vol: "$10.12M", price: "$12.6M", change: -17.36 },
    { rank: 4, symbol: "币安人生", vol: "$7.04M", price: "$687.26M", change: 9.24 },
    { rank: 5, symbol: "VVV", vol: "$4.68M", price: "$2.01B", change: -10.05 },
    { rank: 6, symbol: "HeavyPulp", vol: "$4.41M", price: "$1.61M", change: 406.10 },
    { rank: 7, symbol: "QAIT", vol: "$2.74M", price: "$125.1M", change: -5.36 },
    { rank: 8, symbol: "SPYx", vol: "$558.27K", price: "$71.92M", change: -1.10 },
    { rank: 9, symbol: "STBL", vol: "$2.37M", price: "$18.87M", change: -14.80 },
    { rank: 10, symbol: "DICKBUTT", vol: "$2.35M", price: "$512.83K", change: 2690.24 },
  ],
  TradFi: [
    { rank: 1, symbol: "OJ", name: "Orange Juice", category: "Commodities", price: 1.7037, change: 4.86, closed: true },
    { rank: 2, symbol: "XPTUSD", name: "Platinum vs US Dollar", category: "Commodities", price: 1894.60, change: 2.87 },
    { rank: 3, symbol: "XPDUSD", name: "Palladium vs US Dollar", category: "Commodities", price: 1321.79, change: 2.66 },
    { rank: 4, symbol: "Sugar", name: "Sugar", category: "Commodities", price: 0.14393, change: 1.57 },
    { rank: 5, symbol: "FRA40", name: "France 40 Index", category: "Indices", price: 8228.50, change: 1.36 },
    { rank: 6, symbol: "DE40", name: "Germany 40", category: "Indices", price: 24955.11, change: 1.02 },
    { rank: 7, symbol: "EUSTX50", name: "Euro STOXX 50", category: "Indices", price: 6082.70, change: 0.98 },
    { rank: 8, symbol: "XAGUSD", name: "Silver vs US Dollar", category: "Metals", price: 73.577, change: 0.95 },
    { rank: 9, symbol: "USDBRL", name: "US Dollar vs Brazilian Real", category: "Forex", price: 5.10797, change: 0.93, closed: true },
    { rank: 10, symbol: "XAGAUD", name: "Silver vs Australian Dollar", category: "Metals", price: 103.120, change: 0.88 },
  ],
};

export const TRENDING = ["BTC", "ETH", "SOL", "XRP", "BGB", "WLD", "PI", "NEAR"];

export const CATEGORIES = ["Spot", "Futures", "Onchain", "TradFi"];

export const coinIcon = (s) => ({ icon: icon(s), bg: coinBg[s] || "#2a2a2a" });
