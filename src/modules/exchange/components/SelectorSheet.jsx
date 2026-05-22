import React, { useEffect } from "react";

const SelectorSheet = ({ open, title, items, selectedId, onSelect, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#0d0d0d",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: "8px 0 24px",
          maxHeight: "70vh",
          overflowY: "auto",
          animation: "slideUp 0.25s ease",
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            background: "#3a3a3a",
            borderRadius: 2,
            margin: "8px auto 12px",
          }}
        />
        <div
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            padding: "8px 20px 14px",
          }}
        >
          {title}
        </div>
        {items.map((item) => {
          const isSelected = item.id === selectedId || item.symbol === selectedId;
          return (
            <button
              key={item.id || item.symbol}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              style={{
                width: "100%",
                background: isSelected ? "#1a1a1a" : "transparent",
                border: "none",
                color: "#fff",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: item.iconBg,
                  color: item.iconColor || "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div className="flex-grow-1">
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {item.symbol || item.name}
                </div>
                {item.symbol && item.name && (
                  <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                    {item.name}
                  </div>
                )}
              </div>
              {isSelected && (
                <span style={{ color: "#4ec9ff", fontSize: 14 }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectorSheet;
