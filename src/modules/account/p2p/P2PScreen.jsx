import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiChevronDown, FiFilter, FiX } from "react-icons/fi";
import { BsQuestionCircle, BsBellSlash } from "react-icons/bs";
import ScreenHeader from "../components/ScreenHeader.jsx";
import P2PBottomNav from "./P2PBottomNav.jsx";
import SelectListSheet from "./SelectListSheet.jsx";
import { P2P_OFFERS, P2P_CRYPTOS, FIATS } from "../deposit/data/mockData.js";

const TopSeg = ({ value, onChange }) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {["P2P", "Express"].map((t) => {
      const active = value === t;
      return (
        <Link
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: "transparent",
            border: "none",
            color: active ? "#fff" : "#7d828a",
            fontSize: 18,
            fontWeight: 700,
            padding: "0 4px",
          }}
        >
          {t}
        </Link>
      );
    })}
  </div>
);

const BuySell = ({ value, onChange }) => (
  <div
    style={{
      display: "inline-flex",
      background: "#15171b",
      borderRadius: 6,
      padding: 3,
    }}
  >
    {["Buy", "Sell"].map((b) => {
      const a = value === b;
      return (
        <Link
          key={b}
          onClick={() => onChange(b)}
          style={{
            border: "none",
            background: a ? "#26292f" : "transparent",
            color: a ? "#fff" : "#7d828a",
            padding: "6px 18px",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {b}
        </Link>
      );
    })}
  </div>
);

const Pill = ({ children, onClick }) => (
  <Link
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      color: "#cfd2d8",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 14,
      padding: "4px 0",
    }}
  >
    {children}
    <FiChevronDown size={14} />
  </Link>
);

