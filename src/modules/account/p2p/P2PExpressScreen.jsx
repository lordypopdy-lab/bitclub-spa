import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { BsQuestionCircle, BsBellSlash } from "react-icons/bs";
import ScreenHeader from "../components/ScreenHeader.jsx";
import P2PBottomNav from "./P2PBottomNav.jsx";
import SelectListSheet from "./SelectListSheet.jsx";
import { P2P_CRYPTOS, FIATS } from "../deposit/data/mockData.js";

const RATE = 1372.75; // fiat per 1 crypto unit (mock USDT/NGN)

const P2PExpressScreen = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState("Buy");
  const [pay, setPay] = useState("");
  const [receive, setReceive] = useState("");
  const [fiat, setFiat] = useState({ code: "NGN", icon: "₦", bg: "#16a34a" });
  const [crypto, setCrypto] = useState({
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    bg: "#26a17b",
  });
  const [sheet, setSheet] = useState(null);

  const onPay = (v) => {
    setPay(v);
    const n = parseFloat(v);
    if (!isNaN(n) && n > 0) {
      const r = side === "Buy" ? n / RATE : n * RATE;
      setReceive(r ? r.toFixed(side === "Buy" ? 2 : 2) : "");
    } else setReceive("");
  };
  const onReceive = (v) => {
    setReceive(v);
    const n = parseFloat(v);
    if (!isNaN(n) && n > 0) {
      const r = side === "Buy" ? n * RATE : n / RATE;
      setPay(r ? r.toFixed(2) : "");
    } else setPay("");
  };

  const isBuy = side === "Buy";
  const payCurrency = isBuy ? fiat : crypto;
  const receiveCurrency = isBuy ? crypto : fiat;

  const cta = useMemo(
    () => (isBuy ? `Buy ${crypto.symbol}` : `Sell ${crypto.symbol}`),
    [isBuy, crypto.symbol],
  );

  return (
    <div
      style={{
        background: "#0a0b0d",
        minHeight: "100vh",
        color: "#fff",
        paddingBottom: 100,
      }}
    >
      <ScreenHeader
        title={
          <div style={{ display: "flex", gap: 22, justifyContent: "center" }}>
            <span
              onClick={() => navigate("/p2p")}
              style={{
                color: "#7d828a",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              P2P
            </span>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
              Express
            </span>
          </div>
        }
        right={
          <>
            <BsQuestionCircle
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/faq")}
            />
            <BsBellSlash size={18} />
          </>
        }
      />

      <div style={{ padding: "8px 16px 0" }}>
        <div
          style={{
            display: "inline-flex",
            background: "#15171b",
            borderRadius: 6,
            padding: 3,
          }}
        >
          {["Buy", "Sell"].map((b) => {
            const a = side === b;
            return (
              <Link
                key={b}
                onClick={() => {
                  setSide(b);
                  setPay("");
                  setReceive("");
                }}
                style={{
                  border: "none",
                  background: a ? "#26292f" : "transparent",
                  color: a ? "#fff" : "#7d828a",
                  padding: "6px 18px",
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {b}
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "17px 14px 0" }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>
          {isBuy ? "Pay" : "I want to sell"}
        </div>
        <InputBox
          value={pay}
          onChange={onPay}
          placeholder={isBuy ? "Minimum 5000" : "Minimum 3.64"}
          currency={payCurrency}
          onCurrencyClick={() => setSheet(isBuy ? "fiat" : "crypto")}
          showMax={!isBuy}
        />
        {!isBuy && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 12,
            }}
          >
            <span
              style={{ color: "#7d828a", borderBottom: "1px dashed #3a3d42" }}
            >
              Available balance <span style={{ color: "#fff" }}>0</span>{" "}
              {crypto.symbol}
            </span>
            <span style={{ color: "#00d1c1" }}>Transfer</span>
          </div>
        )}
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>Receive</div>
        <InputBox
          value={receive}
          onChange={onReceive}
          placeholder={isBuy ? "Minimum 3.64" : "Minimum 5000"}
          currency={receiveCurrency}
          onCurrencyClick={() => setSheet(isBuy ? "crypto" : "fiat")}
        />
        <div style={{ color: "#7d828a", fontSize: 12, marginTop: 6 }}>
          Reference price: 1 {crypto.symbol} ≈ {RATE.toLocaleString()}{" "}
          {fiat.code}
        </div>
      </div>

      <div style={{ padding: "32px 16px 0" }}>
        <button
          onClick={() => navigate("/p2p")}
          style={{
            width: "100%",
            background: isBuy ? "#00d1c1" : "#ff3b73",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {cta}
        </button>
      </div>

      <SelectListSheet
        open={sheet === "fiat"}
        title="Select fiat"
        items={FIATS}
        onSelect={setFiat}
        onClose={() => setSheet(null)}
      />
      <SelectListSheet
        open={sheet === "crypto"}
        title="Select crypto"
        items={P2P_CRYPTOS}
        onSelect={setCrypto}
        onClose={() => setSheet(null)}
        showSearch={false}
      />

      <P2PBottomNav />
    </div>
  );
};

const InputBox = ({
  value,
  onChange,
  placeholder,
  currency,
  onCurrencyClick,
  showMax,
}) => (
  <div
    style={{
      marginTop: 10,
      background: "#15171b",
      borderRadius: 10,
      padding: "14px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
      placeholder={placeholder}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        outline: "none",
        flex: 1,
        fontSize: 15,
      }}
    />
    {showMax && <span style={{ color: "#00d1c1", fontWeight: 600 }}>Max</span>}
    <Link
      onClick={onCurrencyClick}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 600,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: currency.bg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
        }}
      >
        {currency.icon}
      </div>
      {currency.code || currency.symbol}
      <FiChevronDown size={14} />
    </Link>
  </div>
);

export default P2PExpressScreen;
