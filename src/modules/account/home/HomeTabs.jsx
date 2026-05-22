import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeTabs = ({ tabs, active, onChange }) => {
  const refs = useRef({});
  useEffect(() => {
    const el = refs.current[active];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);
  return (
    <div
      style={{
        display: "flex",
        gap: 22,
        overflowX: "auto",
        padding: "6px 16px 0",
        scrollbarWidth: "none",
        borderBottom: "1px solid #14171b",
      }}
    >
      {tabs.map((t) => {
        const isActive = t === active;
        return (
          <Link
            key={t}
            ref={(el) => (refs.current[t] = el)}
            onClick={() => onChange(t)}
            style={{
              background: "transparent",
              border: "none",
              color: isActive ? "#fff" : "#7d828a",
              fontWeight: isActive ? 800 : 600,
              fontSize: isActive ? 18 : 16,
              padding: "10px 0 12px",
              position: "relative",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.15s ease",
            }}
          >
            {t}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  bottom: 6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 22,
                  height: 3,
                  borderRadius: 2,
                  background: "#fff",
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default HomeTabs;
