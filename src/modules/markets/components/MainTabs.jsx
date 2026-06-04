import React, { useEffect, useRef, useState } from "react";

const MainTabs = ({ tabs, active, onChange }) => {
  const refs = useRef({});
  const [bar, setBar] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, tabs]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: 22,
        overflowX: "auto",
        padding: "10px 0 14px",
        borderBottom: "1px solid #1a1d22",
        scrollbarWidth: "none",
      }}
    >
      {tabs.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            ref={(el) => (refs.current[t] = el)}
            onClick={() => onChange(t)}
            style={{
              background: "transparent",
              border: "none",
              color: isActive ? "#fff" : "#7d828a",
              fontWeight: isActive ? 600 : 500,
              fontSize: isActive ? 18 : 15,
              padding: 0,
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "color .2s, font-size .2s",
              letterSpacing: "-0.01em",
            }}
          >
            {t}
          </button>
        );
      })}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          height: 3,
          background: "linear-gradient(90deg,#00d1c1,#22d3ee)",
          borderRadius: 2,
          left: bar.left,
          width: bar.width,
          transition: "left .28s cubic-bezier(.4,0,.2,1), width .28s cubic-bezier(.4,0,.2,1)",
          opacity: bar.width ? 1 : 0,
        }}
      />
    </div>
  );
};

export default MainTabs;
