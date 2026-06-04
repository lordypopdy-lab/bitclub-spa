import React from "react";
import { FaStar } from "react-icons/fa";
import CoinAvatar from "./CoinAvatar";

const fmtPrice = (n) => {
  if (n == null) return "--";
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(5);
  return n.toFixed(9);
};

const CoinListRow = ({ coin, starred, showLeverage }) => {
  const positive = coin.change >= 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 0",
        gap: 12,
      }}
    >
      <CoinAvatar symbol={coin.symbol} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>
            {coin.symbol}
          </span>
          <span style={{ color: "#7d828a", fontSize: 13 }}>/ {coin.quote}</span>
          {showLeverage && coin.leverage && (
            <span
              style={{
                fontSize: 10,
                color: "#cfd2d8",
                border: "1px solid #2a2e34",
                borderRadius: 4,
                padding: "1px 5px",
                fontWeight: 500,
              }}
            >
              {coin.leverage}x
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 2,
          }}
        >
          {starred && <FaStar size={10} color="#f7c948" />}
          <span style={{ color: "#7d828a", fontSize: 12 }}>{coin.volume}</span>
          {coin.badge && (
            <span style={{ color: "#22d3ee", fontSize: 12, fontWeight: 500 }}>
              {coin.badge}
            </span>
          )}
        </div>
      </div>
      <div style={{ textAlign: "right", marginRight: 10 }}>
        <div
          style={{
            color: "#fff",
            fontWeight: 500,
            fontSize: 14,
            fontVariantNumeric: "tabular-nums",
            transition: "color .4s",
          }}
        >
          {fmtPrice(coin.price)}
        </div>
        <div style={{ color: "#7d828a", fontSize: 12 }}>
          €{fmtPrice(coin.fiat)}
        </div>
      </div>
      <div
        style={{
          background: positive ? "#22d3c5" : "#ff5577",
          color: "#000",
          fontWeight: 500,
          padding: "8px 0",
          borderRadius: 8,
          fontSize: 13,
          width: 78,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {positive ? "+" : ""}
        {coin.change.toFixed(2)}%
      </div>
    </div>
  );
};

export default CoinListRow;
