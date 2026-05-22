import React from "react";
import { FiChevronRight } from "react-icons/fi";

const ActionCard = ({ title, subtitle, badge, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "18px 0",
      cursor: onClick ? "pointer" : "default",
    }}
  >
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>{title}</span>
        {badge && (
          <span
            style={{
              border: "1px solid #00d1c1",
              color: "#00d1c1",
              fontSize: 11,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {subtitle && <div style={{ color: "#7d828a", fontSize: 13, marginTop: 6 }}>{subtitle}</div>}
    </div>
    <FiChevronRight color="#7d828a" size={20} />
  </div>
);

export default ActionCard;
