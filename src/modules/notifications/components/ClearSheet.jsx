import React from "react";

const ClearSheet = ({ open, onClose, onClearCurrent, onClearAll, currentLabel }) => {
  if (!open) return null;
  const btn = {
    width: "100%",
    background: "#15181d",
    border: "none",
    color: "#fff",
    padding: "16px",
    fontSize: 15,
    borderRadius: 12,
    marginBottom: 10,
    cursor: "pointer",
  };
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        animation: "notifFadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "#0a0b0d",
          padding: 16,
          paddingBottom: 28,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          animation: "notifSlideUp 0.25s ease",
        }}
      >
        {currentLabel && (
          <button style={btn} onClick={onClearCurrent}>
            Clear {currentLabel}
          </button>
        )}
        <button style={{ ...btn, color: "#ef4444" }} onClick={onClearAll}>
          Clear all notifications
        </button>
        <button
          style={{ ...btn, background: "transparent", marginBottom: 0 }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClearSheet;
