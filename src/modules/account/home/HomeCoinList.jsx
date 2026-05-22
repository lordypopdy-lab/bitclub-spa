import { useEffect, useState } from "react";
import CoinRow from "./components/CoinRow.jsx";
import { COIN_DATA } from "./data/mockData.js";
import { FiArrowRight } from "react-icons/fi";

const layoutForTab = (tab) => (tab === "Favorites" || tab === "Spot" || tab === "Futures" ? "pair" : "default");

const headerForTab = (tab) => {
  if (tab === "Favorites") return ["Coin/Volume", "Price", "Change"];
  if (tab === "Spot") return ["Name", "24h volume", "Change/Price"];
  if (tab === "Futures") return ["Name", "Price", "Change"];
  if (tab === "Stocks") return ["Coin", "Price", "Change"];
  if (tab === "TradFi") return ["Instrument", "Last price", "Change"];
  if (tab === "Onchain") return ["Coin/Onchain volume", "Price/MC", "Change"];
  return ["Name", "Price", "Change"];
};

const HomeCoinList = ({ tab }) => {
  const [coins, setCoins] = useState(COIN_DATA[tab] || []);
  useEffect(() => {
    setCoins(COIN_DATA[tab] || []);
  }, [tab]);
  useEffect(() => {
    const id = setInterval(() => {
      setCoins((prev) =>
        prev.map((c) => {
          const drift = (Math.random() - 0.5) * 0.002;
          return {
            ...c,
            price: Math.max(0.0000001, c.price * (1 + drift)),
            change: c.change + (Math.random() - 0.5) * 0.05,
          };
        })
      );
    }, 2500);
    return () => clearInterval(id);
  }, [tab]);

  const [h1, h2, h3] = headerForTab(tab);
  const layout = layoutForTab(tab);

  return (
    <div key={tab} style={{ animation: "fadeIn 0.25s ease" }}>
      <div
        style={{
          display: "flex",
          padding: "8px 16px 4px",
          color: "#7d828a",
          fontSize: 12,
        }}
      >
        <div style={{ flex: 1 }}>{h1}</div>
        <div style={{ width: 110, textAlign: "right" }}>{h2}</div>
        <div style={{ width: 86, textAlign: "right" }}>{h3}</div>
      </div>
      {coins.map((c) => (
        <CoinRow key={c.symbol + c.name} coin={c} layout={layout} />
      ))}
      <div
        style={{
          textAlign: "center",
          color: "#7d828a",
          padding: "16px",
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        View more <FiArrowRight />
      </div>
    </div>
  );
};

export default HomeCoinList;
