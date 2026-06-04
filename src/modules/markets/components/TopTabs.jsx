import React from "react";

const TopTabs = ({ tabs, active, onChange }) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      overflowX: "auto",
      padding: "8px 0 14px",
      borderBottom: "1px solid #1c1f23",
      scrollbarWidth: "none",
    }}
  >
    {tabs.map((t) => {
      const isActive = t === active;
      return (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: "transparent",
            border: "none",
            color: isActive ? "#fff" : "#7d828a",
            fontWeight: isActive ? 500 : 400,
            fontSize: isActive ? 15 : 10,
            padding: 0,
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          {t}
        </button>
      );
    })}
  </div>
);

export default TopTabs;
