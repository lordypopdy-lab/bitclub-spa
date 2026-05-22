import React from "react";

const AssetCard = ({ coin, price, gainsLabel = "3Y gains", gains, ctaLabel = "Buy", note, onClick }) => (
  <div
    style={{
      background: "linear-gradient(180deg,#101216 0%,#0a0c10 100%)",
      border: "1px solid #1c1f23",
      borderRadius: 14,
      padding: 14,
      minWidth: 150,
      flex: "0 0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: coin.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {coin.symbol[0]}
      </div>
      <div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{coin.symbol}</div>
        <div style={{ color: "#7d828a", fontSize: 12 }}>{price}</div>
      </div>
    </div>
    {note ? (
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{note}</div>
    ) : (
      <div>
        <div style={{ color: "#7d828a", fontSize: 12 }}>{gainsLabel}</div>
        <div style={{ color: "#3ecf8e", fontWeight: 700, fontSize: 16, marginTop: 2 }}>{gains}</div>
      </div>
    )}
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "1px solid #2a2e35",
        color: "#fff",
        borderRadius: 8,
        padding: "8px 0",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {ctaLabel}
    </button>
  </div>
);

export default AssetCard;
