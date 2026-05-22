import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";

const BalanceInfo = ({ label = "Available", amount = "0.00000000", symbol = "BTC" }) => {
  return (
    <div
      className="d-flex align-items-center"
      style={{
        color: "#9a9a9a",
        fontSize: 13,
        gap: 8,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span>
        {label}: <span style={{ color: "#dcdcdc" }}>{amount} {symbol}</span>
      </span>
      <BsArrowLeftRight size={14} color="#9a9a9a" style={{ transform: "rotate(90deg)" }} />
    </div>
  );
};

export default BalanceInfo;
