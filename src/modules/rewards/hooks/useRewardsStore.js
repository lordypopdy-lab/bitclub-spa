import { useEffect, useState, useCallback } from "react";
import {
  CHECKIN_REWARDS,
  MYSTERY_BOX_REWARDS,
  TASKS,
  REDEEM_ITEMS,
  TIERS,
} from "../data/config.js";

const STORAGE_KEY = "bitclub_rewards_state_v1";

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const initial = () => ({
  points: 3,
  totalEarned: 3,
  totalRedeemed: 0,
  streak: 1,
  lastCheckInDate: todayStr(),
  checkInDays: [todayStr()],
  totalCheckIns: 1,
  tasksProgress: {}, // taskId -> { progress, claimed, lastDay }
  tasksDay: todayStr(),
  coupons: [], // { id, type, value, code, status, expiry, redeemedAt }
  history: [], // { id, type, description, points, ts }
  referral: { code: "BITCLUB-USR-9F2A", invited: 0, signedUp: 0, deposited: 0, claimed: false },
  notifs: [], // ephemeral toasts: { id, message, ts }
});

let memory = null;
const listeners = new Set();

const loadInitial = () => {
  if (typeof window === "undefined") return initial();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...initial(), ...JSON.parse(raw) };
  } catch (e) {}
  return initial();
};

const persist = (s) => {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
};

const set = (updater) => {
  const next = typeof updater === "function" ? updater(memory) : updater;
  memory = next;
  persist(next);
  listeners.forEach((l) => l(next));
};

const dayDiff = (a, b) => {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db - da) / 86400000);
};

const pickWeighted = (arr) => {
  const total = arr.reduce((s, r) => s + r.weight, 0);
  let n = Math.random() * total;
  for (const r of arr) { n -= r.weight; if (n <= 0) return r; }
  return arr[0];
};

const newId = () => Math.random().toString(36).slice(2, 10);

const pushHistory = (s, entry) => {
  s.history = [{ id: newId(), ts: Date.now(), ...entry }, ...s.history].slice(0, 200);
};

const pushNotif = (s, message) => {
  s.notifs = [...s.notifs, { id: newId(), message, ts: Date.now() }].slice(-5);
};

const tierFor = (totalEarned) => {
  let t = TIERS[0];
  for (const x of TIERS) if (totalEarned >= x.min) t = x;
  return t;
};

const rolloverIfNewDay = (s) => {
  const today = todayStr();
  if (s.tasksDay !== today) {
    const fresh = {};
    for (const t of TASKS) {
      if (t.oneTime && s.tasksProgress[t.id]?.claimed) {
        fresh[t.id] = s.tasksProgress[t.id];
      } else {
        fresh[t.id] = { progress: 0, claimed: false };
      }
    }
    s.tasksProgress = fresh;
    s.tasksDay = today;
  } else {
    // ensure all tasks exist
    for (const t of TASKS) {
      if (!s.tasksProgress[t.id]) s.tasksProgress[t.id] = { progress: 0, claimed: false };
    }
  }
  return s;
};

