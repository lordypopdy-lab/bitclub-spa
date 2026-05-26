import React, { useEffect, useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import CoinIcon from "../components/CoinIcon.jsx";

const SelectListSheet = ({
  open,
  title,
  items,
  onSelect,
  onClose,
  showSearch = true,
}) => {
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const filt = items.filter(
    (i) =>
      !q ||
      (i.code || i.symbol || "").toLowerCase().includes(q.toLowerCase()) ||
      (i.name || "").toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "fadeIn .2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#15171b",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: "16px 0 24px",
          maxHeight: "80vh",
          overflowY: "auto",
          animation: "slideUp .25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px 12px",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            {title}
          </div>
          <FiX
            color="#fff"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>
        {showSearch && (
          <div style={{ padding: "0 18px 14px" }}>
            <div
              style={{
                background: "#0a0b0d",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FiSearch color="#7d828a" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  outline: "none",
                  flex: 1,
                  fontSize: 14,
                }}
              />
            </div>
          </div>
        )}
        {filt.map((it) => (
          <div
            key={it.code || it.symbol}
            onClick={() => {
              onSelect(it);
              onClose();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 18px",
              cursor: "pointer",
            }}
          >
            <CoinIcon icon={it.icon} bg={it.bg} size={32} />
            <div style={{ fontWeight: 700, fontSize: 15 }}>
              {it.code || it.symbol}
            </div>
            {it.name && (
              <div style={{ color: "#7d828a", fontSize: 13 }}>{it.name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectListSheet;
