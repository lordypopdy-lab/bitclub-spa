import React, { useState } from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import { useReferral } from "./hooks/useReferral.js";

const CommissionWallet = () => {
  const r = useReferral();
  const c = r.state.commissions;
  const [amt, setAmt] = useState("");

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
        title="Commissions"
        fallback="/referral"
        onMore={() => {}}
      />
      <div style={{ padding: "0 16px", marginTop: 20 }}>
        <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 10 }}>Available earnings</div>
        <div
          style={{ color: "#fff", fontWeight: 700, fontSize: 36, marginTop: 19 }}
        >
          {c.available.toFixed(2)}{" "}
          <span style={{ color: "#9aa0a8", fontSize: 14, fontWeight: 600 }}>
            USDT
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: "16px",
        }}
      >
        <Stat label="Pending" value={`${c.pending.toFixed(2)} USDT`} />
        <Stat label="Withdrawn" value={`${c.withdrawn.toFixed(2)} USDT`} />
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
          <div style={{ color: "#fff", fontWeight: 700 }}>
            Withdraw to Spot wallet
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input
              value={amt}
              onChange={(e) => setAmt(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0.00"
              style={{
                flex: 1,
                background: "#0a0c0f",
                border: "1px solid #1c1f23",
                color: "#fff",
                padding: "12px 14px",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={() => {
                const v = parseFloat(amt);
                if (v > 0) {
                  r.repo.withdraw(v);
                  setAmt("");
                }
              }}
              style={{
                background: "#22c1c3",
                color: "#0a0c0f",
                border: "none",
                borderRadius: 10,
                padding: "0 18px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "20px 16px 8px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        Commission history
      </div>
      <div style={{ padding: "0 16px" }}>
        {c.transactions.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#7d828a" }}>
            No transactions yet.
          </div>
        ) : (
          c.transactions.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #1c1f23",
              }}
            >
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
                  {t.type}
                </div>
                <div style={{ color: "#7d828a", fontSize: 11, marginTop: 3 }}>
                  {t.sourceUser} · {new Date(t.createdAt).toLocaleString()}
                </div>
              </div>
              <div
                style={{
                  color: t.amount >= 0 ? "#22c1c3" : "#ef4444",
                  fontWeight: 800,
                }}
              >
                {t.amount >= 0 ? "+" : ""}
                {t.amount} USDT
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div
    style={{
      background: "#15181d",
      border: "1px solid #1c1f23",
      borderRadius: 12,
      padding: 14,
    }}
  >
    <div style={{ color: "#9aa0a8", fontSize: 11 }}>{label}</div>
    <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginTop: 6 }}>
      {value}
    </div>
  </div>
);

export default CommissionWallet;
