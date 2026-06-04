import React from "react";
import { COIN_COLORS } from "../data/marketMockData";

const CoinAvatar = ({ symbol, size = 32 }) => {
  const bg = COIN_COLORS[symbol] || "#374151";
  const letter = (symbol || "?")[0];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.45,
        flexShrink: 0,
        boxShadow: "0 0 0 1px rgba(255,255,255,.06)",
      }}
    >
      {letter}
    </div>
  );
};

export default CoinAvatar;
