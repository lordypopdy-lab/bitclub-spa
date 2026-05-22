import React, { useEffect, useState } from "react";

const slides = [
  { icons: ["🟧", "🟨", "⬛"], title: "How to deposit to Bitclub from a crypto wallet or another platform?", cta: "Learn more →" },
  { icons: ["💳", "🏦", "💎"], title: "Get started with crypto in under 60 seconds. Buy, hold, and trade.", cta: "Get started →" },
];

const AssetCarousel = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <div style={{ padding: "8px 16px 0", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 8,
          marginBottom: 18,
        }}
      >
        {s.icons.map((ic, k) => (
          <div
            key={k}
            style={{
              width: 54,
              height: 54,
              borderRadius: 12,
              background: "#101216",
              border: "1px solid #1c1f23",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            {ic}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        {slides.map((_, k) => (
          <span
            key={k}
            style={{
              width: k === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: k === i ? "#fff" : "#3a3e45",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
      <h2
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.25,
          margin: "0 4px 14px",
        }}
      >
        {s.title}
      </h2>
      <button
        style={{
          background: "transparent",
          border: "none",
          color: "#cfd2d6",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {s.cta}
      </button>
    </div>
  );
};

export default AssetCarousel;
