import React, { useState } from "react";
import RewardsHeader from "./components/RewardsHeader.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import TaskCard from "./components/TaskCard.jsx";
import CheckInSheet from "./components/CheckInSheet.jsx";
import MysteryBoxSheet from "./components/MysteryBoxSheet.jsx";
import RulesFaqSheet from "./components/RulesFaqSheet.jsx";
import MoreMenuSheet from "./components/MoreMenuSheet.jsx";
import RewardsBottomNav from "./components/RewardsBottomNav.jsx";
import ReferralFab from "./components/ReferralFab.jsx";
import Toaster from "./components/Toaster.jsx";
import { useRewardsStore } from "./hooks/useRewardsStore.js";
import { TASKS } from "./data/config.js";

const Rewards = () => {
  const store = useRewardsStore();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleTaskAction = (task) => {
    const p = store.state.tasksProgress[task.id] || {
      progress: 0,
      claimed: false,
    };
    if (p.claimed) return;
    if (p.progress >= task.target) {
      store.claimTask(task.id);
      return;
    }
    // simulate activity per CTA
    if (task.id === "daily_login") store.recordActivity("login", 1);
    else if (task.id === "daily_spot") store.recordActivity("spotVolume", 20);
    else if (task.id === "daily_futures")
      store.recordActivity("futuresVolume", 200);
    else if (task.id === "daily_deposit") store.recordActivity("deposit", 1);
    else if (task.id === "referral") store.claimReferral();
    else if (task.id === "kyc") store.recordActivity("kyc", 1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 96,
      }}
    >
      <RewardsHeader
        onHelp={() => setRulesOpen(true)}
        onMore={() => setMoreOpen(true)}
        onShare={() => navigator.clipboard?.writeText(window.location.href)}
      />
      <SummaryCard
        points={store.state.points}
        couponsCount={
          store.state.coupons.filter((c) => c.status === "active").length
        }
        onCheckIn={() => setCheckInOpen(true)}
        tier={store.tier}
      />

      <div style={{ padding: "32px 16px 0" }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>
          Advanced tasks
        </div>
        <div
          style={{
            marginTop: 14,
            display: "inline-block",
            background: "#15181d",
            borderRadius: 8,
            padding: "8px 14px",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Daily tasks
        </div>

        {TASKS.map((t) => {
          const p = store.state.tasksProgress[t.id] || {
            progress: 0,
            claimed: false,
          };
          return (
            <TaskCard
              key={t.id}
              task={t}
              progress={p.progress}
              claimed={p.claimed}
              onAction={() => handleTaskAction(t)}
            />
          );
        })}
      </div>

      <CheckInSheet
        open={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        streak={store.state.streak}
        lastCheckInDate={store.state.lastCheckInDate}
        onCheckIn={() => {
          const r = store.checkIn();
          if (r?.type === "mystery") {
            setCheckInOpen(false);
            setBoxOpen(true);
          }
          return r;
        }}
        onOpenBox={() => {
          setCheckInOpen(false);
          setBoxOpen(true);
        }}
      />
      <MysteryBoxSheet
        open={boxOpen}
        onClose={() => setBoxOpen(false)}
        onOpen={store.openMysteryBox}
      />
      <RulesFaqSheet open={rulesOpen} onClose={() => setRulesOpen(false)} />
      <MoreMenuSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
      <Toaster notifs={store.state.notifs} onDismiss={store.dismissNotif} />
      <ReferralFab />
      <RewardsBottomNav />
    </div>
  );
};

export default Rewards;
