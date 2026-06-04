import React from "react";
import Sparkline from "./Sparkline";

const fmt = (n) => {
  if (n == null || isNaN(n)) return "--";
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  return n.toFixed(5);
};

const MarketCard = ({ symbol, price, change, points }) => {
  const positive = (change ?? 0) >= 0;
  const color = positive ? "#00d1c1" : "#ff5577";
  return (
    <div
      style={{
        background: "#141618",
        borderRadius: 12,
        padding: 14,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 130,
      }}
    >
      <div>
        <div style={{ color: "#8a8f99", fontSize: 13, marginBottom: 6 }}>{symbol}</div>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{fmt(price)}</div>
        <div style={{ color, fontSize: 13, marginTop: 2 }}>
          {positive ? "+" : ""}
          {(change ?? 0).toFixed(2)}%
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <Sparkline points={points} color={color} width={140} height={36} />
      </div>
    </div>
  );
};

export default MarketCard;
