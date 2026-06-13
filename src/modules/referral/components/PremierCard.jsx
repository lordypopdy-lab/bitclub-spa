import React from "react";

const PremierCard = ({
  rebate = 25,
  days = 365,
  monthly = 1300,
  onActivate,
}) => {
  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={wrap}>
        <div style={topGlow} />
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            display: "flex",
            gap: 10,
            color: "#9aa0a8",
          }}
        >
          <span style={{ fontSize: 16 }}>⏱</span>
          <span style={{ fontSize: 16 }}>?</span>
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            marginTop: 6,
          }}
        >
          Become a Premier Inviter
        </div>
        <div
          style={{
            color: "#fcd9a0",
            fontWeight: 800,
            fontSize: 32,
            textAlign: "center",
            lineHeight: 1.15,
            marginTop: 8,
            letterSpacing: 0.3,
          }}
        >
          Enjoy a {rebate}%<br />
          rebate
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            margin: "18px 0 8px",
          }}
        >
          <div style={hr} />
          <div style={{ color: "#fcd9a0", fontSize: 13, fontWeight: 700 }}>
            Rebate perks
          </div>
          <div style={hr} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "8px 0 16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div>
              <span style={bigNum}>{days}</span>
              <span style={smallUnit}>days</span>
            </div>
            <div style={label}>Duration</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div>
              <span style={bigNum}>{rebate}</span>
              <span style={smallUnit}>%</span>
            </div>
            <div style={label}>Ratio</div>
          </div>
        </div>
        <button onClick={onActivate} style={cta}>
          Activate now
        </button>
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid #1c1f23",
          position: "relative",
        }}
      >
        <div style={vsBg}>VS</div>
        <div
          style={{
            flex: 1,
            padding: "14px 12px",
            background: "#15181d",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#9aa0a8", fontSize: 12 }}>Regular</div>
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 20,
              marginTop: 4,
            }}
          >
            ≈ $0
          </div>
          <div style={{ color: "#7d828a", fontSize: 11 }}>Monthly rebates</div>
        </div>
        <div
          style={{
            flex: 1.2,
            padding: "14px 12px",
            background: "linear-gradient(135deg,#3a2a0a,#1a1206)",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#fcd9a0", fontSize: 12, fontWeight: 700 }}>
            Premier...
          </div>
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 20,
              marginTop: 4,
            }}
          >
            ≈ ${monthly}
            <span style={{ fontSize: 12, color: "#9aa0a8", fontWeight: 500 }}>
              {" "}
              and up
            </span>
          </div>
          <div style={{ color: "#fcd9a0", fontSize: 11 }}>Monthly rebates</div>
        </div>
      </div>
    </div>
  );
};

const wrap = {
  position: "relative",
  background: "linear-gradient(180deg, #1a1206 0%, #0a0c0f 80%)",
  border: "1px solid #2a2e35",
  borderRadius: 18,
  padding: "20px 18px 18px",
  overflow: "hidden",
};
const topGlow = {
  position: "absolute",
  top: -60,
  left: "50%",
  transform: "translateX(-50%)",
  width: 180,
  height: 120,
  background:
    "radial-gradient(ellipse, rgba(252,217,160,0.35), transparent 70%)",
};
const hr = {
  flex: 1,
  height: 1,
  background: "linear-gradient(90deg, transparent, #4a3a1a, transparent)",
};
const bigNum = { color: "#fcd9a0", fontSize: 30, fontWeight: 800 };
const smallUnit = {
  color: "#fcd9a0",
  fontSize: 13,
  marginLeft: 2,
  fontWeight: 600,
};
const label = { color: "#9aa0a8", fontSize: 12, marginTop: 2 };
const cta = {
  display: "block",
  width: "100%",
  marginTop: 12,
  background: "linear-gradient(90deg,#fcd9a0,#f5e0b0)",
  border: "none",
  color: "#1a1206",
  borderRadius: 12,
  padding: "13px 0",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(252,217,160,0.18)",
};
const vsBg = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.08)",
  fontWeight: 900,
  fontSize: 32,
  pointerEvents: "none",
};

export default PremierCard;
