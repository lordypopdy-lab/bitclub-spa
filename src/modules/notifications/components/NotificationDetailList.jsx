import React from "react";
import CategoryIcon from "./CategoryIcon.jsx";
import { categories } from "../data/mockData.js";

const NotificationDetailList = ({ categoryKey, items, onItemClick }) => {
  const cat = categories.find((c) => c.key === categoryKey);
  const iconName = cat?.icon || "bell";
  const iconColor = cat?.iconColor || "#22c1c3";

  if (!items || items.length === 0) {
    return (
      <div
        style={{
          color: "#7d828a",
          textAlign: "center",
          padding: "80px 20px",
          fontSize: 14,
        }}
      >
        No notifications yet
      </div>
    );
  }

  return (
    <div>
      {items.map((n, idx) => (
        <div
          key={n.id}
          onClick={() => onItemClick && onItemClick(n)}
          style={{
            display: "flex",
            gap: 12,
            padding: "16px",
            alignItems: "flex-start",
            cursor: "pointer",
            animation: `notifFadeIn 0.3s ease ${idx * 0.03}s both`,
          }}
        >
          <div style={{ position: "relative" }}>
            <CategoryIcon name={iconName} color={iconColor} />
            {!n.read && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid #000",
                }}
              />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.35,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {n.title}
            </div>
            <div
              style={{
                color: "#9aa0a8",
                fontSize: 13.5,
                marginTop: 6,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {n.message}
            </div>
            <div style={{ color: "#5e636b", fontSize: 12.5, marginTop: 8 }}>
              {n.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationDetailList;
