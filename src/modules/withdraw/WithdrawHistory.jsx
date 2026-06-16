import React, { useMemo, useState } from "react";
import { FiInbox, FiFilter, FiSearch } from "react-icons/fi";
import Header from "./components/Header.jsx";
import Sheet from "./components/Sheet.jsx";
import { useWithdrawals } from "./hooks/useWithdraw.js";
import { ASSETS } from "./data/assets.js";
import { Link } from "react-router-dom";

const STATUSES = ["all", "pending", "processing", "completed", "rejected"];

const statusColor = (s) =>
  ({
    pending: "#fcd9a0",
    processing: "#22c1c3",
    completed: "#22c55e",
    rejected: "#ef4444",
    cancelled: "#7d828a",
    approved: "#22c1c3",
  })[s] || "#9aa0a8";

const WithdrawHistory = () => {
  const list = useWithdrawals();
  const [status, setStatus] = useState("all");
  const [coinOpen, setCoinOpen] = useState(false);
  const [coin, setCoin] = useState("ALL");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    return list.filter(
      (t) =>
        (status === "all" || t.status === status) &&
        (coin === "ALL" || t.symbol === coin) &&
        (!q ||
          (t.id + t.address + t.symbol)
            .toLowerCase()
            .includes(q.toLowerCase())),
    );
  }, [list, status, coin, q]);

  const pageData = filtered.slice(0, page * perPage);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
        background: "#000",
        color: "#fff",
        paddingBottom: 60,
      }}
    >
      <Header
        title="Withdrawal records"
        fallback="/assets/withdraw"
        showHistory={false}
      />

      <div
        style={{
          padding: "0 16px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 12,
            minWidth: 0,
          }}
        >
          <Link
            onClick={() => setCoinOpen(true)}
            style={{
              background: "#0f1115",
              border: "1px solid #1c1f23",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {coin} ▾
          </Link>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              background: "#15181d",
              borderRadius: 999,
              padding: "8px 12px",
              gap: 8,
            }}
          >
            <FiSearch color="#7d828a" size={14} style={{ flexShrink: 0 }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ID/address"
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 13,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            paddingBottom: 12,
          }}
        >
          {STATUSES.map((s) => (
            <Link
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid " + (status === s ? "#22c1c3" : "#1c1f23"),
                background: status === s ? "rgba(34,193,195,0.1)" : "#0f1115",
                color: status === s ? "#22c1c3" : "#cfd2d6",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "capitalize",
                flexShrink: 0,
              }}
            >
              {s}
            </Link>
          ))}
        </div>

        {pageData.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#7d828a" }}
          >
            <FiInbox size={56} color="#3a3f47" />
            <div style={{ marginTop: 12 }}>No content found.</div>
          </div>
        ) : (
          <div>
            {pageData.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: 14,
                  background: "#0a0c0f",
                  border: "1px solid #1c1f23",
                  borderRadius: 12,
                  marginBottom: 10,
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.type === "internal"
                        ? "Internal"
                        : t.type === "sell"
                          ? "Sell"
                          : "Withdraw"}{" "}
                      · {t.symbol}
                    </span>
                  </div>
                  <span
                    style={{
                      color: statusColor(t.status),
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "capitalize",
                      flexShrink: 0,
                    }}
                  >
                    {t.status}
                  </span>
                </div>
                <div
                  style={{
                    color: "#9aa0a8",
                    fontSize: 12,
                    marginTop: 4,
                    wordBreak: "break-all",
                  }}
                >
                  {t.id} · {new Date(t.createdAt).toLocaleString()}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#9aa0a8",
                      fontSize: 13,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    To {String(t.address).slice(0, 12)}…
                  </span>
                  <span
                    style={{ color: "#fff", fontWeight: 700, flexShrink: 0 }}
                  >
                    -{t.amount} {t.symbol}
                  </span>
                </div>
                {t.fee > 0 && (
                  <div style={{ color: "#7d828a", fontSize: 12, marginTop: 4 }}>
                    Fee {t.fee} {t.type === "sell" ? t.fiat : t.symbol}
                  </div>
                )}
              </div>
            ))}
            {pageData.length < filtered.length && (
              <Link
                onClick={() => setPage((p) => p + 1)}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "transparent",
                  border: "1px solid #1c1f23",
                  color: "#22c1c3",
                  borderRadius: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Load more
              </Link>
            )}
          </div>
        )}
      </div>

      <Sheet
        open={coinOpen}
        onClose={() => setCoinOpen(false)}
        title="Select coin"
      >
        <Link
          onClick={() => {
            setCoin("ALL");
            setCoinOpen(false);
          }}
          style={{
            width: "100%",
            padding: 14,
            background: coin === "ALL" ? "#0f1417" : "transparent",
            border: "none",
            color: "#fff",
            textAlign: "left",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ALL COINS
        </Link>
        {ASSETS.map((a) => (
          <Link
            key={a.symbol}
            onClick={() => {
              setCoin(a.symbol);
              setCoinOpen(false);
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              background: coin === a.symbol ? "#0f1417" : "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: a.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {a.symbol[0]}
            </div>
            <div style={{ fontWeight: 700 }}>{a.symbol}</div>
          </Link>
        ))}
      </Sheet>
    </div>
  );
};

export default WithdrawHistory;
