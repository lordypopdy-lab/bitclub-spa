import React from "react";
import { FiChevronDown } from "react-icons/fi";

const TradeToggle = ({ tab, onChange }) => {
  const wrap = {
    background: "#1a1a1a",
    borderRadius: 10,
    padding: 4,
    display: "inline-flex",
  };
  const btn = (active) => ({
    background: active ? "#2a2a2a" : "transparent",
    color: active ? "#fff" : "#9a9a9a",
    border: "none",
    padding: "6px 18px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s ease",
    cursor: "pointer",
  });

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div style={wrap}>
        <button style={btn(tab === "buy")} onClick={() => onChange("buy")}>
          Buy
        </button>
        <button style={btn(tab === "sell")} onClick={() => onChange("sell")}>
          Sell
        </button>
      </div>
      <button
        className="d-flex align-items-center"
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: 14,
          gap: 4,
          cursor: "pointer",
        }}
      >
        One-time {tab}
        <FiChevronDown size={16} />
      </button>
    </div>
  );
};

export default TradeToggle;
