// Lightweight CoinGecko service. Free, no API key, CORS enabled.
const BASE = "https://api.coingecko.com/api/v3";

// Map our display symbols to CoinGecko ids
export const COIN_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SUI: "sui",
  BGB: "bitget-token",
  USDT: "tether",
  SOL: "solana",
  XRP: "ripple",
  DOGE: "dogecoin",
};

export async function fetchMarkets(ids, vs = "usd") {
  const url = `${BASE}/coins/markets?vs_currency=${vs}&ids=${ids.join(
    ","
  )}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch markets");
  return res.json();
}

// Fallback / synthetic data so UI never looks broken offline.
export function fallbackMarkets() {
  const mk = (id, symbol, name, price, ch) => ({
    id,
    symbol: symbol.toLowerCase(),
    name,
    current_price: price,
    price_change_percentage_24h: ch,
    sparkline_in_7d: {
      price: Array.from({ length: 30 }, (_, i) => price * (1 + Math.sin(i / 3) * 0.01 + (ch / 100) * (i / 60))),
    },
    image: "",
  });
  return [
    mk("bitcoin", "BTC", "Bitcoin", 81188.09, 0.49),
    mk("bitget-token", "BGB", "Bitget Token", 2.1587, 1.21),
    mk("ethereum", "ETH", "Ethereum", 2333.52, 0.55),
    mk("sui", "SUI", "Sui", 1.271, 12.07),
    mk("tether", "USDT", "Tether", 1.0, 0.01),
    mk("solana", "SOL", "Solana", 142.3, -1.42),
  ];
}
