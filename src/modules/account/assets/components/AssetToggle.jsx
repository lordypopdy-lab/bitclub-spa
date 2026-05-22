import React from "react";

const AssetToggle = ({ options, active, onChange }) => (
  <div style={{ display: "flex", gap: 6, padding: "6px 16px 12px" }}>
    {options.map((opt) => {
      const isActive = opt === active;
      return (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            background: isActive ? "#1a1d22" : "transparent",
            border: isActive ? "1px solid #2a2e35" : "1px solid transparent",
            color: isActive ? "#fff" : "#7d828a",
            padding: "6px 14px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {opt}
        </button>
      );
    })}
  </div>
);

export default AssetToggle;
