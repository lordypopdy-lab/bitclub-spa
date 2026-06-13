import React, { useState } from "react";
import { Link } from "react-router-dom";
import RewardsHeader from "./components/RewardsHeader.jsx";
import { useRewardsStore } from "./hooks/useRewardsStore.js";

const Coupons = () => {
  const store = useRewardsStore();
  const [tab, setTab] = useState("active");
  const now = Date.now();
  const filtered = store.state.coupons.filter((c) => {
    if (tab === "active") return c.status === "active" && c.expiry > now;
    if (tab === "used") return c.status === "used";
    return c.status === "expired" || (c.status === "active" && c.expiry <= now);
  });

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
          Coupons Center
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
          Manage your vouchers and bonuses.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "20px 16px 6px",
          borderBottom: "1px solid #1c1f23",
        }}
      >
        {[
          { k: "active", l: "Active" },
          { k: "used", l: "Used" },
          { k: "expired", l: "Expired" },
        ].map(({ k, l }) => (
          <Link
            key={k}
            onClick={() => setTab(k)}
            style={{
              background: "transparent",
              border: "none",
              padding: "6px 0",
              color: tab === k ? "#fff" : "#7d828a",
              fontWeight: tab === k ? 800 : 600,
              fontSize: 14,
              cursor: "pointer",
              borderBottom:
                tab === k ? "2px solid #22c1c3" : "2px solid transparent",
            }}
          >
            {l}
          </Link>
        ))}
      </div>
      <div style={{ padding: "16px" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              color: "#7d828a",
              textAlign: "center",
              padding: 60,
              fontSize: 13,
            }}
          >
            No coupons here yet.
          </div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #1c1f23",
                borderRadius: 12,
                padding: 14,
                background: "#0a0c0f",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: "linear-gradient(180deg, #5fbfc5, #3a9ea4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>
                  {c.value}
                </div>
                <div style={{ fontSize: 9, marginTop: 2 }}>{c.unit}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                  {c.type}
                </div>
                <div
                  style={{
                    color: "#7d828a",
                    fontSize: 12,
                    marginTop: 4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Code: {c.code}
                </div>
                <div style={{ color: "#7d828a", fontSize: 11, marginTop: 2 }}>
                  Expires: {new Date(c.expiry).toLocaleDateString()}
                </div>
              </div>
              {c.status === "active" && (
                <Link
                  onClick={() => {
                    navigator.clipboard?.writeText(c.code);
                    store.useCoupon(c.id);
                  }}
                  style={{
                    background: "#22c1c3",
                    color: "#0a0c0f",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Use
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Coupons;
