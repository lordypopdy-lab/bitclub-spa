import React, { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

const SubTabs = ({ tabs, active, onChange, showEdit = true }) => {
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
        alignItems: "center",
        gap: 24,
        padding: "14px 0 10px",
        overflowX: "auto",
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
              fontWeight: isActive ? 700 : 500,
              fontSize: 15,
              padding: 0,
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "color .2s",
            }}
          >
            {t}
          </button>
        );
      })}
      {showEdit && (
        <button
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: "#7d828a",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <FiEdit2 size={16} />
        </button>
      )}
      <span
        style={{
          position: "absolute",
          bottom: 4,
          height: 2,
          background: "#fff",
          borderRadius: 2,
          left: bar.left,
          width: bar.width,
          transition: "left .25s cubic-bezier(.4,0,.2,1), width .25s cubic-bezier(.4,0,.2,1)",
          opacity: bar.width ? 1 : 0,
        }}
      />
    </div>
  );
};

export default SubTabs;
