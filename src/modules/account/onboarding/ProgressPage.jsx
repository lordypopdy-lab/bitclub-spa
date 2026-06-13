import React, { useEffect, useState } from "react";
import ProgressHeader from "./components/ProgressHeader.jsx";
import ProgressSummary from "./components/ProgressSummary.jsx";
import JourneyTimeline from "./components/JourneyTimeline.jsx";
import ProgressFooter from "./components/ProgressFooter.jsx";
import { useOnboarding } from "./hooks/useOnboarding.js";
import { Link } from "react-router-dom";

const ProgressPage = () => {
  const { state, steps, next, cta, repo } = useOnboarding();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleClaim = () => {
    const ok = repo.claimReward();
    setToast(
      ok
        ? "+50 points, voucher & mystery box unlocked!"
        : "Reward already claimed.",
    );
    return ok;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 120,
      }}
    >
      <ProgressHeader fallback="/" />
      <ProgressSummary
        progress={state.progress}
        completedSteps={state.completedSteps}
        totalSteps={state.totalSteps}
        next={next}
        completed={state.onboardingCompleted}
      />
      <div
        style={{ height: 1, background: "#1c1f23", margin: "20px 16px 0" }}
      />
      <JourneyTimeline steps={steps} />

      <div
        style={{
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            color: "#7d828a",
            fontSize: 11,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          Developer simulation
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link onClick={() => repo.completeKyc()} style={demoBtn}>
            ✓ Approve KYC
          </Link>
          <Link onClick={() => repo.completeFirstDeposit()} style={demoBtn}>
            ✓ Mark deposit
          </Link>
          <Link onClick={() => repo.completeFirstTrade()} style={demoBtn}>
            ✓ Mark trade
          </Link>
          <Link
            onClick={() => repo.reset()}
            style={{ ...demoBtn, color: "#ec4899", borderColor: "#3a1f2a" }}
          >
            Reset
          </Link>
        </div>
      </div>

      <ProgressFooter cta={cta} onClaim={handleClaim} />

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 100,
            transform: "translateX(-50%)",
            background: "#0f1115",
            border: "1px solid #22c1c3",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 6px 20px rgba(34,193,195,0.3)",
            zIndex: 100,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};

const demoBtn = {
  background: "#0f1115",
  border: "1px solid #1c1f23",
  color: "#22c1c3",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};

export default ProgressPage;
