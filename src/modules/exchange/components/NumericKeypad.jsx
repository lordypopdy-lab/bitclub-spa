import React, { useRef } from "react";
import { FiDelete } from "react-icons/fi";

const NumericKeypad = ({ onInput, onDelete, onClear }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"];
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const longPressedRef = useRef(false);

  const startLongPress = () => {
    longPressedRef.current = false;
    timeoutRef.current = setTimeout(() => {
      longPressedRef.current = true;
      // immediate clear-all repeat
      intervalRef.current = setInterval(() => {
        onDelete();
      }, 60);
    }, 400);
  };

  const endLongPress = (triggerSingle) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
    if (triggerSingle && !longPressedRef.current) {
      onDelete();
    }
    longPressedRef.current = false;
  };

  const keyStyle = {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 26,
    fontWeight: 500,
    padding: "16px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.15s ease",
    borderRadius: 8,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 4,
        background: "#000",
        padding: "8px 8px 16px",
      }}
    >
      {keys.map((k) => {
        if (k === "del") {
          return (
            <button
              key={k}
              style={keyStyle}
              onMouseDown={startLongPress}
              onMouseUp={() => endLongPress(true)}
              onMouseLeave={() => endLongPress(false)}
              onTouchStart={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
                startLongPress();
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.background = "transparent";
                endLongPress(true);
              }}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Delete"
            >
              <FiDelete size={24} />
            </button>
          );
        }
        return (
          <button
            key={k}
            style={keyStyle}
            onClick={() => onInput(k)}
            onTouchStart={(e) => (e.currentTarget.style.background = "#1a1a1a")}
            onTouchEnd={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {k}
          </button>
        );
      })}
    </div>
  );
};

export default NumericKeypad;
