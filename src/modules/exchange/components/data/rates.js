// Mock USD-pegged rates. price = USD per 1 unit
export const ASSETS = {
  BTC: { symbol: "BTC", name: "Bitcoin", icon: "₿", iconBg: "#f7931a", price: 68000, kind: "crypto", badge: "8.88%APR" },
  ETH: { symbol: "ETH", name: "Ethereum", icon: "Ξ", iconBg: "#627eea", price: 3500, kind: "crypto", badge: "4.20%APR" },
  SOL: { symbol: "SOL", name: "Solana", icon: "◎", iconBg: "#14f195", price: 160, kind: "crypto", badge: "6.10%APR" },
  USDT: { symbol: "USDT", name: "Tether", icon: "₮", iconBg: "#26a17b", price: 1, kind: "crypto", badge: "5.00%APR" },
  EUR: { symbol: "EUR", name: "Euro", icon: "€", iconBg: "#1a73e8", price: 1.08, kind: "fiat" },
  USD: { symbol: "USD", name: "US Dollar", icon: "$", iconBg: "#2ecc71", price: 1, kind: "fiat" },
  NGN: { symbol: "NGN", name: "Nigerian Naira", icon: "₦", iconBg: "#16a34a", price: 0.00065, kind: "fiat" },
  GBP: { symbol: "GBP", name: "British Pound", icon: "£", iconBg: "#7c3aed", price: 1.27, kind: "fiat" },
};

export const PAYMENT_METHODS = [
  { id: "opay", name: "Opay", icon: "O", iconBg: "#1a1a1a" },
  { id: "card", name: "Credit/Debit Card", icon: "▭", iconBg: "#2a2a2a" },
  { id: "bank", name: "Bank Transfer", icon: "🏦", iconBg: "#2a2a2a" },
  { id: "applepay", name: "Apple Pay", icon: "", iconBg: "#000", iconColor: "#fff" },
];

export const RECEIVE_WITH = [
  { id: "eur_balance", name: "EUR Balance", icon: "€", iconBg: "#1a73e8" },
  { id: "usd_balance", name: "USD Balance", icon: "$", iconBg: "#2ecc71" },
  { id: "bank", name: "Bank Account", icon: "🏦", iconBg: "#2a2a2a" },
];

// convert amount of `from` currency to `to`
export function convert(amountStr, from, to) {
  const a = parseFloat(amountStr);
  if (!a || isNaN(a)) return "";
  const fromP = ASSETS[from]?.price ?? 0;
  const toP = ASSETS[to]?.price ?? 0;
  if (!fromP || !toP) return "";
  const result = (a * fromP) / toP;
  if (result === 0) return "0";
  // crypto gets more decimals
  const decimals = ASSETS[to]?.kind === "crypto" ? 8 : 2;
  // trim trailing zeros
  return result
    .toFixed(decimals)
    .replace(/\.?0+$/, (m) => (m.includes(".") ? "" : m));
}
