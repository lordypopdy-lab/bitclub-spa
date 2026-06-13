import React from "react";
import { useNavigate } from "react-router-dom";

const ProgressFooter = ({ cta, onClaim }) => {
  const navigate = useNavigate();
  const handle = () => {
    if (cta.disabled) return;
    if (cta.claim) {
      const ok = onClaim?.();
      if (ok) setTimeout(() => navigate(cta.to), 600);
      return;
    }
    navigate(cta.to);
  };
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "12px 16px 18px",
        background: "linear-gradient(180deg, rgba(0,0,0,0), #000 40%)",
      }}
    >
      <button
        onClick={handle}
        disabled={cta.disabled}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 12,
          padding: "14px",
          fontWeight: 700,
          fontSize: 14,
          background: cta.disabled
            ? "#1c1f23"
            : cta.claim
              ? "linear-gradient(90deg,#fcd9a0,#22c1c3)"
              : "#fff",
          color: cta.disabled ? "#7d828a" : "#0a0c0f",
          cursor: cta.disabled ? "default" : "pointer",
          boxShadow: cta.disabled ? "none" : "0 8px 24px rgba(34,193,195,0.25)",
          transition: "transform 150ms",
        }}
      >
        {cta.label}
      </button>
    </div>
  );
};

export default ProgressFooter;
