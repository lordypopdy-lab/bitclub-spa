import React, { useState } from "react";
import { TbChartLine } from "react-icons/tb";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaBolt } from "react-icons/fa";
import AssetToggle from "./components/AssetToggle.jsx";
import AssetHeader from "./components/AssetHeader.jsx";
import AssetStats from "./components/AssetStats.jsx";
import AssetActionButtons from "./components/AssetActionButtons.jsx";
import AssetCoinList from "./components/AssetCoinList.jsx";

const coins = [
  { symbol: "USDT", name: "USDT Perpetual", balance: "0.00", eur: "0.00", color: "#26a17b" },
];

const AssetsFutures = () => {
  const [tab, setTab] = useState("USDT-M Futures");
  const actions = [
    { label: "Trade", Icon: FaBolt },
    { label: "Transfer", Icon: BsArrowLeftRight },
    { label: "PnL", Icon: TbChartLine },
  ];
  return (
    <div>
      <AssetToggle
        options={["USDT-M Futures", "Coin-M Futures", "USDC-M Futures"]}
        active={tab}
        onChange={setTab}
      />
      <AssetHeader label="Total assets" />
      <AssetStats
        stats={[
          { label: "Wallet balance", value: "0.00 BTC", sub: "≈ 0.00 EUR" },
          { label: "Unrealized PnL", value: "0.00 BTC", sub: "≈ 0.00 EUR" },
        ]}
      />
      <AssetActionButtons actions={actions} />
      <div style={{ borderTop: "1px solid #14171b", marginTop: 4 }} />

      <AssetCoinList
        title="Assets"
        coins={coins}
        right={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #1c1f23",
              borderRadius: 8,
              padding: "6px 10px",
              marginRight: 4,
            }}
          >
            <span style={{ color: "#cfd2d6", fontSize: 13 }}>Auto Earn on idle funds</span>
            <span
              style={{
                width: 28,
                height: 16,
                borderRadius: 8,
                background: "#2a2e35",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            </span>
          </div>
        }
      />
      <div style={{ height: 100 }} />
    </div>
  );
};

export default AssetsFutures;
