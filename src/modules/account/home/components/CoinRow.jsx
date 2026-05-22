import React from "react";

const fmt = (n) => {
  if (n == null || n === 0) return "—";
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(8);
};

const CoinIcon = ({ symbol, color }) => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 12,
      flexShrink: 0,
    }}
  >
    {symbol.slice(0, 2)}
  </div>
);

const CoinRow = ({ coin, layout = "default" }) => {
  const up = coin.change >= 0;
  const badge = (
    <div
      style={{
        background: up ? "#22c1c3" : "#ff5e7e",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        padding: "6px 10px",
        borderRadius: 6,
        minWidth: 78,
        textAlign: "center",
      }}
    >
      {up ? "+" : ""}
      {coin.change.toFixed(2)}%
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        gap: 12,
        cursor: "pointer",
      }}
    >
      <CoinIcon symbol={coin.symbol} color={coin.color} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
          {coin.symbol}
          {layout === "pair" && <span style={{ color: "#7d828a", fontWeight: 500 }}> / {coin.name}</span>}
        </div>
        <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>
          {layout === "pair" ? coin.vol : coin.name}
        </div>
      </div>
      <div style={{ textAlign: "right", marginRight: 8 }}>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{fmt(coin.price)}</div>
        {coin.fiat ? (
          <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>€{fmt(coin.fiat)}</div>
        ) : coin.vol && layout !== "pair" ? (
          <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>{coin.vol}</div>
        ) : null}
      </div>
      {badge}
    </div>
  );
};

export default CoinRow;
