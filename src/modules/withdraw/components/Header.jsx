import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiClock, FiHelpCircle } from "react-icons/fi";

const Header = ({
  title,
  fallback = "/assets",
  showHistory = true,
  showHelp = false,
}) => {
  const navigate = useNavigate();
  const back = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback);
  };
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
        onClick={back}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: 6,
          cursor: "pointer",
        }}
      >
        <FiArrowLeft size={22} />
      </Link>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "#fff",
          fontSize: 17,
          fontWeight: 700,
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
