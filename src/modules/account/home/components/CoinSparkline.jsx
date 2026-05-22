import React from "react";

// Generates a small sparkline SVG from price seed and direction
const Sparkline = ({ color = "#22c1c3", width = 60, height = 22, seed = 1, up = true }) => {
  const points = [];
  const n = 14;
  let v = 50;
  for (let i = 0; i < n; i++) {
    const r = Math.sin((seed + i) * 1.3) * 14 + (up ? i : n - i) * 1.2;
    v = 50 + r;
    points.push(`${(i / (n - 1)) * width},${height - (v / 100) * height}`);
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points.join(" ")}
      />
    </svg>
  );
};

export default Sparkline;
