import React, { useState } from "react";
import Sheet from "./Sheet.jsx";
import { CHECKIN_REWARDS } from "../data/config.js";
import { FiGift } from "react-icons/fi";
import { Link } from "react-router-dom";

const CheckInSheet = ({
  open,
  onClose,
  streak,
  lastCheckInDate,
  onCheckIn,
  onOpenBox,
}) => {
  const [justChecked, setJustChecked] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const alreadyToday = lastCheckInDate === today;
  const completed = alreadyToday ? streak : Math.max(0, streak - 1); // days already done
  // Day index 0..6
  const handleCheck = () => {
    const r = onCheckIn();
    if (r) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 1800);
    }
  };

  return (
    <Sheet open={open} onClose={onClose} title="" showClose>
      <div style={{ textAlign: "center", marginTop: -28 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>
          {alreadyToday ? "Checked in" : "Daily check-in"}
        </div>
        <div
          style={{
            color: "#9aa0a8",
            fontSize: 13,
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          Completed check-in for {streak} day(s) in a row. Check in for{" "}
          {Math.max(0, 7 - streak)} more day(s) to get a Mystery Box worth up to
          300 USDT.
        </div>
      </div>
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {CHECKIN_REWARDS.slice(0, 6).map((reward, i) => {
          const dayNum = i + 1;
          const isDone = dayNum <= completed;
          const isNext = dayNum === completed + 1 && !alreadyToday;
          return (
            <div key={i} style={cellStyle(isDone, isNext)}>
              <div
                style={{
                  color: isNext ? "#0a0c0f" : "#9aa0a8",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {dayNum === completed + 1 && !alreadyToday
                  ? "Tomorrow"
                  : `Day ${dayNum}`}
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isDone ? (
                  <div
                    style={{ color: "#22c55e", fontSize: 22, fontWeight: 800 }}
                  >
                    ✓
                  </div>
                ) : (
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      border: "1.5px solid #2a2e35",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#22c1c3",
                      fontWeight: 800,
                    }}
                  >
                    $
                  </div>
                )}
              </div>
              <div
                style={{
                  color: isNext ? "#0a0c0f" : "#cfd2d6",
                  fontSize: 13,
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                +{reward}
              </div>
            </div>
          );
        })}
        <div />
        <div style={mysteryStyle(streak >= 7)}>
          <div style={{ color: "#9aa0a8", fontSize: 13, fontWeight: 600 }}>
            Day 7
          </div>
          <div
            style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
          >
            <FiGift size={30} color="#22c1c3" />
          </div>
          {streak >= 7 && (
            <Link
              onClick={onOpenBox}
              style={{
                marginTop: 8,
                background: "transparent",
                border: "none",
                color: "#22c1c3",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Open
            </Link>
          )}
        </div>
        <div />
      </div>
      <Link
        onClick={handleCheck}
        disabled={alreadyToday}
        style={{
          marginTop: 22,
          width: "100%",
          background: alreadyToday ? "#1c1f23" : "#fff",
          color: alreadyToday ? "#7d828a" : "#0a0c0f",
          border: "none",
          borderRadius: 12,
          padding: "14px",
          fontSize: 14,
          fontWeight: 700,
          cursor: alreadyToday ? "default" : "pointer",
        }}
      >
        {justChecked
          ? "Check in successful! Claim more points now!"
          : alreadyToday
            ? "Already checked in today"
            : "Check in"}
      </Link>
    </Sheet>
  );
};

const cellStyle = (done, next) => ({
  borderRadius: 12,
  padding: "12px 8px",
  textAlign: "center",
  background: next ? "#22c1c3" : "#15181d",
  border: next ? "1px solid #22c1c3" : "1px solid #1c1f23",
  boxShadow: next ? "0 0 16px rgba(34,193,195,0.35)" : "none",
  opacity: done ? 0.85 : 1,
});

const mysteryStyle = () => ({
  borderRadius: 12,
  padding: "12px 8px",
  textAlign: "center",
  background: "#15181d",
  border: "1px solid #1c1f23",
});

export default CheckInSheet;
