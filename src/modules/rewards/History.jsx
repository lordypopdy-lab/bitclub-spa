import React, { useState } from "react";
import { Link } from "react-router-dom";
import RewardsHeader from "./components/RewardsHeader.jsx";
import { useRewardsStore } from "./hooks/useRewardsStore.js";

const filters = [
  { k: "all", l: "All" },
  { k: "checkin", l: "Check-In" },
  { k: "task", l: "Earned" },
  { k: "redeem", l: "Redeemed" },
  { k: "referral", l: "Referral" },
  { k: "mystery", l: "Mystery" },
];

const History = () => {
  const store = useRewardsStore();
  const [tab, setTab] = useState("all");
  const items = store.state.history.filter(
    (h) => tab === "all" || h.type === tab,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 40,
      }}
    >
      <RewardsHeader fallback="/rewards" />
      <div style={{ padding: "0 16px" }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>
          Reward history
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
          All points earned and redeemed.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "16px 16px 6px",
          overflowX: "auto",
        }}
      >
        {filters.map(({ k, l }) => (
          <Link
            key={k}
            to={`/rewards/history?tab=${k}`}
            style={{
              background: tab === k ? "#22c1c3" : "#15181d",
              color: tab === k ? "#0a0c0f" : "#cfd2d6",
              border: "none",
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {l}
          </Link>
        ))}
      </div>
      <div style={{ padding: "8px 16px" }}>
        {items.length === 0 ? (
          <div
            style={{
              color: "#7d828a",
              textAlign: "center",
              padding: 60,
              fontSize: 13,
            }}
          >
            No history yet.
          </div>
        ) : (
          items.map((h) => (
            <div
              key={h.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #1c1f23",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                  {h.description}
                </div>
                <div style={{ color: "#7d828a", fontSize: 11, marginTop: 4 }}>
                  {new Date(h.ts).toLocaleString()}
                </div>
              </div>
              <div
                style={{
                  color: h.points >= 0 ? "#22c1c3" : "#ef4444",
                  fontSize: 15,
                  fontWeight: 800,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {h.points >= 0 ? "+" : ""}
                {h.points}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
