import React from "react";

const CoinIcon = ({ icon, bg, size = 36, color = "#fff" }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: size * 0.45,
      flexShrink: 0,
    }}
  >
    {icon}
  </div>
);

export default CoinIcon;
