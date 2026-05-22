import React from "react";

const AssetActionButtons = ({ actions = [] }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      padding: "16px",
      flexWrap: "nowrap",
      overflowX: "auto",
      scrollbarWidth: "none",
    }}
  >
    {actions.map(({ label, Icon, onClick }) => (
      <button
        key={label}
        onClick={onClick}
        style={{
          flex: "1 1 0",
          minWidth: 70,
          background: "transparent",
          border: "none",
          padding: 0,
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: "#16181c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 0 1px #1f2227",
            transition: "transform 0.15s ease",
          }}
        >
          <Icon size={24} color="#fff" />
        </div>
        <span style={{ fontSize: 12, color: "#cfd2d6" }}>{label}</span>
      </button>
    ))}
  </div>
);

export default AssetActionButtons;
