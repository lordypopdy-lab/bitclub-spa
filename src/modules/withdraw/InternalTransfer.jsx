import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiChevronDown, FiAlertTriangle, FiCheck } from "react-icons/fi";
import Header from "./components/Header.jsx";
import Sheet from "./components/Sheet.jsx";
import CoinPickerSheet from "./components/CoinPickerSheet.jsx";
import { getAsset } from "./data/assets.js";
import { useBalance } from "./hooks/useWithdraw.js";
import { WithdrawalService } from "./services/withdrawalService.js";

const SELF = { email: "me@bitclub.com", uid: "BCU-100001" };

const InternalTransfer = () => {
  const navigate = useNavigate();
  const [symbol, setSymbol] = useState("USDT");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [coinOpen, setCoinOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [tx, setTx] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const a = getAsset(symbol);
  const bal = useBalance(symbol);
  const amt = Number(amount) || 0;

  const submit = async () => {
    setErr("");
    setBusy(true);
    try {
      const t = await WithdrawalService.submitInternal({
        symbol,
        amount: amt,
        recipient,
        memo,
        self: SELF,
      });
      setTx(t);
      setSuccessOpen(true);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        background: "#000",
        color: "#fff",
        paddingBottom: 140,
      }}
    >
      <Header title="Internal transfer" fallback="/assets/withdraw" />
      <div
        style={{
          padding: "0 16px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          Coin
        </div>
        <div
          onClick={() => setCoinOpen(true)}
          style={{
            background: "#15181d",
            borderRadius: 12,
            padding: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: a?.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            {symbol[0]}
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              fontWeight: 700,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {symbol}{" "}
            <span style={{ color: "#9aa0a8", fontWeight: 400 }}>
              · {a?.name}
            </span>
          </div>
          <FiChevronDown color="#9aa0a8" style={{ flexShrink: 0 }} />
        </div>

        <div style={{ marginTop: 16, fontWeight: 700 }}>
          Recipient (Email or UID)
        </div>
        <input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="user@email.com or BCU-XXXXXX"
          style={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            marginTop: 8,
            padding: 14,
            background: "#15181d",
            border: "1px solid #1c1f23",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14,
            outline: "none",
          }}
        />

        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700 }}>Amount</span>
          <span
            style={{ color: "#9aa0a8", fontSize: 13, wordBreak: "break-word" }}
          >
            Available: {bal.available} {symbol}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 8,
            background: "#15181d",
            borderRadius: 12,
            padding: 14,
            alignItems: "center",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            minWidth: 0,
          }}
        >
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            inputMode="decimal"
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
            }}
          />
          <div style={{ color: "#fff", fontWeight: 700, flexShrink: 0 }}>
            {symbol}
          </div>
          <Link
            onClick={() => setAmount(bal.available + "")}
            style={{
              background: "transparent",
              border: "none",
              color: "#22c1c3",
              fontWeight: 700,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            All
          </Link>
        </div>

        <div style={{ marginTop: 16, fontWeight: 700 }}>Memo (optional)</div>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Note for recipient"
          style={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            marginTop: 8,
            padding: 14,
            background: "#15181d",
            border: "1px solid #1c1f23",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14,
            outline: "none",
          }}
        />

        <div
          style={{
            marginTop: 16,
            padding: 14,
            background: "#0a0c0f",
            border: "1px solid #1c1f23",
            borderRadius: 12,
            color: "#cfd2d6",
            fontSize: 13,
            wordBreak: "break-word",
          }}
        >
          Internal transfers are instant and free between BITCLUB users.
          Double-check the recipient's email or UID.
        </div>

        {err && (
          <div
            style={{
              marginTop: 12,
              color: "#ef4444",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
              wordBreak: "break-word",
            }}
          >
            <FiAlertTriangle /> {err}
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 16px calc(env(safe-area-inset-bottom) + 18px)",
          background: "linear-gradient(180deg, rgba(0,0,0,0), #000 40%)",
          boxSizing: "border-box",
          maxWidth: "100vw",
        }}
      >
        <button
          onClick={submit}
          disabled={busy || amt <= 0 || !recipient}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 14,
            border: "none",
            fontWeight: 800,
            fontSize: 16,
            background:
              busy || amt <= 0 || !recipient
                ? "#1c1f23"
                : "linear-gradient(90deg,#22c1c3,#7ee8e9)",
            color: busy || amt <= 0 || !recipient ? "#7d828a" : "#0a0c0f",
            cursor: busy ? "default" : "pointer",
          }}
        >
          {busy ? "Sending…" : "Send"}
        </button>
      </div>

      <CoinPickerSheet
        open={coinOpen}
        onClose={() => setCoinOpen(false)}
        selected={symbol}
        onSelect={setSymbol}
      />

      <Sheet
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/assets/withdraw/history");
        }}
      >
        <div style={{ padding: "8px 18px 4px", textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto",
              background: "linear-gradient(135deg,#22c1c3,#7ee8e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCheck color="#0a0c0f" size={32} />
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              marginTop: 14,
            }}
          >
            Transfer sent
          </div>
          <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 8 }}>
            {tx?.amount} {tx?.symbol} → {tx?.address}
          </div>
          <button
            onClick={() => {
              setSuccessOpen(false);
              navigate("/assets/withdraw/history");
            }}
            style={{
              width: "100%",
              marginTop: 18,
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(90deg,#22c1c3,#7ee8e9)",
              color: "#0a0c0f",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            View records
          </button>
        </div>
      </Sheet>
    </div>
  );
};

export default InternalTransfer;
