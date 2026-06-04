import { useEffect, useRef, useState } from "react";
import { COIN_IDS, fetchMarkets, fallbackMarkets } from "../services/coingecko";

export default function useMarkets(symbols, intervalMs = 20000) {
  const ids = symbols.map((s) => COIN_IDS[s]).filter(Boolean);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const rows = await fetchMarkets(ids);
        if (!cancelled) {
          setData(rows);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setData((prev) => (prev.length ? prev : fallbackMarkets()));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    timer.current = setInterval(load, intervalMs);
    return () => {
      cancelled = true;
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols.join(","), intervalMs]);

  return { data, loading, error };
}
