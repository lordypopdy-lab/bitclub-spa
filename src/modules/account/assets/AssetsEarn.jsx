import React from "react";
import { BsPiggyBank } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import AssetHeader from "./components/AssetHeader.jsx";
import AssetActionButtons from "./components/AssetActionButtons.jsx";

const products = [
  { symbol: "USDGO", color: "#3ecf8e", apr: "12.00%", vip: true },
  { symbol: "USDGO", color: "#3ecf8e", apr: "10.00%" },
  { symbol: "USDT", color: "#26a17b", apr: "9.44%" },
  { symbol: "USDT", color: "#26a17b", apr: "1.88%", vip: true },
  { symbol: "USDC", color: "#2775ca", apr: "8.66%" },
  { symbol: "USDC", color: "#2775ca", apr: "1.48%", vip: true },
  { symbol: "BTC", color: "#f7931a", apr: "8.88%" },
];

const AssetsEarn = () => {
  const actions = [
    { label: "Earn", Icon: BsPiggyBank },
    { label: "Auto Earn", Icon: FiRefreshCw },
    { label: "Crypto Loans", Icon: GiTakeMyMoney },
  ];
  return (
    <div>
      <AssetHeader label="Asset value (est.)" showPnl={false} />
      <AssetActionButtons actions={actions} />
      <div style={{ borderTop: "1px solid #14171b" }} />

      <div
        style={{
          padding: "16px 16px 6px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        Recommendations
      </div>
      <div
        style={{
          display: "flex",
          padding: "4px 16px 8px",
          color: "#7d828a",
          fontSize: 13,
        }}
      >
        <div style={{ flex: 1 }}>Coin</div>
        <div>Est. APR</div>
      </div>
      {products.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 16px",
            borderBottom: "1px solid #14171b",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: p.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
              marginRight: 12,
            }}
          >
            {p.symbol[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{p.symbol}</span>
              {p.vip && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#caa44b",
                    border: "1px solid #4a3b1e",
                    background: "#1a1404",
                    padding: "1px 5px",
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  VIP
                </span>
              )}
            </div>
            <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>
              Simple Earn / Flexible
            </div>
          </div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{p.apr}</div>
        </div>
      ))}
      <div style={{ height: 100 }} />
    </div>
  );
};

export default AssetsEarn;
