import React from "react";

const AssetTabs = ({ tabs, active, onChange }) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      overflowX: "auto",
      padding: "14px 16px 12px",
      borderBottom: "1px solid #1c1f23",
      background: "#000",
      position: "sticky",
      top: 0,
      zIndex: 10,
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
            fontWeight: isActive ? 700 : 500,
            fontSize: isActive ? 20 : 16,
            padding: 0,
            whiteSpace: "nowrap",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
          }}
        >
          {t}
          {isActive && (
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -14,
                height: 3,
                background: "#fff",
                borderRadius: 2,
              }}
            />
          )}
        </button>
      );
    })}
  </div>
);

export default AssetTabs;
