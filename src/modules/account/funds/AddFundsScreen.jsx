import React, { useState } from "react";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import ActionCard from "./ActionCard";
import MenubarFooter from "../ui/MenubarFooter";

const CURRENCIES = [
  { code: "NGN", flag: "🇳🇬" },
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "GBP", flag: "🇬🇧" },
];

const AddFundsScreen = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#0a0b0d",
        minHeight: "100vh",
        color: "#fff",
        paddingBottom: 20,
      }}
    >
      <div style={{ padding: "16px 18px" }}>
        <Link
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            padding: 0,
          }}
        >
          <FiArrowLeft size={22} />
        </Link>

        <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 24 }}>
          Add funds
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            marginTop: 18,
          }}
        >
          <FaUniversity size={22} color="#dcdcdc" />
          <div style={{ color: "#dcdcdc", fontSize: 12, lineHeight: 1.4 }}>
            Your assets are guaranteed by the Bitget Protection Fund
          </div>
        </div>

        <div
          style={{ height: 1, background: "#1c1f23", margin: "22px 0 12px" }}
        />

        <div style={{ fontSize: 16, fontWeight: 500, marginTop: 8 }}>
          I have crypto assets
        </div>

        <ActionCard
          title="Deposit crypto"
          fontSize={10}
          subtitle="Add crypto funds to your Bitget account"
          onClick={() => navigate("/deposit-crypto")}
        />

        <div
          style={{ height: 1, background: "#1c1f23", margin: "8px 0 18px" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600 }}>Buy crypto with</div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                background: "transparent",
                border: "1px solid #2a2e34",
                borderRadius: 6,
                color: "#fff",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
              }}
            >
              <span>{currency.flag}</span>
              <span>{currency.code}</span>
              <FiChevronDown />
            </button>
            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "#141618",
                  border: "1px solid #2a2e34",
                  borderRadius: 8,
                  zIndex: 10,
                  minWidth: 120,
                }}
              >
                {CURRENCIES.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                    }}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ActionCard
          title="Buy / Sell"
          badge="New Sell Feature"
          subtitle="Buy and sell crypto instantly"
          onClick={() => navigate("/buy-sell")}
        />
        <ActionCard
          title="P2P trading"
          badge="Rewards"
          subtitle="Buy crypto with 0 fees and get USDT rewards!"
          onClick={() => navigate("/p2p")}
        />
        <ActionCard
          title="Bank Transfer"
          badge="Hot"
          subtitle="Top up fiat balance via bank transfer"
          onClick={() => navigate("/bank-transfer")}
        />
      </div>
      <MenubarFooter />
    </div>
  );
};

export default AddFundsScreen;
