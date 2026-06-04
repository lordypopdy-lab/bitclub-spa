import React, { useEffect, useState } from "react";
import { PROMO_BANNERS } from "../data/marketMockData";

const PromoCarousel = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PROMO_BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const b = PROMO_BANNERS[idx];
  return (
    <div
      style={{
        background: "linear-gradient(140deg,#16181b,#0f1114)",
        border: "1px solid #1c1f23",
        borderRadius: 14,
        padding: 16,
        marginTop: 16,
        position: "relative",
        animation: "fadeIn .35s ease",
      }}
    >
      <div style={{ color: "#8a8f99", fontSize: 13, marginBottom: 8 }}>{b.title}</div>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.4 }}>{b.body}</div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 14,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {b.tags.map((t) => (
          <span
            key={t.label}
            style={{
              border: "1px solid #2a2e34",
              borderRadius: 6,
              padding: "5px 9px",
              fontSize: 12,
              color: "#cfd2d8",
            }}
          >
            {t.label}{" "}
            <span style={{ color: t.change >= 0 ? "#00d1c1" : "#ff5577", marginLeft: 4 }}>
              {t.change >= 0 ? "+" : ""}
              {t.change.toFixed(2)}%
            </span>
          </span>
        ))}
        <span style={{ marginLeft: "auto", color: "#7d828a", fontSize: 12 }}>
          {idx + 1}/{PROMO_BANNERS.length}
        </span>
      </div>
    </div>
  );
};

export default PromoCarousel;
