import { useEffect, useState } from "react";

const KEY = "bitclub.search.state.v1";

const defaults = {
  query: "",
  category: "Spot",
  history: [], // strings
};

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
};

export default function useSearchMemory() {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const setQuery = (q) => setState((s) => ({ ...s, query: q }));
  const setCategory = (c) => setState((s) => ({ ...s, category: c }));
  const addHistory = (q) => {
    const v = (q || "").trim();
    if (!v) return;
    setState((s) => ({
      ...s,
      history: [v, ...s.history.filter((x) => x.toLowerCase() !== v.toLowerCase())].slice(0, 12),
    }));
  };
  const removeHistory = (q) =>
    setState((s) => ({ ...s, history: s.history.filter((x) => x !== q) }));
  const clearHistory = () => setState((s) => ({ ...s, history: [] }));

  return { ...state, setQuery, setCategory, addHistory, removeHistory, clearHistory };
}
