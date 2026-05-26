import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsQuestionCircle, BsClockHistory } from "react-icons/bs";
import ScreenHeader from "../../components/ScreenHeader";
import CoinIcon from "../../components/CoinIcon.jsx";
import { POPULAR_COINS, ALL_COINS } from "../data/mockData.js";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

const SelectCoinScreen = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const filt = ALL_COINS.filter(
      (c) =>
        !q ||
        c.symbol.toLowerCase().includes(q.toLowerCase()) ||
        c.name.toLowerCase().includes(q.toLowerCase()),
    );
    const map = {};
    filt.forEach((c) => {
      const k = (c.symbol[0] || "#").toUpperCase();
      map[k] = map[k] || [];
      map[k].push(c);
    });
    return map;
  }, [q]);

  const onPick = (c) => {
    if (c.suspended) return;
    navigate("/buy-sell");
  };

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh", color: "#fff" }}>
      <ScreenHeader
        title="Select coin"
        right={
          <>
            <BsQuestionCircle
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/faq")}
            />
            <BsClockHistory
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/deposit-history")}
            />
          </>
        }
      />

      <div style={{ padding: "4px 16px 12px" }}>
        <div
          style={{
            background: "#15171b",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FiSearch color="#7d828a" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              flex: 1,
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <div
        onClick={() => navigate("/buy-sell")}
        style={{
          margin: "0 16px 16px",
          background: "linear-gradient(90deg,#1a1d22,#212529)",
          borderRadius: 10,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div>
          <div style={{ color: "#cfd2d8", fontSize: 12 }}>
            Deposit and convert your USD balance
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>
            WIN 1000 USDGO
          </div>
        </div>
        <div style={{ fontSize: 28 }}>🪙</div>
      </div>

      {!q && (
        <>
          <div style={{ padding: "0 16px 8px", fontSize: 18, fontWeight: 700 }}>
            Popular coins
          </div>
          {POPULAR_COINS.map((c) => (
            <CoinRow key={c.symbol} coin={c} onClick={() => onPick(c)} />
          ))}
        </>
      )}

      <div style={{ position: "relative", paddingBottom: 24 }}>
        {LETTERS.map((L) => {
          const list = grouped[L];
          if (!list) return null;
          return (
            <div key={L} id={`sec-${L}`}>
              <div
                style={{
                  padding: "12px 16px 4px",
                  color: "#7d828a",
                  fontSize: 13,
                }}
              >
                {L}
              </div>
              {list.map((c) => (
                <CoinRow key={c.symbol} coin={c} onClick={() => onPick(c)} />
              ))}
            </div>
          );
        })}
        <div
          style={{
            position: "fixed",
            right: 4,
            top: 140,
            bottom: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: 10,
            color: "#7d828a",
            gap: 1,
          }}
        >
          {LETTERS.map((L) => (
            <a
              key={L}
              href={`#sec-${L}`}
              style={{
                color: grouped[L] ? "#cfd2d8" : "#3a3d42",
                textDecoration: "none",
                padding: "0 4px",
              }}
            >
              {L}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const CoinRow = ({ coin, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      cursor: coin.suspended ? "default" : "pointer",
      opacity: coin.suspended ? 0.7 : 1,
    }}
  >
    <CoinIcon icon={coin.icon} bg={coin.bg} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{coin.symbol}</div>
      <div style={{ color: "#7d828a", fontSize: 13 }}>{coin.name}</div>
    </div>
    {coin.suspended && (
      <span style={{ color: "#7d828a", fontSize: 13 }}>Suspended</span>
    )}
  </div>
);

export default SelectCoinScreen;
