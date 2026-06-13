import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

const ReferralFab = ({ to = "/rewards" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`${to}#referral`)}
      style={{
        position: "fixed",
        right: 14,
        bottom: 100,
        width: 64,
        height: 64,
        borderRadius: 16,
        background: "linear-gradient(180deg, #1a4d4f, #0a2628)",
        border: "1px solid #22c1c3",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.5), 0 0 18px rgba(34,193,195,0.3)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        zIndex: 90,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          right: 4,
          background: "#ec4899",
          borderRadius: 999,
          padding: "1px 6px",
          fontSize: 9,
          fontWeight: 800,
        }}
      >
        25%
      </div>

      <FiUserPlus size={20} />

      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          marginTop: 2,
        }}
      >
        Referral
      </span>
    </button>
  );
};

export default ReferralFab;