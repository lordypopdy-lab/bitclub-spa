import React from "react";
import Sheet from "./Sheet.jsx";
import { Link } from "react-router-dom";

const items = ["Copy link", "Refresh", "Close", "Switch network"];

const MoreMenuSheet = ({ open, onClose, onAction }) => {
  return (
    <Sheet open={open} onClose={onClose} showClose={false} padded={false}>
      <div style={{ padding: "0 4px 12px" }}>
        {items.map((label) => (
          <Link
            key={label}
            onClick={() => {
              onAction?.(label);
              onClose();
            }}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#fff",
              textAlign: "left",
              padding: "18px 22px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {label}
          </Link>
        ))}
        <div style={{ padding: "12px 16px 0" }}>
          <Link
            onClick={onClose}
            style={{
              width: "100%",
              background: "#15181d",
              border: "none",
              color: "#fff",
              borderRadius: 14,
              padding: "14px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </Sheet>
  );
};

export default MoreMenuSheet;
