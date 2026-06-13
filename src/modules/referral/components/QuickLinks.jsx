import React from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiAward,
  FiBarChart2,
  FiCreditCard,
  FiActivity,
  FiGift,
} from "react-icons/fi";

const items = [
  { to: "/referral/records", label: "My records", icon: <FiBarChart2 /> },
  { to: "/referral/activities", label: "Activities", icon: <FiGift /> },
  { to: "/referral/leaderboard", label: "Leaderboard", icon: <FiAward /> },
  { to: "/referral/analytics", label: "Analytics", icon: <FiActivity /> },
  { to: "/referral/wallet", label: "Commissions", icon: <FiCreditCard /> },
  { to: "/referral/premier", label: "Premier", icon: <FiUsers /> },
];

const QuickLinks = () => {
  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
        }}
      >
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            style={{
              ...card,
              textDecoration: "none",
            }}
          >
            <div style={{ color: "#22c1c3", fontSize: 18 }}>{it.icon}</div>

            <div
              style={{
                color: "#cfd2d6",
                fontSize: 11,
                fontWeight: 600,
                marginTop: 6,
              }}
            >
              {it.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const card = {
  background: "#15181d",
  border: "1px solid #1c1f23",
  borderRadius: 12,
  padding: "14px 6px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
};

export default QuickLinks;
