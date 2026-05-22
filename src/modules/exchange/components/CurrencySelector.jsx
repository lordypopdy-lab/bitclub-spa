import React from "react";
import { FiChevronDown } from "react-icons/fi";

const CurrencySelector = ({
  icon,
  iconBg = "#f7931a",
  iconColor = "#fff",
  label,
  value,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="d-flex align-items-center w-100"
      style={{
        background: "transparent",
        border: "none",
        padding: "14px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        gap: 12,
        cursor: onClick ? "pointer" : "default",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
          fontWeight: 700,
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div className="flex-grow-1">
        <div style={{ color: "#9a9a9a", fontSize: 12, marginBottom: 2 }}>
          {label}
        </div>
        <div className="d-flex align-items-center" style={{ gap: 8 }}>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
            {value}
          </span>
          {badge && (
            <span
              style={{
                color: "#4ec9ff",
                fontSize: 11,
                background: "rgba(78,201,255,0.08)",
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid rgba(78,201,255,0.2)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
      </div>
      <FiChevronDown size={18} color="#9a9a9a" />
    </button>
  );
};

export default CurrencySelector;
