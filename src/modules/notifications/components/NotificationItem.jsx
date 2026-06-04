import React from "react";
import CategoryIcon from "./CategoryIcon.jsx";

const NotificationItem = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        padding: "16px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
        animation: "notifFadeIn 0.3s ease",
        textAlign: "left",
      }}
      onMouseDown={(e) => (e.currentTarget.style.background = "#0c0d10")}
      onMouseUp={(e) => (e.currentTarget.style.background = "transparent")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <CategoryIcon name={category.icon} color={category.iconColor} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 15.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {category.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: 4,
          }}
        >
          <div
            style={{
              color: "#7d828a",
              fontSize: 13.5,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {category.preview}
          </div>
          <div style={{ color: "#7d828a", fontSize: 12.5, flexShrink: 0 }}>
            {category.date}
          </div>
        </div>
      </div>
      {category.unread > 0 && (
        <span
          style={{
            position: "absolute",
            marginLeft: 30,
            marginTop: 2,
            minWidth: 16,
            height: 16,
            borderRadius: 999,
            background: "#ef4444",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
          }}
        >
          {category.unread > 99 ? "99+" : category.unread}
        </span>
      )}
    </button>
  );
};

export default NotificationItem;
