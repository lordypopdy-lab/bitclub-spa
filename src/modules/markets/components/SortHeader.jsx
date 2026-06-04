import React from "react";

const Arrow = () => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      marginLeft: 4,
      gap: 1,
    }}
  >
    <span
      style={{
        borderBottom: "4px solid #5a5f66",
        borderLeft: "3px solid transparent",
        borderRight: "3px solid transparent",
        width: 0,
        height: 0,
      }}
    />
    <span
      style={{
        borderTop: "4px solid #5a5f66",
        borderLeft: "3px solid transparent",
        borderRight: "3px solid transparent",
        width: 0,
        height: 0,
      }}
    />
  </span>
);

const SortHeader = ({ leftLabel = "Coin/Volume" }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      color: "#7d828a",
      fontSize: 12,
      padding: "10px 0",
      borderBottom: "1px solid #14171b",
    }}
  >
    <span style={{ flex: 1 }}>
      {leftLabel}
      <Arrow />
    </span>
    <span style={{ width: 100, textAlign: "right" }}>
      Price
      <Arrow />
    </span>
    <span style={{ width: 88, textAlign: "right", paddingRight: 4 }}>
      Change
      <Arrow />
    </span>
  </div>
);

export default SortHeader;
