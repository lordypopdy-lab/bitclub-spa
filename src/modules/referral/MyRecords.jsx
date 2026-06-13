import React, { useState } from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import { useReferral } from "./hooks/useReferral.js";
import { FiInfo, FiChevronDown, FiCheck } from "react-icons/fi";
import Sheet from "../rewards/components/Sheet.jsx";

const TABS = ["Activation", "Invitees", "Rebates", "Rewards history"];
const PERIODS = ["Last 90 days", "Last 30 days", "Last 7 days", "Yesterday"];
const ACCOUNTS = ["All accounts", "Spot", "Futures", "TradFi"];

const MyRecords = () => {
  const r = useReferral();
  const [tab, setTab] = useState(0);
  const [period, setPeriod] = useState(0);
  const [account, setAccount] = useState(0);
  const [pickOpen, setPickOpen] = useState(null); // 'period' | 'account' | null
  const [actSub, setActSub] = useState(0); // 0 promo, 1 voucher

  const stats = r.state.stats;
  const totalRebates = r.state.commissions.transactions
    .filter((t) => t.type === "Trading Commission")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 40,
      }}
    >
      <ReferralHeader title="" fallback="/referral" onMore={() => {}} />
      <div style={{ padding: "0 16px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
          My records
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: "14px 16px 0",
        }}
      >
        <Stat label="Total rebates" value={`${totalRebates.toFixed(2)} USDT`} />
        <Stat label="Yesterday's profit" value="0 USDT" />
        <Stat label="Invitees" value={stats.registrations} />
        <Stat label="Eligible invitees" value={stats.kyc} />
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "20px 16px 0",
          borderBottom: "1px solid #1c1f23",
          position: "relative",
        }}
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              background: "transparent",
              border: "none",
              color: tab === i ? "#fff" : "#9aa0a8",
              fontWeight: tab === i ? 800 : 500,
              fontSize: 14,
              padding: "10px 0",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {t}
            {tab === i && (
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  right: "20%",
                  bottom: -1,
                  height: 3,
                  borderRadius: 3,
                  background: "#fff",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div style={{ padding: 16 }}>
          <div
            style={{
              display: "inline-flex",
              background: "#15181d",
              borderRadius: 10,
              padding: 4,
            }}
          >
            <SubTab active={actSub === 0} onClick={() => setActSub(0)}>
              Activated by promotion
            </SubTab>
            <SubTab active={actSub === 1} onClick={() => setActSub(1)}>
              Activated by voucher
            </SubTab>
          </div>
          <EmptyState />
        </div>
      )}

      {tab === 1 && (
        <div style={{ padding: 16 }}>
          {r.state.invitees.map((i) => (
            <div key={i.id} style={inviteeCard}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#fff", fontWeight: 700 }}>{i.uid}</div>
                <div
                  style={{
                    color: i.status === "active" ? "#22c1c3" : "#fcd9a0",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {i.status.toUpperCase()}
                </div>
              </div>
              <div style={{ color: "#7d828a", fontSize: 11, marginTop: 4 }}>
                Registered {new Date(i.registeredAt).toLocaleDateString()} ·
                Level {i.level}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 10,
                  fontSize: 11,
                }}
              >
                <Tag ok={i.kyc}>KYC</Tag>
                <Tag ok={i.deposited}>Deposit</Tag>
                <Tag ok={i.trading}>Trading</Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                <div style={{ color: "#9aa0a8" }}>
                  Volume{" "}
                  <b style={{ color: "#fff" }}>${i.volume.toLocaleString()}</b>
                </div>
                <div style={{ color: "#9aa0a8" }}>
                  Commission{" "}
                  <b style={{ color: "#22c1c3" }}>${i.commission.toFixed(2)}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div style={{ padding: 16 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <Picker
              label={PERIODS[period]}
              active={pickOpen === "period"}
              onClick={() => setPickOpen("period")}
            />
            <Picker
              label={ACCOUNTS[account]}
              active={pickOpen === "account"}
              onClick={() => setPickOpen("account")}
            />
          </div>
          <EmptyState />
        </div>
      )}

      {tab === 3 && (
        <div style={{ padding: 16 }}>
          {r.state.commissions.transactions.length === 0 ? (
            <EmptyState />
          ) : (
            r.state.commissions.transactions.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #1c1f23",
                }}
              >
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
                    {t.type}
                  </div>
                  <div style={{ color: "#7d828a", fontSize: 11, marginTop: 3 }}>
                    {t.sourceUser} · {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    color: t.amount >= 0 ? "#22c1c3" : "#ef4444",
                    fontWeight: 800,
                  }}
                >
                  {t.amount >= 0 ? "+" : ""}
                  {t.amount} USDT
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <PickerSheet
        open={pickOpen === "period"}
        onClose={() => setPickOpen(null)}
        options={PERIODS}
        selected={period}
        onSelect={(i) => {
          setPeriod(i);
          setPickOpen(null);
        }}
      />
      <PickerSheet
        open={pickOpen === "account"}
        onClose={() => setPickOpen(null)}
        options={ACCOUNTS}
        selected={account}
        onSelect={(i) => {
          setAccount(i);
          setPickOpen(null);
        }}
      />
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div
    style={{
      background: "#15181d",
      border: "1px solid #1c1f23",
      borderRadius: 12,
      padding: 14,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#9aa0a8",
        fontSize: 12,
      }}
    >
      {label} <FiInfo size={11} />
    </div>
    <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginTop: 6 }}>
      {value}
    </div>
  </div>
);

const SubTab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? "#0a0c0f" : "transparent",
      color: active ? "#fff" : "#7d828a",
      border: "none",
      padding: "8px 14px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const Tag = ({ ok, children }) => (
  <span
    style={{
      color: ok ? "#22c1c3" : "#7d828a",
      display: "flex",
      alignItems: "center",
      gap: 4,
    }}
  >
    {ok ? <FiCheck size={11} /> : "·"} {children}
  </span>
);

const inviteeCard = {
  background: "#0f1115",
  border: "1px solid #1c1f23",
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
};

const Picker = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: `1px solid ${active ? "#fff" : "#2a2e35"}`,
      color: "#fff",
      borderRadius: 10,
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 13,
      cursor: "pointer",
    }}
  >
    {label} <FiChevronDown />
  </button>
);

const EmptyState = () => (
  <div style={{ textAlign: "center", padding: "70px 0", color: "#7d828a" }}>
    <div style={{ fontSize: 50 }}>🔍</div>
    <div style={{ fontSize: 13, marginTop: 8 }}>No records found.</div>
  </div>
);

const PickerSheet = ({ open, onClose, options, selected, onSelect }) => (
  <Sheet open={open} onClose={onClose} title="" showClose={false}>
    {options.map((o, i) => (
      <button
        key={o}
        onClick={() => onSelect(i)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: "14px 4px",
          fontSize: 15,
          cursor: "pointer",
          borderBottom: "1px solid #1c1f23",
        }}
      >
        {o} {selected === i && <FiCheck color="#22c1c3" />}
      </button>
    ))}
  </Sheet>
);

export default MyRecords;
