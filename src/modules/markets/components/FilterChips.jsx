import React from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterChips = ({ items, active, onChange, trailing }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      overflowX: "auto",
      padding: "8px 0 12px",
      scrollbarWidth: "none",
    }}
  >
    {items.map((t) => {
      const isActive = t === active;
      return (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: isActive ? "#1a1d22" : "transparent",
            border: isActive ? "1px solid #2a2e34" : "1px solid transparent",
            color: isActive ? "#fff" : "#8a8f99",
            fontSize: 14,
            fontWeight: isActive ? 700 : 500,
            padding: "6px 12px",
            borderRadius: 8,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {t}
        </button>
      );
    })}
    {trailing && (
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#cfd2d8",
          fontSize: 14,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {trailing} <FiChevronDown size={14} />
      </div>
    )}
  </div>
);

export default FilterChips;