const P2PScreen = () => {
  const navigate = useNavigate();
  const [seg, setSeg] = useState("P2P");
  const [side, setSide] = useState("Buy");
  const [fiat, setFiat] = useState({ code: "NGN", icon: "₦", bg: "#16a34a" });
  const [crypto, setCrypto] = useState({
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    bg: "#26a17b",
  });
  const [sheet, setSheet] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(true);

  React.useEffect(() => {
    if (seg === "Express") navigate("/p2p-express");
  }, [seg, navigate]);

  return (
    <div
      style={{
        background: "#0a0b0d",
        minHeight: "100vh",
        color: "#fff",
        paddingBottom: 80,
      }}
    >
      <ScreenHeader
        title={<TopSeg value={seg} onChange={setSeg} />}
        right={
          <>
            <BsQuestionCircle
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/faq")}
            />
            <BsBellSlash size={18} />
          </>
        }
      />

      {bannerOpen && (
        <div
          style={{
            margin: "4px 16px 12px",
            background: "#15171b",
            borderRadius: 10,
            padding: "12px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 22 }}>🎁</div>
          <div
            style={{ flex: 1, fontSize: 12, fontWeight: 600, lineHeight: 1.35 }}
          >
            Get Up to 50% Cash Back on P2P Deposits — Limited Time!
          </div>
          <div
            style={{
              color: "#7d828a",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            2/4
            <FiX
              onClick={() => setBannerOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )}

      <div
        style={{
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BuySell value={side} onChange={setSide} />
        <Pill onClick={() => setSheet("fiat")}>{fiat.code}</Pill>
      </div>

      <div
        style={{
          padding: "14px 16px 6px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Link
          onClick={() => setSheet("crypto")}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: crypto.bg,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {crypto.icon}
          </div>
          {crypto.symbol}
          <FiChevronDown size={14} />
        </Link>
        <Pill>Limit</Pill>
        <Pill>Method</Pill>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }}>
          <FiFilter size={18} color="#cfd2d8" />
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#00d1c1",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>
            Beginner-friendly ads
          </div>
          <div style={{ color: "#7d828a", fontSize: 13 }}>More ›</div>
        </div>
        <div style={{ color: "#7d828a", fontSize: 11, marginTop: 4 }}>
          Handpicked ads tailored for new users.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "8px 16px 6px",
          overflowX: "auto",
        }}
      >
        {P2P_OFFERS.slice(0, 3).map((o) => (
          <FeaturedCard
            key={o.id}
            offer={o}
            side={side}
            fiat={fiat}
            onClick={() => navigate("/p2p-express")}
          />
        ))}
      </div>

      {P2P_OFFERS.map((o) => (
        <OfferRow
          key={o.id}
          offer={o}
          side={side}
          fiat={fiat}
          onClick={() => navigate("/p2p-express")}
        />
      ))}

      <SelectListSheet
        open={sheet === "fiat"}
        title="Select fiat"
        items={FIATS}
        onSelect={(it) => setFiat(it)}
        onClose={() => setSheet(null)}
      />
      <SelectListSheet
        open={sheet === "crypto"}
        title="Select crypto"
        items={P2P_CRYPTOS}
        onSelect={(it) => setCrypto(it)}
        onClose={() => setSheet(null)}
        showSearch={false}
      />

      <P2PBottomNav />
    </div>
  );
};

const FeaturedCard = ({ offer, side, fiat, onClick }) => (
  <div
    style={{
      minWidth: 260,
      background: "#15171b",
      borderRadius: 12,
      padding: 14,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#15171b",
          border: "1px solid #2a2e34",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
        }}
      >
        {offer.merchant[0]}
      </span>
      {offer.merchant} <span style={{ color: "#00d1c1" }}>✦</span>
    </div>
    <div style={{ fontSize: 20, fontWeight: 500, marginTop: 8, marginBottom: 4 }}>
      {fiat.icon}
      {offer.price.toLocaleString()}
    </div>
    <div style={{ color: "#7d828a", fontSize: 10, marginTop: 6, marginBottom: 2 }}>
      Quantity{" "}
      <span style={{ color: "#cfd2d8" }}>
        {offer.available} {offer.crypto}
      </span>
    </div>
    <div style={{ color: "#7d828a", fontSize: 10, margin: "4px 0" }}>
      Limit{" "}
      <span style={{ color: "#cfd2d8" }}>
        {offer.limitMin} - {offer.limitMax.toLocaleString()} {fiat.code}
      </span>
    </div>
    <div
      style={{
        color: "#cfd2d8",
        fontSize: 10,
        marginTop: 4,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          background: "#f59e0b",
          borderRadius: 1,
          display: "inline-block",
        }}
      />{" "}
      {offer.payment}
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
      <Link
        to="/p2p-express"
        style={{
          background: side?.toLowerCase() === "sell" ? "#ff4d4f" : "#00d1c1",
          color: "#fff",
          padding: "8px 22px",
          borderRadius: 6,
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {side}
      </Link>
    </div>
  </div>
);

const OfferRow = ({ offer, side, fiat, onClick }) => (
  <div style={{ padding: "14px 16px", borderTop: "1px solid #15171b" }}>
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#26292f",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
        }}
      >
        {offer.merchant[0]}
      </span>
      {offer.merchant} <span style={{ color: "#00d1c1" }}>✦</span>
    </div>
    {offer.beginner && (
      <div
        style={{
          display: "inline-block",
          marginTop: 8,
          border: "1px solid #00d1c1",
          color: "#00d1c1",
          fontSize: 10,
          padding: "1px 4px",
          borderRadius: 4,
        }}
      >
        Beginner-friendly
      </div>
    )}
    <div style={{ color: "#7d828a", fontSize: 10, marginTop: 8 }}>
      Orders{" "}
      <span style={{ color: "#cfd2d8" }}>
        {offer.orders}({offer.completion}%)
      </span>
      <span style={{ marginLeft: 12, borderBottom: "1px dashed #3a3d42" }}>
        ⌛ {offer.avgTime} min
      </span>
    </div>
    <div style={{ fontSize: 20, fontWeight: 500, marginTop: 8 }}>
      {fiat.icon}
      {offer.price.toLocaleString()}
    </div>
    <div style={{ color: "#7d828a", fontSize: 10, marginTop: 6 }}>
      Quantity{" "}
      <span style={{ color: "#cfd2d8" }}>
        {offer.available} {offer.crypto}
      </span>
    </div>
    <div style={{ color: "#7d828a", fontSize: 10 }}>
      Limit{" "}
      <span style={{ color: "#cfd2d8" }}>
        {offer.limitMin} - {offer.limitMax.toLocaleString()} {fiat.code}
      </span>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <span
        style={{
          color: "#cfd2d8",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            background: "#f59e0b",
            borderRadius: 1,
          }}
        />{" "}
        {offer.payment}
      </span>
      <Link
        to="/p2p-express"
        style={{
          background: side?.toLowerCase() === "sell" ? "#ff4d4f" : "#00d1c1",
          color: "#fff",
          padding: "8px 22px",
          borderRadius: 6,
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {side}
      </Link>
    </div>
  </div>
);

export default P2PScreen;