export const useRewardsStore = () => {
  if (!memory) memory = rolloverIfNewDay(loadInitial());
  const [state, setLocal] = useState(memory);

  useEffect(() => {
    const l = (s) => setLocal(s);
    listeners.add(l);
    // run rollover on mount (in case it's a new day)
    set((s) => rolloverIfNewDay({ ...s }));
    return () => listeners.delete(l);
  }, []);

  const checkIn = useCallback(() => {
    let result = null;
    set((s) => {
      const today = todayStr();
      if (s.lastCheckInDate === today && s.checkInDays.includes(today) && s.streak > 0 && s.totalCheckIns > 0) {
        // Already checked in today
        return s;
      }
      const diff = s.lastCheckInDate ? dayDiff(s.lastCheckInDate, today) : 1;
      let streak = diff === 1 ? s.streak + 1 : 1;
      if (streak > 7) streak = 1;
      const reward = CHECKIN_REWARDS[streak - 1];
      const next = { ...s, streak, lastCheckInDate: today, totalCheckIns: s.totalCheckIns + 1, checkInDays: [...s.checkInDays, today].slice(-30) };
      if (reward === "mystery") {
        // handled separately by openMysteryBox
        result = { type: "mystery", day: streak };
        pushHistory(next, { type: "checkin", description: `Day ${streak} check-in: Mystery Box unlocked`, points: 0 });
        pushNotif(next, "Day 7 check-in! Mystery Box unlocked");
      } else {
        next.points += reward;
        next.totalEarned += reward;
        result = { type: "points", day: streak, value: reward };
        pushHistory(next, { type: "checkin", description: `Day ${streak} check-in reward`, points: reward });
        pushNotif(next, `Daily check-in completed +${reward} Points`);
      }
      return next;
    });
    return result;
  }, []);

  const openMysteryBox = useCallback(() => {
    const reward = pickWeighted(MYSTERY_BOX_REWARDS);
    set((s) => {
      const next = { ...s };
      if (reward.kind === "points") {
        next.points += reward.value;
        next.totalEarned += reward.value;
        pushHistory(next, { type: "mystery", description: `Mystery Box: +${reward.value} Points`, points: reward.value });
      } else {
        next.coupons = [
          { id: newId(), type: "Crypto voucher", value: reward.value, unit: "USDT", code: `MB-${newId().toUpperCase()}`, status: "active", expiry: Date.now() + 14 * 86400000, ts: Date.now() },
          ...next.coupons,
        ];
        pushHistory(next, { type: "mystery", description: `Mystery Box: ${reward.value} USDT voucher`, points: 0 });
      }
      pushNotif(next, `Mystery Box opened: ${reward.label}`);
      return next;
    });
    return reward;
  }, []);

  const recordActivity = useCallback((metric, amount = 1) => {
    set((s) => {
      const next = { ...s };
      rolloverIfNewDay(next);
      let progressed = false;
      for (const t of TASKS) {
        if (t.metric !== metric) continue;
        const p = next.tasksProgress[t.id] || { progress: 0, claimed: false };
        if (p.claimed) continue;
        const newProgress = Math.min(t.target, p.progress + amount);
        next.tasksProgress = { ...next.tasksProgress, [t.id]: { ...p, progress: newProgress } };
        progressed = true;
        if (newProgress >= t.target && !p.claimed) {
          // auto-credit
          next.tasksProgress[t.id].claimed = true;
          next.points += t.points;
          next.totalEarned += t.points;
          pushHistory(next, { type: "task", description: `${t.title} reward`, points: t.points });
          pushNotif(next, `${t.title} +${t.points} Points`);
        }
      }
      return progressed ? next : s;
    });
  }, []);

  const claimTask = useCallback((taskId) => {
    set((s) => {
      const t = TASKS.find((x) => x.id === taskId);
      if (!t) return s;
      const p = s.tasksProgress[taskId] || { progress: 0, claimed: false };
      if (p.claimed || p.progress < t.target) return s;
      const next = { ...s };
      next.tasksProgress = { ...next.tasksProgress, [taskId]: { ...p, claimed: true } };
      next.points += t.points;
      next.totalEarned += t.points;
      pushHistory(next, { type: "task", description: `${t.title} reward`, points: t.points });
      pushNotif(next, `${t.title} +${t.points} Points`);
      return next;
    });
  }, []);

  const redeem = useCallback((itemId) => {
    const item = REDEEM_ITEMS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: "not_found" };
    if (memory.points < item.cost) return { ok: false, reason: "insufficient" };
    set((s) => {
      const next = { ...s };
      next.points -= item.cost;
      next.totalRedeemed += item.cost;
      next.coupons = [
        { id: newId(), type: item.type, value: item.value, unit: item.unit, code: `BC-${newId().toUpperCase()}`, status: "active", expiry: Date.now() + 30 * 86400000, ts: Date.now() },
        ...next.coupons,
      ];
      pushHistory(next, { type: "redeem", description: `Redeemed ${item.title} (${item.value} ${item.unit})`, points: -item.cost });
      pushNotif(next, `Redeemed: ${item.title}`);
      return next;
    });
    return { ok: true };
  }, []);

  const useCoupon = useCallback((id) => {
    set((s) => ({
      ...s,
      coupons: s.coupons.map((c) => c.id === id ? { ...c, status: "used", redeemedAt: Date.now() } : c),
    }));
  }, []);

  const dismissNotif = useCallback((id) => {
    set((s) => ({ ...s, notifs: s.notifs.filter((n) => n.id !== id) }));
  }, []);

  const claimReferral = useCallback(() => {
    set((s) => {
      if (s.referral.claimed) return s;
      const next = { ...s };
      next.points += 50;
      next.totalEarned += 50;
      next.referral = { ...s.referral, claimed: true, signedUp: s.referral.signedUp + 1, invited: s.referral.invited + 1 };
      pushHistory(next, { type: "referral", description: "Referral reward", points: 50 });
      pushNotif(next, "Referral reward +50 Points");
      return next;
    });
  }, []);

  const reset = useCallback(() => { set(initial()); }, []);

  return {
    state,
    tier: tierFor(state.totalEarned),
    checkIn,
    openMysteryBox,
    recordActivity,
    claimTask,
    redeem,
    useCoupon,
    dismissNotif,
    claimReferral,
    reset,
  };
};
