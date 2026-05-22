// Mock datasets for the Home module

export const HERO_CARDS = [
  { id: 1, tag: "Trade to share 50,000 USDT!", title: "Elon Musk's SpaceX perps are now live!", art: "🛸" },
  { id: 2, tag: "Guaranteed rewards", title: "Collect pizza puzzle pieces and share 50,000 USDT", art: "🍕" },
  { id: 3, tag: "Trade with confidence", title: "Get 10% Back on Losses, Up to $3,040 per User!", art: "💎" },
  { id: 4, tag: "Middle East & Africa Region Exclusive", title: "Bitget's Elite Trading Series - Win Luxury Prizes", art: "🗺️" },
  { id: 5, tag: "Launchpad", title: "New token sale — secure your allocation today", art: "🚀" },
  { id: 6, tag: "Bitget CFD Copy Trading Rally", title: "Grab a share of $65,000! First Trade Covered!", art: "🏆" },
];

export const QUICK_ACTIONS = [
  { label: "Rewards", icon: "BsGift" },
  { label: "Referral", icon: "BsPeopleFill" },
  { label: "Earn", icon: "BsPiggyBank" },
  { label: "Trading bots", icon: "BsRobot" },
  { label: "IPO Prime", icon: "BsBuilding" },
  { label: "More", icon: "BsGrid" },
];

export const MARKET_TICKERS = [
  { symbol: "BTC", category: "Crypto", price: 77469.99, change: 0.19, color: "#f7931a" },
  { symbol: "PREOPAI", category: "Stock", price: 970.28, change: 6.02, color: "#627eea" },
  { symbol: "TAG", category: "Onchain", price: 0.001305, change: 13.06, color: "#22c1c3" },
  { symbol: "Gold", category: "Metal", price: 4517.93, change: -0.52, color: "#f0b90b" },
  { symbol: "ETH", category: "Crypto", price: 2134.88, change: 0.77, color: "#627eea" },
  { symbol: "SOL", category: "Crypto", price: 87.78, change: 2.4, color: "#9945ff" },
];

export const MAIN_TABS = ["Favorites", "Spot", "Futures", "Stocks", "TradFi", "Onchain"];

export const SUB_TABS = {
  Favorites: ["Watchlist", "Top Holdings", "Recently Viewed"],
  Spot: ["Hot", "Gainers", "Losers", "New", "Volume"],
  Futures: ["Hot", "Gainers", "Losers", "New", "Volume"],
  Stocks: ["Gainers", "Losers", "Volume", "Market cap"],
  TradFi: ["Metals", "Indices", "Forex", "Commodities", "Perps"],
  Onchain: ["Hot", "Latest", "Blue chip"],
};

const mk = (symbol, name, price, change, vol, fiat, color) => ({
  symbol, name, price, change, vol, fiat, color,
});

export const COIN_DATA = {
  Favorites: [
    mk("BTC", "USDT", 77516.75, 0.24, "292.27M", 66749.67, "#f7931a"),
    mk("ETH", "USDT", 2134.88, 0.77, "173.04M", 1838.34, "#627eea"),
    mk("BGB", "USDT", 1.9965, -0.04, "14.17M", 1.71, "#00d1c1"),
    mk("XRP", "USDT", 1.3658, 0.07, "41.47M", 1.17, "#23292f"),
    mk("UNI", "USDT", 3.67, 2.4, "1.13M", 3.16, "#ff007a"),
  ],
  Spot: [
    mk("BTC", "USDT", 77529.99, 0.25, "292.28M", 66749.67, "#f7931a"),
    mk("ETH", "USDT", 2135.4, 0.77, "173.02M", 1838.34, "#627eea"),
    mk("HYPE", "USDT", 61.47, 6.2, "132.73M", 52.79, "#00b5a5"),
    mk("SOL", "USDT", 87.78, 2.4, "61.37M", 75.5, "#9945ff"),
    mk("XRP", "USDT", 1.3659, 0.04, "41.44M", 1.17, "#23292f"),
  ],
  Futures: [
    mk("BTCUSDT", "Perp", 77498.1, 0.25, "€66,733.61", 66733.61, "#f7931a"),
    mk("ETHUSDT", "Perp", 2134.22, 0.75, "€1,837.77", 1837.77, "#627eea"),
    mk("HYPEUSDT", "Perp", 61.31, 6.08, "€52.79", 52.79, "#00b5a5"),
    mk("BSBUSDT", "Perp", 0.87524, -8.69, "€0.75", 0.75, "#ff5e7e"),
    mk("FIDAUSDT", "Perp", 0.03982, -3.63, "€0.03", 0.03, "#7b61ff"),
  ],
  Stocks: [
    mk("RGTI", "Rigetti Computing, Inc.", 22.9, 20.27, "—", 0, "#22c1c3"),
    mk("QBTS", "D-Wave Quantum", 26.45, 20.1, "—", 0, "#3b82f6"),
    mk("SPOT", "Spotify Technology S.A.", 500.38, 15.52, "—", 0, "#1ed760"),
    mk("PLUG", "Plug Power Inc.", 3.77, 14.89, "—", 0, "#0ea5e9"),
    mk("ENPH", "Enphase Energy, Inc.", 61.75, 14.16, "—", 0, "#f97316"),
  ],
  TradFi: [
    mk("XAUAUD", "Gold vs Australian Dollar", 6340.93, -0.06, "—", 0, "#f0b90b"),
    mk("XAUEUR", "Gold vs Euro", 3895.61, -0.32, "—", 0, "#f0b90b"),
    mk("XAUJPY", "Gold vs. Japanese Yen", 719055, -0.34, "—", 0, "#f0b90b"),
    mk("XAUUSD", "Gold vs US Dollar", 4519.74, -0.48, "—", 0, "#f0b90b"),
    mk("XAGAUD", "Silver vs Australian Dollar", 106.361, -0.82, "—", 0, "#9aa0a6"),
  ],
  Onchain: [
    mk("NEX", "$31.34M", 0.000004432, -25.22, "$19.97M", 0, "#1c1f23"),
    mk("UB", "$14.79M", 0.1115, 1.11, "$223.05M", 0, "#3b82f6"),
    mk("BSB", "$11.56M", 0.8724, -9.21, "$34.99M", 0, "#a78bfa"),
    mk("$BANANA", "$6.4M", 0.01108, -17.88, "$110.76M", 0, "#f0b90b"),
    mk("SUPERGEMMA", "$5.5M", 0.00001422, 800.15, "$1.43M", 0, "#e5e7eb"),
  ],
};
