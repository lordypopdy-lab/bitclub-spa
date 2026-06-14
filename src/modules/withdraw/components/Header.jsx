import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiClock, FiHelpCircle } from "react-icons/fi";

const Header = ({ title, showHistory = true }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 14px",
        gap: 10,
        position: "sticky",
        top: 0,
        background: "#000",
        zIndex: 5,
      }}
    >
      <Link
        to={-1}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: 6,
          cursor: "pointer",
        }}
      >
        <FiArrowLeft size={21} />
      </Link>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      {showHistory && (
        <Link
          to="/assets/withdraw/history"
          style={{
            background: "transparent",
            border: "none",
            color: "#cfd2d6",
            padding: 6,
            cursor: "pointer",
          }}
        >
          <FiClock size={20} />
        </Link>
      )}
    </div>
  );
};

export default Header;
