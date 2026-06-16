import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiChevronDown,
  FiAlertTriangle,
  FiCheck,
  FiShield,
} from "react-icons/fi";
import Header from "./components/Header.jsx";
import Sheet from "./components/Sheet.jsx";
import CoinPickerSheet from "./components/CoinPickerSheet.jsx";
import NetworkPickerSheet from "./components/NetworkPickerSheet.jsx";
import { getAsset } from "./data/assets.js";
import { useBalance } from "./hooks/useWithdraw.js";
import { WithdrawalService } from "./services/withdrawalService.js";
import { FeeEngine } from "./services/feeEngine.js";
import { AddressValidator } from "./services/addressValidator.js";

const Label = ({ children, hint }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginTop: 18,
      marginBottom: 8,
    }}
  >
    <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
      {children}
    </div>
    {hint && <div style={{ color: "#9aa0a8", fontSize: 12 }}>{hint}</div>}
  </div>
);

const Box = ({ children, onClick, error }) => (
  <div
    onClick={onClick}
    style={{
      background: "#15181d",
      borderRadius: 12,
      padding: "14px 14px",
      border: error ? "1px solid #ef4444" : "1px solid #1c1f23",
      cursor: onClick ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      minWidth: 0,
    }}
  >
    {children}
  </div>
);

