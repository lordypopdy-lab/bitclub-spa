import React from "react";
import CountUp from "./CountUp.jsx";

const StatsGrid = ({ stats, tier, commissions }) => {
  const items = [
    { label: "Total referrals", value: stats.registrations },
    { label: "Active referrals", value: stats.activeReferrals },
    { label: "Referral volume", value: stats.tradingVolume, prefix: "$" },
    {
      label: "Total commission",
      value: commissions.available + commissions.withdrawn,
      prefix: "$",
      suffix: "",
    },
    {
      label: "Available",
      value: commissions.available,
      prefix: "$",
      decimals: 2,
    },
    { label: "Pending", value: commissions.pending, prefix: "$", decimals: 2 },
    { label: "Referral rank", value: 0, custom: tier.name },
    { label: "Current rebate", value: tier.rebate, suffix: "%" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        padding: "0 16px",
      }}
    >
      {items.map((it, i) => (
        <div key={i} style={card}>
          <div style={{ color: "#7d828a", fontSize: 11, marginBottom: 6 }}>
            {it.label}
          </div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>
            {it.custom ? (
              it.custom
            ) : (
              <CountUp
                value={it.value}
                prefix={it.prefix || ""}
                suffix={it.suffix || ""}
                decimals={it.decimals || 0}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const card = {
  background:
    "linear-gradient(180deg, rgba(34,193,195,0.05), rgba(255,255,255,0.02))",
  border: "1px solid #1c1f23",
  borderRadius: 14,
  padding: "12px 14px",
  backdropFilter: "blur(8px)",
};

export default StatsGrid;
