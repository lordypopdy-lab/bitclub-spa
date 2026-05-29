import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsGift } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import AssetBanner from "./components/AssetBanner.jsx";
import AssetCarousel from "./components/AssetCarousel.jsx";
import AssetCard from "./components/AssetCard.jsx";

const cards = [
  { coin: { symbol: "BTC", color: "#f7931a" }, price: "€66,022.73", gains: "+180.46%" },
  { coin: { symbol: "BGB", color: "#00d1c1" }, price: "€1.70", gains: "+334.77%" },
  { coin: { symbol: "ETH", color: "#627eea" }, price: "€2,410.55", gains: "+92.18%" },
];

const AssetsOverview = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(true);
  return (
    <div>
      {banner && <AssetBanner onClose={() => setBanner(false)} />}
      <AssetCarousel />

      <div style={{ padding: "20px 16px 12px" }}>
        <button
          onClick={() => navigate("/add-funds")}
          style={{
            width: "100%",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "13px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Add funds
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          padding: "8px 16px 16px",
          scrollbarWidth: "none",
        }}
      >
        {cards.map((c) => (
          <AssetCard key={c.coin.symbol} {...c} onClick={() => navigate( "/buy-sell")} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 16px",
          margin: "0 16px",
          border: "1px solid #1c1f23",
          borderRadius: 12,
          background: "#0c0e12",
        }}
      >
        <BsGift color="#f0b90b" size={20} />
        <div style={{ flex: 1, color: "#cfd2d6", fontSize: 14 }}>
          Make a deposit of any amount to get 10 points
        </div>
        <FiChevronRight color="#7d828a" />
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
};

export default AssetsOverview;