const OnChainWithdraw = () => {
  const navigate = useNavigate();
  const [symbol, setSymbol] = useState("USDT");
  const [networkId, setNetworkId] = useState(null);
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [amount, setAmount] = useState("");
  const [coinOpen, setCoinOpen] = useState(false);
  const [netOpen, setNetOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const asset = getAsset(symbol);
  const bal = useBalance(symbol);
  const networks = asset?.networks || [];
  const selectedNet = networks.find((n) => n.id === networkId) || networks[0];
  const activeNetId = selectedNet?.id;

  React.useEffect(() => {
    // auto-select first network on coin change
    if (!networks.find((n) => n.id === networkId))
      setNetworkId(networks[0]?.id || null);
    setAddress("");
    setErr("");
  }, [symbol]); // eslint-disable-line

  const addrCheck = address
    ? AddressValidator.validate(symbol, activeNetId, address)
    : { ok: true };
  const fee = FeeEngine.calculate({ symbol, networkId: activeNetId, amount });
  const amt = Number(amount) || 0;
  const receive = Math.max(0, amt - (fee.fee || 0));
  const remaining = Math.max(0, bal.available - amt);

  const canSubmit =
    amt > 0 &&
    addrCheck.ok &&
    address &&
    amt <= bal.available &&
    amt >= (fee.min || 0) &&
    receive > 0;

  const setPct = (p) => {
    const v = bal.available * p;
    setAmount(v > 0 ? +v.toFixed(8) + "" : "");
  };

  const openConfirm = () => {
    setErr("");
    const v = WithdrawalService.validateOnChain({
      symbol,
      networkId: activeNetId,
      address,
      amount: amt,
      memo,
    });
    if (!v.ok) {
      setErr(v.error);
      return;
    }
    setConfirmOpen(true);
  };

  const proceedOtp = () => {
    setConfirmOpen(false);
    setOtpOpen(true);
  };

  const submit = async () => {
    if (otp.length < 6) {
      setErr("Enter the 6-digit code");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const tx = await WithdrawalService.submitOnChain({
        symbol,
        networkId: activeNetId,
        address,
        amount: amt,
        memo,
      });
      setSubmitted(tx);
      setOtpOpen(false);
      setOtp("");
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
      <Header title={`Send ${symbol}`} fallback="/assets/withdraw" showHelp />

      <div
        style={{
          padding: "0 16px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Label>Coin001</Label>
        <Box onClick={() => setCoinOpen(true)}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: asset?.color || "#222",
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
              · {asset?.name}
            </span>
          </div>
          <FiChevronDown color="#9aa0a8" style={{ flexShrink: 0 }} />
        </Box>

        <Label>Withdrawal address</Label>
        <Box error={!addrCheck.ok}>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Tap and hold to paste address"
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 14,
            }}
          />
        </Box>
        {address && !addrCheck.ok && (
          <div
            style={{
              color: "#ef4444",
              fontSize: 12,
              marginTop: 6,
              wordBreak: "break-word",
            }}
          >
            {addrCheck.error}
          </div>
        )}

        <Label
          hint={
            selectedNet
              ? `Fee ${selectedNet.fee} ${symbol} · ${selectedNet.eta}`
              : ""
          }
        >
          Network
        </Label>
        <Box onClick={() => setNetOpen(true)}>
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
            {selectedNet?.label || "Select network"}
          </div>
          <FiChevronDown color="#9aa0a8" style={{ flexShrink: 0 }} />
        </Box>

        {selectedNet && /TON|XRP|BNB/.test(selectedNet.id) && (
          <>
            <Label>Tag / Memo (optional)</Label>
            <Box>
              <input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Tag/Memo (optional)"
                style={{
                  flex: 1,
                  minWidth: 0,
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: 14,
                }}
              />
            </Box>
          </>
        )}

        <Label hint={`Available: ${bal.available} ${symbol}`}>
          Withdrawal amount
        </Label>
        <Box>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder={`Minimum ${selectedNet?.min || 0}`}
            inputMode="decimal"
            style={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
            }}
          />
          <div style={{ color: "#fff", fontWeight: 700, flexShrink: 0 }}>
            {symbol}
          </div>
          <Link
            onClick={() => setPct(1)}
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
        </Box>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[0.25, 0.5, 0.75, 1].map((p) => (
            <button
              key={p}
              onClick={() => setPct(p)}
              style={{
                flex: 1,
                padding: "8px 0",
                background: "#0f1115",
                border: "1px solid #1c1f23",
                color: "#cfd2d6",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {p * 100}%
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 14,
            background: "#0a0c0f",
            border: "1px solid #1c1f23",
            borderRadius: 12,
          }}
        >
          <Row k="Network fee" v={`${fee.fee || 0} ${symbol}`} />
          <Row
            k="You will receive"
            v={`${receive.toFixed(8).replace(/0+$/, "").replace(/\.$/, "")} ${symbol}`}
            accent
          />
          <Row
            k="Remaining balance"
            v={`${remaining.toFixed(8).replace(/0+$/, "").replace(/\.$/, "")} ${symbol}`}
          />
        </div>

        {err && (
          <div
            style={{
              marginTop: 12,
              color: "#ef4444",
              fontSize: 13,
              display: "flex",
              gap: 8,
              alignItems: "center",
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
          onClick={openConfirm}
          disabled={!canSubmit}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 14,
            border: "none",
            fontWeight: 800,
            fontSize: 16,
            background: canSubmit
              ? "linear-gradient(90deg,#22c1c3,#7ee8e9)"
              : "#1c1f23",
            color: canSubmit ? "#0a0c0f" : "#7d828a",
            cursor: canSubmit ? "pointer" : "default",
          }}
        >
          Withdraw
        </button>
      </div>

      <CoinPickerSheet
        open={coinOpen}
        onClose={() => setCoinOpen(false)}
        selected={symbol}
        onSelect={setSymbol}
      />
      <NetworkPickerSheet
        open={netOpen}
        onClose={() => setNetOpen(false)}
        symbol={symbol}
        selected={activeNetId}
        onSelect={setNetworkId}
      />

      <Sheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm withdrawal"
      >
        <div style={{ padding: "0 18px 4px" }}>
          <Row k="Asset" v={symbol} />
          <Row k="Network" v={selectedNet?.label || ""} />
          <Row k="Address" v={address.slice(0, 10) + "…" + address.slice(-8)} />
          {memo && <Row k="Memo" v={memo} />}
          <Row k="Amount" v={`${amt} ${symbol}`} />
          <Row k="Network fee" v={`${fee.fee} ${symbol}`} />
          <Row k="You receive" v={`${receive} ${symbol}`} accent />
        </div>
        <div style={{ padding: "14px 18px 0" }}>
          <button
            onClick={proceedOtp}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(90deg,#22c1c3,#7ee8e9)",
              color: "#0a0c0f",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </Sheet>

      <Sheet
        open={otpOpen}
        onClose={() => !busy && setOtpOpen(false)}
        title="Security verification"
      >
        <div style={{ padding: "0 18px" }}>
          <div
            style={{
              color: "#9aa0a8",
              fontSize: 13,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiShield color="#22c1c3" /> Enter the 6-digit code sent to your
            email (simulated).
          </div>
          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="••••••"
            inputMode="numeric"
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "#15181d",
              border: "1px solid #1c1f23",
              borderRadius: 12,
              color: "#fff",
              fontSize: 20,
              letterSpacing: 6,
              textAlign: "center",
              outline: "none",
            }}
          />
          {err && (
            <div style={{ color: "#ef4444", fontSize: 12, marginTop: 8 }}>
              {err}
            </div>
          )}
          <div style={{ color: "#7d828a", fontSize: 11, marginTop: 8 }}>
            Tip: any 6 digits work in this preview build.
          </div>
          <button
            onClick={submit}
            disabled={busy}
            style={{
              width: "100%",
              marginTop: 16,
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: busy
                ? "#1c1f23"
                : "linear-gradient(90deg,#22c1c3,#7ee8e9)",
              color: busy ? "#7d828a" : "#0a0c0f",
              fontWeight: 800,
              cursor: busy ? "default" : "pointer",
            }}
          >
            {busy ? "Processing…" : "Confirm & withdraw"}
          </button>
        </div>
      </Sheet>

      <Sheet
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/assets/withdraw/history");
        }}
        title={null}
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
              boxShadow: "0 0 30px rgba(34,193,195,0.5)",
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
            Withdrawal submitted
          </div>
          <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 8 }}>
            Tx ID: {submitted?.id}
          </div>
          <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 2 }}>
            You will receive a notification once it's completed.
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
            View withdrawal records
          </button>
        </div>
      </Sheet>
    </div>
  );
};

const Row = ({ k, v, accent }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      color: "#cfd2d6",
      fontSize: 14,
      gap: 12,
    }}
  >
    <span style={{ color: "#9aa0a8", flexShrink: 0 }}>{k}</span>
    <span
      style={{
        color: accent ? "#22c1c3" : "#fff",
        fontWeight: accent ? 800 : 600,
        textAlign: "right",
        wordBreak: "break-all",
        overflowWrap: "break-word",
        minWidth: 0,
      }}
    >
      {v}
    </span>
  </div>
);

export default OnChainWithdraw;
