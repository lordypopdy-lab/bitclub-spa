import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const ProgressHeader = () => {
  return (
    <div
      style={{ padding: "12px 16px 0", display: "flex", alignItems: "center" }}
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
        <FiArrowLeft size={22} />
      </Link>
    </div>
  );
};

export default ProgressHeader;
