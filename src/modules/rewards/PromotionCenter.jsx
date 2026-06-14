import React from "react";
import RewardsHeader from "./components/RewardsHeader.jsx";
import RewardsBottomNav from "./components/RewardsBottomNav.jsx";
import ReferralFab from "./components/ReferralFab.jsx";
import { useRewardsStore } from "./hooks/useRewardsStore.js";

const promos = [
  {
    title: "Launchpool: stake BGB to farm",
    tag: "HOT",
    reward: "200,000 USDT",
  },
  { title: "Copy trading carnival", tag: "NEW", reward: "50,000 USDT" },
  { title: "Refer a friend, earn 50%", tag: "ELITE", reward: "Lifetime" },
  { title: "Catch the crude oil wave", tag: "HOT", reward: "50,000 USDT" },
];

const PromotionCenter = () => {
  const store = useRewardsStore();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 96,
      }}
    >
      <RewardsHeader />
      <div style={{ padding: "0 16px" }}>
        <div style={{ color: "#fff", fontSize: 21, fontWeight: 600 }}>
          Promotion Center
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
          Live campaigns and special events.
        </div>
      </div>
      <div
        style={{
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {promos.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #1c1f23",
              borderRadius: 14,
              padding: 16,
              background: "linear-gradient(135deg, #0e1417 0%, #0a0c0f 70%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  background: "#22c1c3",
                  color: "#0a0c0f",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                {p.tag}
              </span>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>
                {p.title}
              </span>
            </div>
            <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 8 }}>
              Prize pool: <b style={{ color: "#22c1c3" }}>{p.reward}</b>
            </div>
            <button
              style={{
                marginTop: 12,
                background: "#fff",
                color: "#0a0c0f",
                border: "none",
                borderRadius: 10,
                padding: "8px 13px",
                fontWeight: 600,
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>
      <ReferralFab />
      <RewardsBottomNav />
    </div>
  );
};

export default PromotionCenter;
