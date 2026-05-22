import React, { useState, useMemo } from "react";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import TradeHeader from "./TradeHeader";
import TradeToggle from "./TradeToggle";
import BuyTab from "./BuyTab";
import SellTab from "./SellTab";
import NumericKeypad from "./NumericKeypad";
import SelectorSheet from "./SelectorSheet";
import { useNavigate } from "react-router-dom";
import { ASSETS, PAYMENT_METHODS, RECEIVE_WITH, convert } from "./data/rates";

const cryptoList = Object.values(ASSETS).filter((a) => a.kind === "crypto").map((a) => ({ ...a, id: a.symbol }));
const fiatList = Object.values(ASSETS).filter((a) => a.kind === "fiat").map((a) => ({ ...a, id: a.symbol }));

const BuySellScreen = () => {
  const [tab, setTab] = useState("buy");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  // Buy state
  const [buyFiat, setBuyFiat] = useState("NGN");
  const [buyAsset, setBuyAsset] = useState("BTC");
  const [buyPayment, setBuyPayment] = useState(PAYMENT_METHODS[0]);

  // Sell state
  const [sellAsset, setSellAsset] = useState("BTC");
  const [sellFiat, setSellFiat] = useState("EUR");
  const [receiveWith, setReceiveWith] = useState(RECEIVE_WITH[0]);

  // sheet state: { type, items, title, selectedId, onSelect }
  const [sheet, setSheet] = useState(null);

  const handleInput = (k) => {
    setAmount((prev) => {
      // decimal handling
      if (k === ".") {
        if (prev.includes(".")) return prev;
        if (prev === "") return "0.";
        return prev + ".";
      }
      // leading-zero handling
      if (prev === "0") return k;
      if (prev === "") return k;
      // max length safeguard (digits only)
      const digitCount = prev.replace(".", "").length;
      if (digitCount >= 12) return prev;
      // limit decimals to 8
      if (prev.includes(".")) {
        const decimals = prev.split(".")[1].length;
        if (decimals >= 8) return prev;
      }
      return prev + k;
    });
  };

  const handleDelete = () => {
    setAmount((prev) => {
      if (!prev) return prev;
      const next = prev.slice(0, -1);
      // avoid leaving a stray "0" — empty is cleaner
      if (next === "0") return "";
      return next;
    });
  };

  // estimates
  const receiveEstimate = useMemo(() => {
    if (tab === "buy") return convert(amount, buyFiat, buyAsset);
    return convert(amount, sellAsset, sellFiat);
  }, [tab, amount, buyFiat, buyAsset, sellAsset, sellFiat]);

  const buttonText =
    tab === "buy" ? `Buy ${buyAsset}` : `Sell ${amount || "0"} ${sellAsset}`;
  const isActive = !!amount && parseFloat(amount) > 0;

  // Sheet openers
  const openFiatSheet = (current, onSelect) =>
    setSheet({
      title: "Select currency",
      items: fiatList,
      selectedId: current,
      onSelect: (item) => onSelect(item.symbol),
    });

  const openCryptoSheet = (current, onSelect) =>
    setSheet({
      title: "Select coin",
      items: cryptoList,
      selectedId: current,
      onSelect: (item) => onSelect(item.symbol),
    });

  const openPaymentSheet = (current, onSelect) =>
    setSheet({
      title: "Select payment method",
      items: PAYMENT_METHODS,
      selectedId: current.id,
      onSelect,
    });

  const openReceiveWithSheet = (current, onSelect) =>
    setSheet({
      title: "Receive with",
      items: RECEIVE_WITH,
      selectedId: current.id,
      onSelect,
    });

  // reset amount when switching tabs to keep UX predictable
  const switchTab = (t) => {
    if (t !== tab) setAmount("");
    setTab(t);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <TradeHeader onBack={() => navigate(-1)} />
      <div className="px-3" style={{ paddingTop: 8 }}>
        <div
          className="d-flex align-items-center"
          style={{
            background: "#141414",
            borderRadius: 10,
            padding: "10px 12px",
            gap: 10,
          }}
        >
          <BsFillVolumeUpFill size={16} color="#fff" />
          <div
            className="flex-grow-1"
            style={{ color: "#dcdcdc", fontSize: 13, lineHeight: 1.35 }}
          >
            How to sell crypto instantly with a credit/debit card on Bitclub?
          </div>
          <FiChevronRight size={18} color="#9a9a9a" />
        </div>
      </div>

      <div className="px-3" style={{ paddingTop: 18 }}>
        <TradeToggle tab={tab} onChange={switchTab} />
      </div>

      <div className="px-3 flex-grow-1">
        {tab === "buy" ? (
          <BuyTab
            amount={amount}
            fiat={buyFiat}
            asset={buyAsset}
            payment={buyPayment}
            receiveEstimate={receiveEstimate}
            onPickFiat={() => openFiatSheet(buyFiat, setBuyFiat)}
            onPickAsset={() => openCryptoSheet(buyAsset, setBuyAsset)}
            onPickPayment={() => openPaymentSheet(buyPayment, setBuyPayment)}
          />
        ) : (
          <SellTab
            amount={amount}
            asset={sellAsset}
            fiat={sellFiat}
            receiveWith={receiveWith}
            receiveEstimate={receiveEstimate}
            onPickAsset={() => openCryptoSheet(sellAsset, setSellAsset)}
            onPickFiat={() => openFiatSheet(sellFiat, setSellFiat)}
            onPickReceiveWith={() =>
              openReceiveWithSheet(receiveWith, setReceiveWith)
            }
          />
        )}

        <div style={{ paddingTop: 18, paddingBottom: 12 }}>
          <button
            disabled={!isActive}
            style={{
              width: "100%",
              padding: "14px 0",
              background: isActive
                ? tab === "buy"
                  ? "#22c55e"
                  : "#ef4444"
                : "#1a1a1a",
              color: isActive ? "#fff" : "#6a6a6a",
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              cursor: isActive ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>

      <NumericKeypad onInput={handleInput} onDelete={handleDelete} />

      <SelectorSheet
        open={!!sheet}
        title={sheet?.title}
        items={sheet?.items || []}
        selectedId={sheet?.selectedId}
        onSelect={sheet?.onSelect || (() => {})}
        onClose={() => setSheet(null)}
      />
    </div>
  );
};

export default BuySellScreen;
