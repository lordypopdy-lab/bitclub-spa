import { useEffect, useState } from "react";

// Simulates live price drift across a list of coins
export default function useLivePrices(initial, intervalMs = 2500, intensity = 0.003) {
  const [list, setList] = useState(initial);

  useEffect(() => {
    setList(initial);
  }, [initial]);

  useEffect(() => {
    const t = setInterval(() => {
      setList((cur) =>
        cur.map((c) => {
          const drift = (Math.random() - 0.5) * 2 * intensity;
          const newPrice = c.price * (1 + drift);
          const newChange = +(c.change + drift * 100 * 0.4).toFixed(2);
          return {
            ...c,
            price: newPrice,
            change: newChange,
            fiat: newPrice * 0.858,
            _flash: drift >= 0 ? "up" : "down",
            _v: (c._v || 0) + 1,
          };
        })
      );
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs, intensity]);

  return list;
}
