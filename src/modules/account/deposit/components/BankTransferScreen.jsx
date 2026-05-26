import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FiChevronRight, FiCopy } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import ScreenHeader from "../../components/ScreenHeader.jsx";
import MenubarFooter from "../../ui/MenubarFooter.jsx";

const BANK_DETAILS = {
  bank: "Providus Bank",
  accountName: "Bitclub Limited",
  accountNumber: "9923456701",
  reference: "BTG-238471",
};

const Row = ({ label, value, copy }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    }
  };
  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom: "1px solid #15171b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ color: "#7d828a", fontSize: 12 }}>{label}</div>
        <div
          style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginTop: 4 }}
        >
          {value}
        </div>
      </div>
      {copy && (
        <button
          onClick={onCopy}
          style={{
            background: "transparent",
            border: "none",
            color: "#00d1c1",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <FiCopy size={14} /> {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
};

const BankTransferScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  return (
    <div
      style={{
        background: "#0a0b0d",
        minHeight: "100vh",
        color: "#fff",
        paddingBottom: 120,
      }}
    >
      <ScreenHeader title="Bank Transfer" />
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            color: "#cfd2d8",
            fontSize: 13,
            padding: "8px 12px",
            background: "#15171b",
            borderRadius: 8,
          }}
        >
          <FaUniversity /> Top up your fiat balance via bank transfer
        </div>

        <div style={{ marginTop: 18, fontSize: 14, color: "#7d828a" }}>
          Amount (NGN)
        </div>
        <div
          style={{
            background: "#15171b",
            borderRadius: 10,
            padding: "14px",
            marginTop: 8,
          }}
        >
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
            placeholder="Enter amount (min 5,000)"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              fontSize: 18,
              width: "100%",
            }}
          />
        </div>

        <div style={{ marginTop: 22, fontSize: 15, fontWeight: 700 }}>
          Send to the account below
        </div>
        <Row label="Bank" value={BANK_DETAILS.bank} />
        <Row label="Account Name" value={BANK_DETAILS.accountName} copy />
        <Row label="Account Number" value={BANK_DETAILS.accountNumber} copy />
        <Row label="Reference (required)" value={BANK_DETAILS.reference} copy />

        <div
          onClick={() => navigate("/faq")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
            color: "#cfd2d8",
            cursor: "pointer",
          }}
        >
          <span>Deposit not credited? Get help</span>
          <FiChevronRight color="#7d828a" />
        </div>

        <button
          onClick={() => navigate("/deposit-history")}
          style={{
            width: "100%",
            background: "#00d1c1",
            color: "#fff",
            border: "none",
            padding: 14,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            marginTop: 8,
          }}
        >
          I have made the transfer
        </button>
      </div>
      <MenubarFooter active="deposit" />
    </div>
  );
};

export default BankTransferScreen;
