import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

const NotificationHeader = ({ title, onAction, actionIcon, fallback = "/" }) => {
  const navigate = useNavigate();
  const back = () => {
    if (typeof window !== "undefined" && window.history.length > 1)
      window.history.back();
    else navigate( fallback );
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        background: "#000",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <button
        onClick={back}
        aria-label="Back"
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: 0,
          width: 36,
          display: "flex",
          alignItems: "center",
        }}
      >
        <FiArrowLeft size={22} />
      </button>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "#fff",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <div
        style={{
          minWidth: 36,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {onAction ? (
          <button
            onClick={onAction}
            aria-label="Clear"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {actionIcon || <FaRegTrashAlt size={18} />}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationHeader;
