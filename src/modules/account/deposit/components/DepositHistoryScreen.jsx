import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiFilter,
  FiChevronRight,
  FiInbox,
} from "react-icons/fi";
import ScreenHeader from "../../components/ScreenHeader.jsx";

const DepositHistoryScreen = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All coins");
  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh", color: "#fff" }}>
      <ScreenHeader
        title="Deposit history"
        right={<FiFilter size={20} color="#cfd2d8" />}
      />
      <div style={{ padding: "8px 16px" }}>
        <button
          onClick={() =>
            setFilter(filter === "All coins" ? "USDT" : "All coins")
          }
          style={{
            background: "transparent",
            border: "none",
            color: "#cfd2d8",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: 0,
            fontSize: 15,
          }}
        >
          {filter} <FiChevronDown />
        </button>
        <div style={{ color: "#7d828a", fontSize: 13, marginTop: 6 }}>
          2025-05-23 — 2026-05-22
        </div>
      </div>
      <div
        onClick={() => navigate("/faq")}
        style={{
          margin: "10px 0",
          padding: "16px",
          borderTop: "1px solid #1c1f23",
          borderBottom: "1px solid #1c1f23",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#fff", fontSize: 14 }}>
          Deposit not credited? Retrieve it here.
        </span>
        <FiChevronRight color="#7d828a" />
      </div>
      <EmptyState text="No content found." />
    </div>
  );
};

export const EmptyState = ({ text = "No data found." }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 20px",
      color: "#7d828a",
    }}
  >
    <FiInbox size={56} color="#3a3d42" />
    <div style={{ marginTop: 14, fontSize: 14 }}>{text}</div>
  </div>
);

export default DepositHistoryScreen;
