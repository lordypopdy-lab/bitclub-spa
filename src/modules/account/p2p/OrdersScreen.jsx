import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import ScreenHeader from "../components/ScreenHeader.jsx";
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
      fontSize: 18,
      fontWeight: 700,
      borderBottom: active ? "2px solid #fff" : "2px solid transparent",
    }}
  >
    {children}
  </button>
);

const Chip = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? "#26292f" : "transparent",
      color: active ? "#fff" : "#7d828a",
      border: "none",
      padding: "6px 14px",
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {children}
  </button>
);

const OrdersScreen = () => {
  const [tab, setTab] = useState("Pending");
  const [sub, setSub] = useState("In progress");
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
        title="Orders"
        right={
          <>
            <FiSearch size={20} />
            <FiFilter size={20} />
          </>
        }
      />
      <div
        style={{
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 22 }}>
          <Tab active={tab === "Pending"} onClick={() => setTab("Pending")}>
            Pending
          </Tab>
          <Tab active={tab === "Ended"} onClick={() => setTab("Ended")}>
            Ended
          </Tab>
        </div>
      </div>
      {tab === "Pending" && (
        <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
          <Chip
            active={sub === "In progress"}
            onClick={() => setSub("In progress")}
          >
            In progress
          </Chip>
          <Chip
            active={sub === "Under dispute"}
            onClick={() => setSub("Under dispute")}
          >
            Under dispute
          </Chip>
        </div>
      )}
      <EmptyState text="No orders" />
      <P2PBottomNav />
    </div>
  );
};

export default OrdersScreen;
