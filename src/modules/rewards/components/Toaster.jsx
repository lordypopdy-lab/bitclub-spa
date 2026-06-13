import React, { useEffect } from "react";

const Toaster = ({ notifs, onDismiss }) => {
  useEffect(() => {
    const timers = notifs.map((n) => setTimeout(() => onDismiss(n.id), 2600));
    return () => timers.forEach(clearTimeout);
  }, [notifs, onDismiss]);

  return (
    <div
      style={{
        position: "fixed",
        top: 70,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        zIndex: 300,
        pointerEvents: "none",
      }}
    >
      {notifs.map((n) => (
        <div
          key={n.id}
          style={{
            background: "rgba(15,17,21,0.95)",
            border: "1px solid #22c1c3",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.5), 0 0 14px rgba(34,193,195,0.25)",
            animation: "rwFadeIn 0.25s ease",
          }}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
