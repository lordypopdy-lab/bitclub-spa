import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import Sheet from "./Sheet.jsx";
import { getAsset } from "../data/assets.js";

const NetworkPickerSheet = ({ open, onClose, onSelect, symbol, selected }) => {
  const a = getAsset(symbol);
  return (
    <Sheet open={open} onClose={onClose} title="Choose network">
      <div style={{ margin: "0 16px 14px", padding: 12, background: "#15181d", borderRadius: 12, display: "flex", gap: 10, color: "#cfd2d6", fontSize: 13 }}>
        <FiAlertCircle size={18} color="#fcd9a0" style={{ flexShrink: 0, marginTop: 2 }} />
        Ensure the network you select matches the receiving platform, or you may lose your assets.
      </div>
      <div style={{ padding: "0 16px 8px" }}>
        {(a?.networks || []).map((n) => {
          const active = selected === n.id;
          return (
            <button key={n.id} onClick={() => { onSelect(n.id); onClose(); }}
              style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", textAlign: "left", padding: 14, marginBottom: 10, borderRadius: 12,
                background: "#0a0c0f", border: active ? "1.5px solid #22c1c3" : "1px solid #1c1f23", color: "#fff", cursor: "pointer",
                wordBreak: "break-word", overflowWrap: "break-word",
                boxShadow: active ? "0 0 18px rgba(34,193,195,0.25)" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 15, wordBreak: "break-word" }}>{n.label}</div>
              <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 4, wordBreak: "break-word" }}>Fee: {n.fee} {symbol} · Min {n.min} · Crediting {n.eta}</div>
            </button>
          );
        })}
      </div>
    </Sheet>
  );
};

export default NetworkPickerSheet;
