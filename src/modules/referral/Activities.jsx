import React from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import { useReferral } from "./hooks/useReferral.js";
import { ACTIVITIES } from "./data/config.js";
import { Link } from "react-router-dom";

const Activities = () => {
  const r = useReferral();
  const referred = r.state.stats.registrations;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 40,
      }}
    >
      <ReferralHeader
        title="Referral Activities"
        fallback="/referral"
        onMore={() => {}}
      />
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ color: "#9aa0a8", fontSize: 13 }}>
          Earn rewards as you invite friends.
        </div>
      </div>
      <div
        style={{
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {ACTIVITIES.map((a) => {
          const pct = Math.min(100, (referred / a.target) * 100);
          const claimed = r.state.activities[a.id]?.claimed;
          const ready = referred >= a.target && !claimed;
          return (
            <div key={a.id} style={card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
                    {a.title}
                  </div>
                  <div
                    style={{
                      color: "#fcd9a0",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 700,
                    }}
                  >
                    +{a.points} Points
                  </div>
                </div>
                <Link
                  disabled={!ready && !claimed}
                  onClick={() => r.repo.claimActivity(a.id, a.points)}
                  style={{
                    background: claimed
                      ? "#15181d"
                      : ready
                        ? "#22c1c3"
                        : "#1c1f23",
                    color: claimed ? "#7d828a" : ready ? "#0a0c0f" : "#7d828a",
                    border: "none",
                    borderRadius: 999,
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: ready ? "pointer" : "default",
                  }}
                >
                  {claimed ? "Claimed" : ready ? "Claim" : "Go"}
                </Link>
              </div>
              <div
                style={{
                  marginTop: 12,
                  height: 4,
                  background: "#1c1f23",
                  borderRadius: 999,
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "linear-gradient(90deg,#22c1c3,#fcd9a0)",
                    borderRadius: 999,
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "right",
                  color: "#9aa0a8",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {Math.min(referred, a.target)}/{a.target}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const card = {
  background: "#0f1115",
  border: "1px solid #1c1f23",
  borderRadius: 14,
  padding: 16,
};

export default Activities;
