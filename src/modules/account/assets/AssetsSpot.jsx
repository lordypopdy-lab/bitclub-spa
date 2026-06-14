import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiArrowUpRight } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import { TbChartLine } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import AssetHeader from "./components/AssetHeader.jsx";
import AssetActionButtons from "./components/AssetActionButtons.jsx";
import AssetToggle from "./components/AssetToggle.jsx";
import AssetCoinList from "./components/AssetCoinList.jsx";
import WithdrawTypeModal from "../../withdraw/components/WithdrawTypeModal.jsx";

const cryptoCoins = [
  {
    symbol: "GOATS",
    name: "GOATS",
    balance: "451.6",
    eur: "0.00",
    pnl: "0.00 EUR",
    color: "#222",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.00",
    eur: "0.00",
    color: "#f7931a",
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "0.00",
    eur: "0.00",
    color: "#26a17b",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "0.00",
    eur: "0.00",
    color: "#627eea",
  },
  {
    symbol: "SOL",
    name: "Solana",
    balance: "0.00",
    eur: "0.00",
    color: "#9945ff",
  },
  {
    symbol: "BGB",
    name: "Bitget Token",
    balance: "0.00",
    eur: "0.00",
    color: "#00d1c1",
  },
];

const fiatCoins = [
  {
    symbol: "EUR",
    name: "Euro",
    balance: "0.00",
    eur: "0.00",
    color: "#0052b4",
  },
  {
    symbol: "USD",
    name: "US Dollar",
    balance: "0.00",
    eur: "0.00",
    color: "#2e7d32",
  },
];

const AssetsSpot = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Crypto");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const actions = [
    {
      label: "Add funds",
      Icon: FiPlus,
      onClick: () => navigate("/add-funds"),
    },
    {
      label: "Withdraw",
      Icon: FiArrowUpRight,
      onClick: () => setShowWithdrawModal(true),
    },
    {
      label: "Transfer",
      Icon: BsArrowLeftRight,
      onClick: () => navigate("/assets/withdraw/internal"),
    },
    { label: "PnL", Icon: TbChartLine },
  ];
  const handleWithdrawSelection = (path) => {
    setShowWithdrawModal(false);
    navigate(path);
  };
  return (
    <div>
      <AssetHeader label="Spot value (est.)" />
      <AssetActionButtons actions={actions} />

      <div style={{ padding: "0 16px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            border: "1px solid #1c1f23",
            borderRadius: 10,
            background: "#0c0e12",
          }}
        >
          <FaCircle color="#00d1c1" size={18} />
          <div
            style={{ flex: 1, color: "#fff", fontSize: 14, fontWeight: 600 }}
          >
            Convert small balances to BGB
          </div>
          <span style={{ color: "#7d828a" }}>›</span>
        </div>
      </div>

      <AssetToggle
        options={["Crypto", "Fiat"]}
        active={tab}
        onChange={setTab}
      />
      <AssetCoinList
        title=""
        coins={tab === "Crypto" ? cryptoCoins : fiatCoins}
      />
      <WithdrawTypeModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSelect={handleWithdrawSelection}
      />
      <div style={{ height: 100 }} />
    </div>
  );
};

export default AssetsSpot;
