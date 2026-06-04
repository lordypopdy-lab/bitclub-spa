import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowLeft, FiSearch, FiX, FiClock, FiTrash2 } from "react-icons/fi";
import {
  TOP_SEARCHES,
  TRENDING,
  CATEGORIES,
  coinIcon,
} from "./data/searchData.js";
import useSearchMemory from "./hooks/useSearchMemory.js";

const fmt = (n) => {
  if (typeof n !== "number") return n;
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(5);
  return n.toFixed(5);
};

const Avatar = ({ symbol, size = 32 }) => {
  const { icon, bg } = coinIcon(symbol);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: "#fff",
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
};

const RankNum = ({ n }) => (
  <span
    style={{
      width: 22,
      textAlign: "center",
      color: n <= 3 ? "#f5a623" : "#5b6068",
      fontWeight: 700,
      fontSize: 16,
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {n}
  </span>
);

const Pct = ({ v }) => {
  const positive = v >= 0;
  return (
    <div
      style={{
        color: positive ? "#22d3c5" : "#ff5577",
        fontSize: 13,
        fontWeight: 600,
        marginTop: 4,
        fontVariantNumeric: "tabular-nums",
        textAlign: "right",
      }}
    >
      {positive ? "+" : ""}
      {typeof v === "number" ? v.toFixed(2) : v}%
    </div>
  );
};

const Badge = ({ children }) => (
  <span
    style={{
      fontSize: 10,
      color: "#cfd2d8",
      border: "1px solid #2a2e34",
      borderRadius: 4,
      padding: "1px 5px",
      fontWeight: 600,
      marginLeft: 4,
    }}
  >
    {children}
  </span>
);

const RowSpot = ({ item }) => (
  <div style={rowStyle}>
    <RankNum n={item.rank} />
    <Avatar symbol={item.symbol} />
    <div style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
          {item.symbol}
        </span>
        <span style={{ color: "#7d828a", fontSize: 14 }}>/ {item.quote}</span>
        {item.leverage && <Badge>{item.leverage}</Badge>}
      </div>
      {item.tag && (
        <div style={{ color: "#22d3ee", fontSize: 12, marginTop: 2 }}>
          {item.tag}
        </div>
      )}
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={priceStyle}>{fmt(item.price)}</div>
      <Pct v={item.change} />
    </div>
  </div>
);

const RowFut = ({ item }) => (
  <div style={rowStyle}>
    <RankNum n={item.rank} />
    <Avatar symbol={item.symbol} />
    <div
      style={{
        flex: 1,
        minWidth: 0,
        marginLeft: 12,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
        {item.pair}
      </span>
      <Badge>{item.badge}</Badge>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={priceStyle}>{fmt(item.price)}</div>
      <Pct v={item.change} />
    </div>
  </div>
);

const RowOnchain = ({ item }) => (
  <div style={rowStyle}>
    <RankNum n={item.rank} />
    <Avatar symbol={item.symbol} />
    <div style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
        {item.symbol}
      </div>
      <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>
        {item.vol}
      </div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={priceStyle}>{item.price}</div>
      <Pct v={item.change} />
    </div>
  </div>
);

const RowTradFi = ({ item }) => (
  <div style={rowStyle}>
    <RankNum n={item.rank} />
    <Avatar symbol={item.symbol} />
    <div style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
          {item.symbol}
        </span>
        {item.closed && <Badge>Closed</Badge>}
      </div>
      <div style={{ color: "#7d828a", fontSize: 12, marginTop: 2 }}>
        {item.name} <span style={{ color: "#22d3ee" }}>| {item.category}</span>
      </div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={priceStyle}>{fmt(item.price)}</div>
      <Pct v={item.change} />
    </div>
  </div>
);

const rowStyle = {
  display: "flex",
  alignItems: "center",
  padding: "14px 16px",
  borderBottom: "1px solid #0f1216",
  gap: 4,
};
const priceStyle = {
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  fontVariantNumeric: "tabular-nums",
};

const renderRow = (cat, item, key) => {
  if (cat === "Spot") return <RowSpot key={key} item={item} />;
  if (cat === "Futures") return <RowFut key={key} item={item} />;
  if (cat === "Onchain") return <RowOnchain key={key} item={item} />;
  return <RowTradFi key={key} item={item} />;
};

const SearchOverlay = ({ open, onClose }) => {
  const mem = useSearchMemory();
  const [localQ, setLocalQ] = useState(mem.query);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setLocalQ(mem.query);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(
      () => inputRef.current && inputRef.current.focus(),
      200,
    );
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // debounce write to memory
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => mem.setQuery(localQ), 200);
    return () => clearTimeout(t);
  }, [localQ, open]);

  const cat = mem.category;
  const list = TOP_SEARCHES[cat] || [];

  const filtered = useMemo(() => {
    const q = localQ.trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) => {
      const fields = [it.symbol, it.pair, it.name, it.quote, it.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return fields.includes(q);
    });
  }, [localQ, list]);

  const onSubmit = (e) => {
    e.preventDefault();
    mem.addHistory(localQ);
  };

  const pickHistory = (v) => {
    setLocalQ(v);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        animation: "searchSlideUp .25s ease",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style>{`
        @keyframes searchSlideUp { from { transform: translateY(16px); opacity:.4 } to { transform:none; opacity:1 } }
        @keyframes underlineSlide { from { transform: scaleX(.3); opacity:.4 } to { transform: scaleX(1); opacity:1 } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px) } to { opacity:1; transform:none } }
        .so-tap:active { background: #15181d !important; }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 12px 10px",
          background: "#000",
        }}
      >
        <Link onClick={onClose} aria-label="Back" style={iconBtn}>
          <FiArrowLeft size={22} />
        </Link>
        <form
          onSubmit={onSubmit}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#15181d",
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <input
            ref={inputRef}
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="ZEC"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 15,
              caretColor: "#22d3ee",
            }}
          />
          {localQ && (
            <Link
              type="button"
              onClick={() => setLocalQ("")}
              style={{
                background: "transparent",
                border: "none",
                color: "#7d828a",
                padding: 0,
              }}
              aria-label="Clear"
            >
              <FiX size={16} />
            </Link>
          )}
        </form>
        <Link style={iconBtn} aria-label="Search">
          <FiSearch size={20} />
        </Link>
      </div>

      {/* Scroll body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Section title */}
        <div
          style={{
            padding: "8px 16px 12px",
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          Top searches
        </div>

        {/* Tabs */}
        <Tabs active={cat} onChange={mem.setCategory} />

        {/* History (only when no query) */}
        {!localQ && mem.history.length > 0 && (
          <div
            style={{ padding: "14px 16px 4px", animation: "fadeIn .25s ease" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  color: "#7d828a",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FiClock size={13} /> Recent
              </div>
              <Link
                onClick={mem.clearHistory}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#7d828a",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <FiTrash2 size={12} /> Clear
              </Link>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {mem.history.map((h) => (
                <div
                  key={h}
                  style={chipStyle}
                  className="so-tap"
                  onClick={() => pickHistory(h)}
                >
                  <span>{h}</span>
                  <FiX
                    size={12}
                    style={{ marginLeft: 6, color: "#7d828a" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      mem.removeHistory(h);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending (only when no query) */}
        {!localQ && (
          <div
            style={{ padding: "14px 16px 4px", animation: "fadeIn .25s ease" }}
          >
            <div style={{ color: "#7d828a", fontSize: 13, marginBottom: 10 }}>
              Trending
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TRENDING.map((t) => (
                <div
                  key={t}
                  style={chipStyle}
                  className="so-tap"
                  onClick={() => pickHistory(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List */}
        <div
          key={cat + "|" + localQ}
          style={{ animation: "fadeIn .25s ease", paddingTop: 6 }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "40px 16px",
                textAlign: "center",
                color: "#7d828a",
              }}
            >
              No results for "{localQ}"
            </div>
          ) : (
            filtered.map((it, i) => renderRow(cat, it, cat + i))
          )}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
};

const iconBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  padding: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const chipStyle = {
  background: "#15181d",
  color: "#cfd2d6",
  borderRadius: 999,
  padding: "8px 14px",
  fontSize: 13,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
};

const Tabs = ({ active, onChange }) => {
  const refs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div style={{ position: "relative", padding: "0 12px" }}>
      <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          return (
            <Link
              key={c}
              ref={(el) => (refs.current[c] = el)}
              onClick={() => onChange(c)}
              style={{
                background: isActive ? "#1a1d22" : "transparent",
                border: "none",
                color: isActive ? "#fff" : "#7d828a",
                fontWeight: isActive ? 700 : 500,
                fontSize: 15,
                padding: "8px 14px",
                borderRadius: 8,
                whiteSpace: "nowrap",
                transition: "color .2s, background .2s",
              }}
            >
              {c}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchOverlay;
