// Implements IWithdrawalRepository on top of localStorage.
import { eventBus, EVENTS } from "../services/eventBus.js";

const KEY = "bitclub_withdrawals_v1";
const DAILY_KEY = "bitclub_withdrawals_daily_v1";

let mem = null;
const load = () => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
};
const persist = (s) => { try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
const ensure = () => { if (!mem) mem = load(); return mem; };

const newId = () => "W" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

export const LocalStorageWithdrawalRepository = {
  list() { return [...ensure()]; },
  byId(id) { return ensure().find((t) => t.id === id) || null; },

  create(tx) {
    const record = {
      id: newId(),
      status: "pending",
      createdAt: Date.now(),
      completedAt: null,
      ...tx,
    };
    mem = [record, ...ensure()];
    persist(mem);
    eventBus.emit(EVENTS.WITHDRAWAL_CREATED, record);
    eventBus.emit(EVENTS.WITHDRAWAL_PENDING, record);
    return record;
  },

  updateStatus(id, status) {
    const list = ensure();
    const i = list.findIndex((t) => t.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], status, completedAt: status === "completed" || status === "rejected" ? Date.now() : list[i].completedAt };
    mem = list;
    persist(mem);
    const evt = status === "completed" ? EVENTS.WITHDRAWAL_COMPLETED
      : status === "rejected" ? EVENTS.WITHDRAWAL_REJECTED
      : status === "approved" ? EVENTS.WITHDRAWAL_APPROVED
      : EVENTS.WITHDRAWAL_PENDING;
    eventBus.emit(evt, list[i]);
    return list[i];
  },

  dailyTotalUsd() {
    const since = Date.now() - 24 * 3600 * 1000;
    return ensure()
      .filter((t) => t.createdAt >= since && t.status !== "rejected" && t.status !== "cancelled")
      .reduce((s, t) => s + (t.usdValue || 0), 0);
  },

  reset() { mem = []; persist(mem); try { window.localStorage.removeItem(DAILY_KEY); } catch (e) {} },
};
