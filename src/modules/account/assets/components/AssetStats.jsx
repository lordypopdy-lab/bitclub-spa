import React from "react";

const AssetStats = ({ stats = [] }) => (
  <div style={{ display: "flex", padding: "8px 16px 4px", gap: 24 }}>
    {stats.map(({ label, value, sub }) => (
      <div key={label} style={{ flex: 1 }}>
        <div
          style={{
            color: "#7d828a",
            fontSize: 13,
            borderBottom: "1px dashed #4a4f57",
            display: "inline-block",
            paddingBottom: 1,
          }}
        >
          {label}
        </div>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginTop: 4 }}>{value}</div>
        {sub && <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>{sub}</div>}
      </div>
    ))}
  </div>
);

export default AssetStats;
