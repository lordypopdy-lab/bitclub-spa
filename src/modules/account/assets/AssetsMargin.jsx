import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import { TbChartLine } from "react-icons/tb";
import AssetToggle from "./components/AssetToggle.jsx";
import AssetHeader from "./components/AssetHeader.jsx";
import AssetStats from "./components/AssetStats.jsx";
import AssetActionButtons from "./components/AssetActionButtons.jsx";

const pairs = [
  { symbol: "XDC/USDT", a: "0.00 XDC", b: "0.00 USDT" },
  { symbol: "SUSHI/USDT", a: "0.00 SUSHI", b: "0.00 USDT" },
  { symbol: "INJ/USDT", a: "0.00 INJ", b: "0.00 USDT" },
  { symbol: "ENSO/USDT", a: "0.00 ENSO", b: "0.00 USDT" },
];

const AssetsMargin = () => {
  const [tab, setTab] = useState("Isolated");
  const actions = [
    { label: "Borrow", Icon: FiArrowDown },
    { label: "Repay", Icon: FiArrowUp },
    { label: "Transfer", Icon: BsArrowLeftRight },
    { label: "PnL", Icon: TbChartLine },
  ];
  return (
    <div>
      <AssetToggle options={["Isolated", "Cross"]} active={tab} onChange={setTab} />
      <AssetHeader label="Margin account assets" />
      <AssetStats
        stats={[
          { label: "Net assets", value: "0.00 BTC", sub: "≈ 0.00 EUR" },
          { label: "Total debt", value: "0.00 BTC", sub: "≈ 0.00 EUR" },
        ]}
      />
      <AssetActionButtons actions={actions} />
      <div style={{ borderTop: "1px solid #14171b" }} />

      <div style={{ padding: "16px 16px 6px", color: "#fff", fontWeight: 700, fontSize: 18 }}>
        Assets
      </div>
      {pairs.map((p) => (
        <div
          key={p.symbol}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #14171b",
          }}
        >
          <div style={{ flex: 1, color: "#fff", fontWeight: 700, fontSize: 16 }}>{p.symbol}</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: 14 }}>{p.a}</div>
            <div style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>{p.b}</div>
          </div>
        </div>
      ))}
      <div style={{ height: 100 }} />
    </div>
  );
};

export default AssetsMargin;
