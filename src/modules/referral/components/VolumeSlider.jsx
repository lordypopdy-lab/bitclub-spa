import React from "react";

const VolumeSlider = ({ volume, max = 2_500_000 }) => {
  const pct = Math.min(100, (volume / max) * 100);
  return (
    <div
      style={{
        padding: "20px 16px 0",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          color: "#7d828a",
          fontSize: 11,
          lineHeight: 1.2,
          borderBottom: "1px dashed #3a3e44",
          paddingBottom: 2,
        }}
      >
        Referral
        <br />
        trading
        <br />
        volume
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#9aa0a8",
            fontSize: 11,
          }}
        >
          <span>0K</span>
          <span>{max / 1000}K</span>
        </div>
        <div
          style={{
            position: "relative",
            height: 6,
            background: "#1c1f23",
            borderRadius: 999,
            marginTop: 6,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              background: "linear-gradient(90deg,#fcd9a0,#f5b06a)",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `calc(${pct}% - 10px)`,
              top: -5,
              width: 20,
              height: 16,
              background: "#2a2e35",
              borderRadius: 4,
              border: "2px solid #fcd9a0",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#fcd9a0",
            fontSize: 12,
            fontWeight: 700,
            marginTop: 6,
          }}
        >
          {Math.floor(volume / 1000)}K
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
