import { useEffect, useState, useCallback } from "react";
import { datasetByKey } from "../data/mockData.js";

const STORAGE_KEY = "bitclub_notifications_state_v1";

const loadInitial = () => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Build initial from datasets
  const state = {};
  Object.keys(datasetByKey).forEach((k) => {
    state[k] = {
      items: datasetByKey[k].map((n) => ({ ...n })),
    };
  });
  return state;
};

let memoryState = null;
const listeners = new Set();

const persist = (state) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
};

const setState = (updater) => {
  const next = typeof updater === "function" ? updater(memoryState) : updater;
  memoryState = next;
  persist(next);
  listeners.forEach((l) => l(next));
};

export const useNotificationsStore = () => {
  if (!memoryState) memoryState = loadInitial();
  const [state, setLocal] = useState(memoryState);

  useEffect(() => {
    const l = (s) => setLocal(s);
    listeners.add(l);
    return () => listeners.delete(l);
  }, []);

  const markRead = useCallback((category, id) => {
    setState((s) => ({
      ...s,
      [category]: {
        items: s[category].items.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      },
    }));
  }, []);

  const markAllRead = useCallback((category) => {
    setState((s) => ({
      ...s,
      [category]: {
        items: s[category].items.map((n) => ({ ...n, read: true })),
      },
    }));
  }, []);

  const clearCategory = useCallback((category) => {
    setState((s) => ({ ...s, [category]: { items: [] } }));
  }, []);

  const clearAll = useCallback(() => {
    const next = {};
    Object.keys(state).forEach((k) => (next[k] = { items: [] }));
    setState(next);
  }, [state]);

  const unreadCount = (category) =>
    (state[category]?.items || []).filter((n) => !n.read).length;

  const totalUnread = Object.keys(state).reduce(
    (acc, k) => acc + (state[k]?.items || []).filter((n) => !n.read).length,
    0
  );

  return {
    state,
    markRead,
    markAllRead,
    clearCategory,
    clearAll,
    unreadCount,
    totalUnread,
  };
};
