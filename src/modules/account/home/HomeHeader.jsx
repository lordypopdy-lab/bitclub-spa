import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiHeadphones, FiBell } from "react-icons/fi";
import SearchOverlay from "../home/search/SearchOverlay.jsx";
import { useNotificationsStore } from "../../notifications/hooks/useNotificationsStore.js";

const HomeHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { totalUnread } = useNotificationsStore();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px 8px",
          background: "#000",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontWeight: 800,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          B
        </div>
        <Link
          onClick={() => setOpen(true)}
          aria-label="Open search"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#15181d",
            borderRadius: 999,
            padding: "8px 14px",
            color: "#7d828a",
            fontSize: 13,
            border: "none",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <FiSearch size={15} />
          <span>preOPAI</span>
        </Link>
        <Link
          style={{
            background: "transparent",
            border: "none",
            color: "#cfd2d6",
            padding: 6,
          }}
        >
          <FiHeadphones size={20} />
        </Link>
        <Link
          to="/notifications"
          aria-label="Notifications"
          style={{
            background: "transparent",
            border: "none",
            color: "#cfd2d6",
            position: "relative",
            padding: 6,
            cursor: "pointer",
          }}
        >
          <FiBell size={20} />
          {totalUnread > 0 ? (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                minWidth: 14,
                height: 14,
                padding: "0 4px",
                borderRadius: 999,
                background: "#ef4444",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          ) : (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c1c3",
              }}
            />
          )}
        </Link>
      </div>
      <SearchOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HomeHeader;
