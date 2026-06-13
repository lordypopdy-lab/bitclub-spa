import React, { useState } from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import PremierCard from "./components/PremierCard.jsx";
import VolumeSlider from "./components/VolumeSlider.jsx";
import ActiveInviteSheet from "./components/ActiveInviteSheet.jsx";
import { useReferral } from "./hooks/useReferral.js";
import { FAQ, TIERS } from "./data/config.js";
import Sheet from "../rewards/components/Sheet.jsx";

const PremierInviter = () => {
  const r = useReferral();
  const [active, setActive] = useState(false);
  const [faq, setFaq] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 40,
      }}
    >
      <ReferralHeader
        title=""
        fallback="/referral"
        onHelp={() => setFaq(true)}
        onMore={() => {}}
      />
      <PremierCard
        rebate={25}
        days={365}
        monthly={1300}
        onActivate={() => setActive(true)}
      />
      <VolumeSlider volume={r.state.stats.tradingVolume} max={2_500_000} />

      <div style={{ padding: "24px 16px 8px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>
          Tier benefits
        </div>
      </div>
      <div
        style={{
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {TIERS.map((t) => {
          const unlocked = r.state.stats.tradingVolume >= t.minVolume;
          return (
            <div
              key={t.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#0f1115",
                border: `1px solid ${unlocked ? t.color + "55" : "#1c1f23"}`,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: `${t.color}22`,
                  border: `1px solid ${t.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.color,
                  fontWeight: 800,
                }}
              >
                {t.rebate}%
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  {t.name}
                </div>
                <div style={{ color: "#7d828a", fontSize: 11, marginTop: 2 }}>
                  ≥ ${(t.minVolume / 1000).toLocaleString()}K volume
                </div>
              </div>
              <div
                style={{
                  color: unlocked ? "#22c1c3" : "#7d828a",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {unlocked ? "UNLOCKED" : "LOCKED"}
              </div>
            </div>
          );
        })}
      </div>

      <ActiveInviteSheet
        open={active}
        onClose={() => setActive(false)}
        onInvite={() => setActive(false)}
        eligible={r.state.stats.kyc}
        volume={r.state.stats.tradingVolume}
      />
      <Sheet open={faq} onClose={() => setFaq(false)} title="FAQ">
        {FAQ.map((f, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              <span>{i + 1}</span>
              <span>{f.q}</span>
            </div>
            <div
              style={{
                color: "#9aa0a8",
                fontSize: 13,
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              {f.a}
            </div>
          </div>
        ))}
      </Sheet>
    </div>
  );
};

export default PremierInviter;
