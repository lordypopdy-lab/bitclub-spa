import React, { useState } from "react";
import { FiEye, FiEyeOff, FiClock } from "react-icons/fi";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const AssetHeader = ({
  label = "Total assets",
  amount = "0.00",
  symbol = "BTC",
  estimate = "≈ 0.00 EUR",
  showPnl = true,
  pnl = "0.00 EUR",
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ padding: "18px 16px 8px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#7d828a", fontSize: 14 }}>
          <span style={{ borderBottom: "1px dashed #4a4f57", paddingBottom: 1 }}>{label}</span>
          <button
            onClick={() => setVisible((v) => !v)}
            style={{ background: "transparent", border: "none", color: "#7d828a", padding: 0, cursor: "pointer" }}
          >
            {visible ? <FiEye size={16} /> : <FiEyeOff size={16} />}
          </button>
        </div>
        <FiClock size={20} color="#cfd2d6" />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
        <span style={{ color: "#fff", fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>
          {visible ? amount : "****"}
        </span>
        <span style={{ color: "#cfd2d6", fontSize: 15, fontWeight: 600 }}>{symbol}</span>
        <BsChevronDown color="#cfd2d6" size={14} />
      </div>

      <div style={{ color: "#7d828a", fontSize: 13, marginTop: 4 }}>
        {visible ? estimate : "≈ ****"}
      </div>

      {showPnl && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
            color: "#cfd2d6",
            fontSize: 14,
          }}
        >
          <span style={{ borderBottom: "1px dashed #4a4f57", paddingBottom: 1 }}>Today's PnL</span>
          <span style={{ color: "#cfd2d6" }}>{visible ? pnl : "****"}</span>
          <BsChevronRight size={14} color="#7d828a" />
        </div>
      )}
    </div>
  );
};

export default AssetHeader;
