import React, { useState } from "react";
import ReferralHeader from "./components/ReferralHeader.jsx";
import PremierCard from "./components/PremierCard.jsx";
import VolumeSlider from "./components/VolumeSlider.jsx";
import CampaignCard from "./components/CampaignCard.jsx";
import StatsGrid from "./components/StatsGrid.jsx";
import ReferralLinkBar from "./components/ReferralLinkBar.jsx";
import QuickLinks from "./components/QuickLinks.jsx";
import ShareSheet from "./components/ShareSheet.jsx";
import ActiveInviteSheet from "./components/ActiveInviteSheet.jsx";
import { useReferral } from "./hooks/useReferral.js";
import { CAMPAIGNS } from "./data/config.js";
import { Link } from "react-router-dom";

const Referral = () => {
  const r = useReferral();
  const [share, setShare] = useState(false);
  const [active, setActive] = useState(false);

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
        title="Referral"
        fallback="/rewards"
        onMore={() => setShare(true)}
      />
      <PremierCard
        rebate={25}
        days={365}
        monthly={1300}
        onActivate={() => setActive(true)}
      />
      <VolumeSlider volume={r.state.stats.tradingVolume} max={2_500_000} />

      <div style={{ padding: "20px 16px 8px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
          My stats
        </div>
      </div>
      <StatsGrid
        stats={r.state.stats}
        tier={r.tier}
        commissions={r.state.commissions}
      />
      <ReferralLinkBar
        link={r.state.profile.link}
        code={r.state.profile.code}
        onShare={() => setShare(true)}
      />
      <QuickLinks />

      <div style={{ padding: "22px 16px 8px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
          Invitation activities
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "0 16px",
        }}
      >
        {CAMPAIGNS.map((c) => (
          <CampaignCard
            key={c.id}
            campaign={c}
            onClick={() => setShare(true)}
          />
        ))}
      </div>

      <div style={{ padding: "16px", marginTop: 16, display: "flex", gap: 10 }}>
        <Link onClick={() => r.repo.simulateNewReferral()} style={demoBtn}>
          + Simulate referral
        </Link>
        <Link
          onClick={() => {
            const id = r.state.invitees[0]?.id;
            if (id) r.repo.simulateTrade(id, 100);
          }}
          style={demoBtn}
        >
          + Simulate trade
        </Link>
      </div>

      <ShareSheet
        open={share}
        onClose={() => setShare(false)}
        code={r.state.profile.code}
        link={r.state.profile.link}
      />
      <ActiveInviteSheet
        open={active}
        onClose={() => setActive(false)}
        onInvite={() => {
          setActive(false);
          setShare(true);
        }}
        eligible={r.state.stats.kyc}
        volume={r.state.stats.tradingVolume}
      />
    </div>
  );
};

const demoBtn = {
  flex: 1,
  background: "#15181d",
  border: "1px solid #1c1f23",
  color: "#22c1c3",
  borderRadius: 10,
  padding: "10px 0",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};

export default Referral;
