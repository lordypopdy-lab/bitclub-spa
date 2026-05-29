import React, { useEffect, useState } from "react";
import { HERO_CARDS } from "./data/mockData.js";

const HomeCarousel = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % HERO_CARDS.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);
  const c = HERO_CARDS[idx];
  return (
    <div style={{ padding: "12px 16px 4px" }}>
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg,#0f1217 0%,#0a0c10 100%)",
          border: "1px solid #181b21",
          borderRadius: 14,
          padding: "16px 16px 16px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          overflow: "hidden",
          minHeight: 92,
          animation: "fadeIn 0.4s ease",
        }}
        key={c.id}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            background: "#15181d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          {c.art}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#7d828a", fontSize: 12 }}>{c.tag}</div>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              marginTop: 4,
              lineHeight: 1.25,
            }}
          >
            {c.title}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            color: "#7d828a",
            fontSize: 11,
          }}
        >
          {idx + 1}/{HERO_CARDS.length}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
