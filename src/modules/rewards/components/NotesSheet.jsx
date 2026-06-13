import React from "react";
import Sheet from "./Sheet.jsx";
import { Link } from "react-router-dom";

const NotesSheet = ({
  open,
  onClose,
  message = "Your point balance is too low to redeem this item. Keep going and earn more points!",
  onEarn,
}) => (
  <Sheet open={open} onClose={onClose} title="Notes">
    <div
      style={{
        color: "#cfd2d6",
        fontSize: 14,
        lineHeight: 1.55,
        padding: "4px 0 20px",
      }}
    >
      {message}
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      <Link
        onClick={onClose}
        style={{
          flex: 1,
          background: "#15181d",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Got it
      </Link>
      <Link
        onClick={() => {
          onEarn?.();
          onClose();
        }}
        style={{
          flex: 1,
          background: "#fff",
          color: "#0a0c0f",
          border: "none",
          borderRadius: 12,
          padding: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Earn points
      </Link>
    </div>
  </Sheet>
);

export default NotesSheet;
