import React, { useEffect, useRef, useState } from "react";

const useCountUp = (v, dur = 700) => {
  const [n, setN] = useState(v);
  const prev = useRef(v);
  useEffect(() => {
    const from = prev.current,
      to = v,
      start = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setN(Math.round(from + (to - from) * e));
      if (k < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, dur]);
  return n;
};

const ProgressSummary = ({
  progress,
  completedSteps,
  totalSteps,
  next,
  completed,
}) => {
  const n = useCountUp(progress);
  return (
    <div style={{ padding: "8px 16px 0", marginTop: 18 }}>
      <div
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Your progress
      </div>
      <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 10 }}>
        You are almost ready to start your trading journey on BITCLUB!
      </div>

      <div
        style={{
          marginTop: 18,
          background:
            "linear-gradient(180deg, rgba(34,193,195,0.08), rgba(255,255,255,0.02))",
          border: "1px solid #1c1f23",
          borderRadius: 16,
          padding: 16,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                color: "#9aa0a8",
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Completion
            </div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 27,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {n}
              <span style={{ color: "#22c1c3" }}>%</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#9aa0a8", fontSize: 11, marginBottom: 9 }}>
              {completedSteps} of {totalSteps} steps
            </div>
            <div
              style={{
                color: "#fcd9a0",
                fontSize: 12,
                marginTop: 4,
                fontWeight: 700,
              }}
            >
              {completed
                ? "All done — claim your reward"
                : `Next: ${next?.title || "—"}`}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            height: 6,
            background: "#15181d",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${n}%`,
              height: "100%",
              background: "linear-gradient(90deg, #22c1c3, #7ee8e9)",
              borderRadius: 999,
              boxShadow: "0 0 12px rgba(34,193,195,0.5)",
              transition: "width 600ms ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
