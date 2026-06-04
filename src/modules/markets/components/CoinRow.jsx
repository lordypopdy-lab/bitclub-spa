import React from "react";

const fmtUsd = (n) =>
  n == null ? "--" : n >= 1 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(4);

const CoinRow = ({ row }) => {
  const positive = (row.price_change_percentage_24h ?? 0) >= 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid #1c1f23",
      }}
    >
      <img
        src={row.image}
        alt={row.symbol}
        width={36}
        height={36}
        style={{ borderRadius: "50%", marginRight: 12, background: "#222" }}
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
      <div style={{ flex: 1, color: "#fff", fontWeight: 600, fontSize: 16 }}>
        {row.symbol?.toUpperCase()}USDT
      </div>
      <div style={{ textAlign: "right", marginRight: 12 }}>
        <div style={{ color: "#fff", fontWeight: 600 }}>{fmtUsd(row.current_price)}</div>
        <div style={{ color: "#8a8f99", fontSize: 12 }}>
          €{fmtUsd((row.current_price ?? 0) * 0.85)}
        </div>
      </div>
      <div
        style={{
          background: positive ? "#00d1c1" : "#ff5577",
          color: "#001016",
          fontWeight: 700,
          padding: "6px 12px",
          borderRadius: 6,
          fontSize: 13,
          minWidth: 70,
          textAlign: "center",
        }}
      >
        {positive ? "+" : ""}
        {(row.price_change_percentage_24h ?? 0).toFixed(2)}%
      </div>
    </div>
  );
};

export default CoinRow;
