import React, { useState } from "react";
import Sheet from "./Sheet.jsx";
import { FiGift } from "react-icons/fi";
import { Link } from "react-router-dom";

const MysteryBoxSheet = ({ open, onClose, onOpen }) => {
  const [reward, setReward] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const handleOpen = () => {
    setSpinning(true);
    setTimeout(() => {
      const r = onOpen();
      setReward(r);
      setSpinning(false);
    }, 900);
  };

  const close = () => {
    setReward(null);
    onClose();
  };

  return (
    <Sheet open={open} onClose={close} title="Mystery Box">
      <div style={{ textAlign: "center", padding: "20px 0 8px" }}>
        <div
          style={{
            width: 130,
            height: 130,
            margin: "0 auto",
            borderRadius: 24,
            background:
              "radial-gradient(circle at 30% 20%, rgba(34,193,195,0.35), rgba(34,193,195,0.05) 60%, transparent 80%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #22c1c3",
            boxShadow: "0 0 30px rgba(34,193,195,0.35)",
            animation: spinning
              ? "rwPop 0.9s ease infinite"
              : "rwPop 0.5s ease",
          }}
        >
          <FiGift size={60} color="#22c1c3" />
        </div>
        {reward ? (
          <div style={{ marginTop: 18 }}>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
              {reward.label}
            </div>
            <div
              style={{
                color: "#9aa0a8",
                fontSize: 13,
                marginTop: 6,
                textTransform: "capitalize",
              }}
            >
              {reward.rarity} reward
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 18, color: "#9aa0a8", fontSize: 13 }}>
            Open the box to reveal your reward
          </div>
        )}
      </div>
      <Link
        onClick={reward ? close : handleOpen}
        disabled={spinning}
        style={{
          marginTop: 16,
          width: "100%",
          background: "#fff",
          color: "#0a0c0f",
          border: "none",
          borderRadius: 12,
          padding: 14,
          fontWeight: 700,
          fontSize: 14,
          cursor: spinning ? "default" : "pointer",
          opacity: spinning ? 0.6 : 1,
        }}
      >
        {reward
          ? "Claim & close"
          : spinning
            ? "Opening..."
            : "Open Mystery Box"}
      </Link>
    </Sheet>
  );
};

export default MysteryBoxSheet;
