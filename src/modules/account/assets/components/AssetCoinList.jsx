import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import AssetCoinItem from "./AssetCoinItem.jsx";

const AssetCoinList = ({ title = "Assets", coins = [], showSearch = true, right = null }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = coins.filter(
    (c) =>
      c.symbol.toLowerCase().includes(q.toLowerCase()) ||
      (c.name || "").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          gap: 12,
        }}
      >
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, flex: 1 }}>{title}</div>
        {right}
        {showSearch && (
          <>
            <button
              onClick={() => setOpen((o) => !o)}
              style={{ background: "transparent", border: "none", color: "#cfd2d6", padding: 4, cursor: "pointer" }}
            >
              <FiSearch size={20} />
            </button>
            <button
              style={{ background: "transparent", border: "none", color: "#cfd2d6", padding: 4, cursor: "pointer" }}
            >
              <HiOutlineAdjustmentsHorizontal size={20} />
            </button>
          </>
        )}
      </div>
      {open && (
        <div style={{ padding: "0 16px 8px" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search assets"
            style={{
              width: "100%",
              background: "#16181c",
              border: "1px solid #1f2227",
              color: "#fff",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>
      )}
      <div>
        {filtered.map((c) => (
          <AssetCoinItem key={c.symbol} coin={c} />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#7d828a", fontSize: 13 }}>
            No assets
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCoinList;
