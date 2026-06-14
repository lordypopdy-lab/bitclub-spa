import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sheet from "./Sheet.jsx";
import { ASSETS } from "../data/assets.js";
import { BalanceRepository } from "../repositories/index.js";

const CoinPickerSheet = ({ open, onClose, onSelect, selected }) => {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toUpperCase();
    return ASSETS.filter((a) => !s || a.symbol.includes(s) || a.name.toUpperCase().includes(s));
  }, [q]);
  return (
    <Sheet open={open} onClose={onClose} title="Select coin">
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#15181d", borderRadius: 10, padding: "10px 12px", gap: 8 }}>
          <FiSearch color="#7d828a" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }} />
        </div>
      </div>
      <div>
        {list.map((a) => {
          const b = BalanceRepository.get(a.symbol);
          const active = selected === a.symbol;
          return (
            <button key={a.symbol} onClick={() => { onSelect(a.symbol); onClose(); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: active ? "#0f1417" : "transparent", border: "none", color: "#fff", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{a.symbol[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{a.symbol}</div>
                <div style={{ fontSize: 12, color: "#7d828a" }}>{a.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 600 }}>{b.available}</div>
                <div style={{ fontSize: 11, color: "#7d828a" }}>≈ ${(b.available * a.priceUsd).toFixed(2)}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Sheet>
  );
};

export default CoinPickerSheet;
