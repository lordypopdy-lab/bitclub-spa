// Minimal notification bridge. Pushes into existing BITCLUB notification store key if present.
import { eventBus, EVENTS } from "../services/eventBus.js";

const KEY = "bitclub_notifications_v1";

const load = () => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
};
const persist = (s) => { try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };

export const LocalStorageNotificationRepository = {
  push({ title, body, category = "system-messages" }) {
    const list = load();
    const n = {
      id: "N" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title, body, category, read: false, ts: Date.now(),
    };
    list.unshift(n);
    persist(list.slice(0, 100));
    eventBus.emit(EVENTS.NOTIFICATION_CREATED, n);
    return n;
  },
};
