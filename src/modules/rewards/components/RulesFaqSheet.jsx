import React, { useState } from "react";
import Sheet from "./Sheet.jsx";
import { Link } from "react-router-dom";
import { RULES_TEXT, FAQ_ITEMS } from "../data/config.js";
import { FiPlus, FiMinus } from "react-icons/fi";

const RulesFaqSheet = ({ open, onClose }) => {
  const [tab, setTab] = useState("rules");
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <Sheet open={open} onClose={onClose} title="" showClose>
      <div
        style={{ display: "flex", gap: 24, marginTop: -28, marginBottom: 16 }}
      >
        {["rules", "faq"].map((k) => (
          <Link
            key={k}
            onClick={() => setTab(k)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              color: tab === k ? "#fff" : "#7d828a",
              fontWeight: tab === k ? 800 : 600,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {k === "rules" ? "Rules" : "FAQ"}
          </Link>
        ))}
      </div>
      {tab === "rules" ? (
        <div
          style={{
            color: "#9aa0a8",
            fontSize: 14.5,
            lineHeight: 1.55,
            paddingBottom: 8,
          }}
        >
          {RULES_TEXT.map((p, i) => (
            <p key={i} style={{ marginBottom: 16, whiteSpace: "pre-line" }}>
              {i + 1}. {p}
            </p>
          ))}
        </div>
      ) : (
        <div>
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{ borderBottom: "1px solid #1c1f23", padding: "18px 0" }}
              >
                <Link
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      flex: 1,
                    }}
                  >
                    {f.q}
                  </span>
                  {isOpen ? (
                    <FiMinus color="#cfd2d6" />
                  ) : (
                    <FiPlus color="#cfd2d6" />
                  )}
                </Link>
                {isOpen && (
                  <div
                    style={{
                      color: "#9aa0a8",
                      fontSize: 14,
                      lineHeight: 1.55,
                      marginTop: 12,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Sheet>
  );
};

export default RulesFaqSheet;
