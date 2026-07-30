import React from "react";

const Bar = ({ w = "100%", h = 12, mt = 0 }) => (
  <div
    style={{
      width: w,
      height: h,
      marginTop: mt,
      borderRadius: 6,
      background:
        "linear-gradient(90deg, #14171b 25%, #1e2228 37%, #14171b 63%)",
      backgroundSize: "400% 100%",
      animation: "notifShimmer 1.2s ease infinite",
    }}
  />
);

const NotificationSkeleton = () => (
  <div style={{ padding: "16px" }}>
    <Bar w="85%" h={20} />
    <Bar w="60%" h={20} mt={10} />
    <Bar w="40%" h={12} mt={20} />
    <div style={{ height: 1, background: "#16191d", margin: "20px 0" }} />
    <Bar w="100%" mt={0} />
    <Bar w="97%" mt={10} />
    <Bar w="92%" mt={10} />
    <Bar w="70%" mt={10} />
    <Bar w="45%" h={16} mt={24} />
    <Bar w="100%" mt={14} />
    <Bar w="95%" mt={10} />
    <Bar w="80%" mt={10} />
  </div>
);

export default React.memo(NotificationSkeleton);
