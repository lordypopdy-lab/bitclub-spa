import React from "react";
import { Link } from "react-router-dom";
import { FiHelpCircle } from "react-icons/fi";

const TaskCard = ({ task, progress, claimed, onAction }) => {
  const pct = Math.min(100, Math.round((progress / task.target) * 100));
  const completed = progress >= task.target;
  const label = claimed ? "Claimed" : completed ? "Claim" : task.cta;
  return (
    <div
      style={{
        border: "1px solid #1c1f23",
        borderRadius: 14,
        padding: 16,
        background: "#0a0c0f",
        marginTop: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
          {task.title}
        </div>
        <FiHelpCircle size={14} color="#7d828a" />
      </div>
      <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
        {task.description}
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            borderRadius: 999,
            background: "#1c1f23",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "linear-gradient(90deg, #22c1c3, #1aa6a8)",
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <div
          style={{
            color: "#cfd2d6",
            fontSize: 12,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {progress}
          {task.unit ? "" : ""}/{task.target}
          {task.unit ? ` ${task.unit}` : ""}
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#22c1c3",
              fontSize: 22,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {task.points}
          </div>
          <div style={{ color: "#22c1c3", fontSize: 12, marginTop: 4 }}>
            Points
          </div>
        </div>
        <Link
          onClick={onAction}
          disabled={claimed}
          style={{
            background: claimed ? "#1c1f23" : "#fff",
            color: claimed ? "#7d828a" : "#0a0c0f",
            border: "none",
            borderRadius: 10,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: 600,
            cursor: claimed ? "default" : "pointer",
            minWidth: 110,
          }}
        >
          {label}
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
