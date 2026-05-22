import React, { useEffect, useState } from "react";
import MarketCard from "./components/MarketCard.jsx";
import { MARKET_TICKERS } from "./data/mockData.js";

const HomeMarketCards = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 3500);
    return () => clearInterval(t);
  }, []);
  const cards = MARKET_TICKERS.map((m, i) => {
    const jitter = Math.sin(tick + i) * 0.02;
    return { ...m, price: m.price * (1 + jitter * 0.01), change: m.change + jitter, seed: i + tick };
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        padding: "8px 16px 4px",
      }}
    >
      {cards.map((c, i) => (
        <MarketCard key={c.symbol} {...c} seed={i + 1 + tick * 0.5} />
      ))}
    </div>
  );
};

export default HomeMarketCards;
