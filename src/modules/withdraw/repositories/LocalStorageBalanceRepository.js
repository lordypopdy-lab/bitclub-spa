// Implements IBalanceRepository on top of localStorage.
// Future: MongoBalanceRepository — UI/services unchanged.
import { eventBus, EVENTS } from "../services/eventBus.js";

const KEY = "bitclub_balances_v1";

const seed = () => ({
  GOATS: { available: 451.6, frozen: 0 },
  BTC: { available: 0.0124, frozen: 0 },
  ETH: { available: 0.85, frozen: 0 },
  USDT: { available: 1250.75, frozen: 50 },
  BNB: { available: 2.3, frozen: 0 },
  SOL: { available: 12.5, frozen: 0 },
  XRP: { available: 850, frozen: 0 },
  DOGE: { available: 4200, frozen: 0 },
  ADA: { available: 320, frozen: 0 },
  EUR: { available: 125.5, frozen: 0 },
  USD: { available: 80.25, frozen: 0 },
  GBP: { available: 0, frozen: 0 },
});

let mem = null;
const load = () => {
  if (typeof window === "undefined") return seed();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch (e) {}
  return seed();
};
const persist = (s) => { try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
const ensure = () => { if (!mem) mem = load(); return mem; };

export const LocalStorageBalanceRepository = {
  getAll() { return { ...ensure() }; },
  get(symbol) {
    const s = ensure();
    return s[symbol] || { available: 0, frozen: 0 };
  },
  freeze(symbol, amount) {
    const s = ensure();
    const cur = s[symbol] || { available: 0, frozen: 0 };
    if (cur.available < amount) throw new Error("Insufficient balance");
    s[symbol] = { available: cur.available - amount, frozen: cur.frozen + amount };
    persist(s);
    eventBus.emit(EVENTS.BALANCE_UPDATED, { symbol, ...s[symbol] });
  },
  unfreeze(symbol, amount) {
    const s = ensure();
    const cur = s[symbol] || { available: 0, frozen: 0 };
    s[symbol] = { available: cur.available + amount, frozen: Math.max(0, cur.frozen - amount) };
    persist(s);
    eventBus.emit(EVENTS.BALANCE_UPDATED, { symbol, ...s[symbol] });
  },
  debitFrozen(symbol, amount) {
    const s = ensure();
    const cur = s[symbol] || { available: 0, frozen: 0 };
    s[symbol] = { available: cur.available, frozen: Math.max(0, cur.frozen - amount) };
    persist(s);
    eventBus.emit(EVENTS.BALANCE_UPDATED, { symbol, ...s[symbol] });
  },
  credit(symbol, amount) {
    const s = ensure();
    const cur = s[symbol] || { available: 0, frozen: 0 };
    s[symbol] = { available: cur.available + amount, frozen: cur.frozen };
    persist(s);
    eventBus.emit(EVENTS.BALANCE_UPDATED, { symbol, ...s[symbol] });
  },
  debit(symbol, amount) {
    const s = ensure();
    const cur = s[symbol] || { available: 0, frozen: 0 };
    if (cur.available < amount) throw new Error("Insufficient balance");
    s[symbol] = { available: cur.available - amount, frozen: cur.frozen };
    persist(s);
    eventBus.emit(EVENTS.BALANCE_UPDATED, { symbol, ...s[symbol] });
  },
  reset() { mem = seed(); persist(mem); eventBus.emit(EVENTS.BALANCE_UPDATED, { reset: true }); },
};
