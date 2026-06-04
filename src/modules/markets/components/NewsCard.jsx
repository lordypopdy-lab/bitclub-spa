import React from "react";

const NewsCard = ({ title = "Bitget UEX Daily", body, tags = [] }) => (
  <div style={{ background: "#141618", borderRadius: 12, padding: 16, marginTop: 16 }}>
    <div style={{ color: "#8a8f99", fontSize: 13, marginBottom: 8 }}>{title}</div>
    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>{body}</div>
    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
      {tags.map((t) => (
        <span
          key={t.label}
          style={{
            border: "1px solid #2a2e34",
            borderRadius: 4,
            padding: "4px 8px",
            fontSize: 12,
            color: "#cfd2d8",
          }}
        >
          {t.label}{" "}
          <span style={{ color: t.change >= 0 ? "#00d1c1" : "#ff5577", marginLeft: 4 }}>
            {t.change >= 0 ? "+" : ""}
            {t.change.toFixed(2)}%
          </span>
        </span>
      ))}
    </div>
  </div>
);

export default NewsCard;
