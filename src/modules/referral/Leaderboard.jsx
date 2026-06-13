import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReferralHeader from "./components/ReferralHeader.jsx";
import { useReferral } from "./hooks/useReferral.js";

const TABS = ["Weekly", "Monthly", "All-Time"];

const Leaderboard = () => {
  const r = useReferral();
  const [tab, setTab] = useState(2);
  // synthesize variation per tab
  const data = r.state.leaderboard.map((row, i) => ({
    ...row,
    referrals:
      tab === 0
        ? Math.floor(row.referrals * 0.08)
        : tab === 1
          ? Math.floor(row.referrals * 0.32)
          : row.referrals,
    volume:
      tab === 0
        ? Math.floor(row.volume * 0.08)
        : tab === 1
          ? Math.floor(row.volume * 0.32)
          : row.volume,
    rewards:
      tab === 0
        ? Math.floor(row.rewards * 0.08)
        : tab === 1
          ? Math.floor(row.rewards * 0.32)
          : row.rewards,
  }));

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
        title="Leaderboard"
        fallback="/referral"
        onMore={() => {}}
      />
      <div style={{ padding: "0 16px" }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>
          Top Inviters
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
          Updated in real time.
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "16px 16px 0" }}>
        {TABS.map((t, i) => (
          <Link
            key={t}
            onClick={() => setTab(i)}
            style={{
              flex: 1,
              background: tab === i ? "#22c1c3" : "#15181d",
              color: tab === i ? "#0a0c0f" : "#cfd2d6",
              border: "none",
              borderRadius: 10,
              padding: "10px 0",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {t}
          </Link>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "24px 16px",
          gap: 8,
        }}
      >
        {[1, 0, 2].map((idx) => {
          const item = data[idx];
          const ranks = {
            0: { c: "#fcd9a0", h: 90 },
            1: { c: "#cfd2d6", h: 75 },
            2: { c: "#cd7f32", h: 60 },
          };
          return (
            <div key={idx} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: `linear-gradient(135deg,${ranks[idx].c},#1a1206)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0c0f",
                  fontWeight: 800,
                  fontSize: 22,
                }}
              >
                {item.name[0]}
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 6,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </div>
              <div style={{ color: ranks[idx].c, fontSize: 11, marginTop: 2 }}>
                #{item.rank}
              </div>
              <div
                style={{
                  marginTop: 8,
                  height: ranks[idx].h,
                  background: `linear-gradient(180deg,${ranks[idx].c}33,transparent)`,
                  borderRadius: 8,
                  border: `1px solid ${ranks[idx].c}55`,
                }}
              />
              <div
                style={{
                  color: "#22c1c3",
                  fontSize: 12,
                  fontWeight: 800,
                  marginTop: 6,
                }}
              >
                ${item.rewards.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            color: "#7d828a",
            fontSize: 11,
            padding: "8px 0",
            borderBottom: "1px solid #1c1f23",
          }}
        >
          <div style={{ width: 30 }}>#</div>
          <div style={{ flex: 1 }}>Inviter</div>
          <div style={{ width: 70, textAlign: "right" }}>Refs</div>
          <div style={{ width: 90, textAlign: "right" }}>Rewards</div>
        </div>
        {data.slice(3).map((row, i) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #1c1f23",
            }}
          >
            <div style={{ width: 30, color: "#9aa0a8", fontWeight: 700 }}>
              {row.rank}
            </div>
            <div
              style={{ flex: 1, color: "#fff", fontSize: 13, fontWeight: 600 }}
            >
              {row.name}
            </div>
            <div
              style={{
                width: 70,
                textAlign: "right",
                color: "#cfd2d6",
                fontSize: 13,
              }}
            >
              {row.referrals}
            </div>
            <div
              style={{
                width: 90,
                textAlign: "right",
                color: "#22c1c3",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ${row.rewards.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
