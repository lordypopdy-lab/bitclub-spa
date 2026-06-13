import React from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import { useReferral } from "./hooks/useReferral.js";

const Analytics = () => {
  const r = useReferral();
  const s = r.state.stats;
  const conv = s.clicks ? ((s.registrations / s.clicks) * 100).toFixed(1) : "0";
  const depConv = s.registrations
    ? ((s.depositCount / s.registrations) * 100).toFixed(1)
    : "0";
  const tradeConv = s.registrations
    ? (
        (r.state.invitees.filter((i) => i.trading).length / s.registrations) *
        100
      ).toFixed(1)
    : "0";

  // simple 14-day synthetic series
  const days = Array.from({ length: 14 }, (_, i) =>
    Math.floor(40 + Math.sin(i / 2) * 20 + i * 4 + Math.random() * 15),
  );
  const max = Math.max(...days);
  const totalCommission = r.state.commissions.transactions
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);

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
        title="Analytics"
        fallback="/referral"
        onMore={() => {}}
      />
      <div style={{ padding: "0 16px" }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>
          Referral Analytics
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          padding: "16px",
        }}
      >
        <Stat label="Clicks" value={s.clicks} />
        <Stat label="Sign-ups" value={s.registrations} />
        <Stat label="Conv. rate" value={`${conv}%`} accent />
        <Stat label="Deposit conv." value={`${depConv}%`} />
        <Stat label="Trading conv." value={`${tradeConv}%`} />
        <Stat
          label="Commission"
          value={`$${totalCommission.toFixed(0)}`}
          accent
        />
      </div>

      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            background: "#0f1115",
            border: "1px solid #1c1f23",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>
            Commission growth
          </div>
          <div style={{ color: "#7d828a", fontSize: 11 }}>Last 14 days</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 120,
              marginTop: 16,
            }}
          >
            {days.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${(v / max) * 100}%`,
                  background: "linear-gradient(180deg,#22c1c3,#0a3a3c)",
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <div
          style={{
            background: "#0f1115",
            border: "1px solid #1c1f23",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>
            Referral volume growth
          </div>
          <div style={{ color: "#7d828a", fontSize: 11 }}>Last 14 days</div>
          <svg
            viewBox="0 0 280 100"
            style={{ marginTop: 14, width: "100%", height: 120 }}
          >
            <polyline
              fill="none"
              stroke="#fcd9a0"
              strokeWidth="2"
              points={days
                .map(
                  (v, i) =>
                    `${(i / (days.length - 1)) * 280},${100 - (v / max) * 90}`,
                )
                .join(" ")}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, accent }) => (
  <div
    style={{
      background: "#15181d",
      border: "1px solid #1c1f23",
      borderRadius: 12,
      padding: 14,
    }}
  >
    <div style={{ color: "#9aa0a8", fontSize: 11 }}>{label}</div>
    <div
      style={{
        color: accent ? "#22c1c3" : "#fff",
        fontWeight: 800,
        fontSize: 16,
        marginTop: 6,
      }}
    >
      {value}
    </div>
  </div>
);

export default Analytics;
