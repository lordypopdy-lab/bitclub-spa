import React from "react";
import Sparkline from "./Sparkline";

const fmt = (n) => {
  if (n == null) return "--";
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  return n.toFixed(5);
};

const OverviewCard = ({ symbol, price, change, spark }) => {
  const positive = change >= 0;
  const color = positive ? "#00d1c1" : "#ff5577";
  return (
    <div
      style={{
        background: "linear-gradient(160deg,#15171a 0%,#0f1114 100%)",
        border: "1px solid #1c1f23",
        borderRadius: 14,
        padding: 12,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ color: "#8a8f99", fontSize: 13, marginBottom: 4 }}>
          {symbol}
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {fmt(price)}
        </div>
        <div style={{ color, fontSize: 12, fontWeight: 600, marginTop: 2 }}>
          {positive ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>
      <div style={{ marginTop: 6 }}>
        <Sparkline
          points={spark}
          color={color}
          width={80}
          height={30}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};

export default OverviewCard;
