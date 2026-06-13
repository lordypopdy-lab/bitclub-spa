import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiMoreHorizontal, FiHelpCircle } from "react-icons/fi";

const ReferralHeader = ({
  title,
  onMore,
  onHelp,
  fallback = "/rewards",
  transparent = false,
}) => {
  const navigate = useNavigate();
  const back = () => {
    if (typeof window !== "undefined" && window.history.length > 1)
      navigate(-1);
    else navigate(fallback);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        background: transparent ? "transparent" : "#000",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <Link onClick={back} aria-label="Back" style={btn}>
        <FiArrowLeft size={22} />
      </Link>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        {title || ""}
      </div>
      {onHelp && (
        <Link onClick={onHelp} style={{ ...btn, marginRight: 14 }}>
          <FiHelpCircle size={18} />
        </Link>
      )}
      <Link onClick={onMore} style={btn}>
        <FiMoreHorizontal size={20} />
      </Link>
    </div>
  );
};

const btn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  padding: 0,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

export default ReferralHeader;
