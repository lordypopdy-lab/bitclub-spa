import React from "react";

const AssetCoinItem = ({ coin }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "16px 16px",
      borderBottom: "1px solid #14171b",
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: coin.color || "#2a2e35",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        marginRight: 12,
        flexShrink: 0,
      }}
    >
      {coin.symbol[0]}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{coin.symbol}</div>
      <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>{coin.name}</div>
      {coin.extra && (
        <div style={{ color: "#7d828a", fontSize: 12, marginTop: 6 }}>{coin.extra}</div>
      )}
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{coin.balance}</div>
      <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>≈ {coin.eur} EUR</div>
      {coin.pnl && (
        <div style={{ color: "#fff", fontSize: 13, marginTop: 6 }}>{coin.pnl}</div>
      )}
    </div>
  </div>
);

export default AssetCoinItem;
