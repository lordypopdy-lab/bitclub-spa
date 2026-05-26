import React, { useState } from "react";
import { FiPlus, FiFilter, FiMoreHorizontal } from "react-icons/fi";
import ScreenHeader from "..//components/ScreenHeader.jsx";
import P2PBottomNav from "./P2PBottomNav.jsx";
import { EmptyState } from "../deposit/components/DepositHistoryScreen.jsx";

const Tab = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      color: active ? "#fff" : "#7d828a",
      padding: "8px 0",
      fontSize: 17,
      fontWeight: 700,
      borderBottom: active ? "2px solid #fff" : "2px solid transparent",
    }}
  >
    {children}
  </button>
);

const AdsScreen = () => {
  const [tab, setTab] = useState("Posted");
  return (
    <div
      style={{
        background: "#0a0b0d",
        minHeight: "100vh",
        color: "#fff",
        paddingBottom: 80,
      }}
    >
      <ScreenHeader
        title="My ads"
        right={
          <>
            <FiPlus size={22} />
            <FiFilter size={20} />
            <FiMoreHorizontal size={22} />
          </>
        }
      />
      <div style={{ padding: "0 16px", display: "flex", gap: 22 }}>
        {["Posted", "Removed", "Deleted"].map((t) => (
          <Tab key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Tab>
        ))}
      </div>
      <EmptyState text="No data found." />
      <P2PBottomNav />
    </div>
  );
};

export default AdsScreen;
