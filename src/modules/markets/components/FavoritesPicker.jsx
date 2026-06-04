import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const FavoritesPicker = ({ pairs }) => {
  const [sel, setSel] = useState(() => new Set(pairs.map((p) => p)));
  const toggle = (p) => {
    const n = new Set(sel);
    n.has(p) ? n.delete(p) : n.add(p);
    setSel(n);
  };
  return (
    <div style={{ paddingBottom: 100 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: "16px 0",
        }}
      >
        {pairs.map((p) => {
          const on = sel.has(p);
          return (
            <button
              key={p}
              onClick={() => toggle(p)}
              style={{
                background: "#0f1114",
                border: "1px solid #1c1f23",
                borderRadius: 10,
                padding: "16px 14px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform .15s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>{p}</span>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: on ? "#fff" : "transparent",
                  border: on ? "none" : "1px solid #2a2e34",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {on && <FiCheck size={14} color="#000" />}
              </span>
            </button>
          );
        })}
      </div>
      <div
        style={{
          position: "fixed",
          left: 16,
          right: 16,
          bottom: 80,
          zIndex: 50,
        }}
      >
        <button
          style={{
            width: "100%",
            background: "#fff",
            color: "#000",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 12,
            padding: "16px 0",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,.5)",
          }}
        >
          Add to favorites
        </button>
      </div>
    </div>
  );
};

export default FavoritesPicker;
