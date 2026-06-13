// LocalStorage implementation of IReferralRepository.
// Future: MongoReferralRepository with the same interface — UI swaps via repositories/index.js.

import { eventBus, EVENTS } from "../services/eventBus.js";

const KEY = "bitclub_referral_state_v1";

const newId = () => Math.random().toString(36).slice(2, 10);
const genCode = () => "BIT" + Math.random().toString(36).slice(2, 7).toUpperCase();
const now = () => Date.now();

const seed = () => {
  const code = genCode();
  return {
    profile: {
      code,
      link: `https://bitclub.com/register?ref=${code}`,
      createdAt: now(),
      totalUses: 0,
    },
    stats: {
      clicks: 124,
      registrations: 8,
      kyc: 4,
      depositCount: 3,
      tradingVolume: 1_500_000,
      activeReferrals: 5,
    },
    invitees: [
      { id: newId(), uid: "5642**81", registeredAt: now() - 8 * 86400000, kyc: true, deposited: true, trading: true, volume: 420000, commission: 84, level: 1, status: "active" },
      { id: newId(), uid: "1102**45", registeredAt: now() - 14 * 86400000, kyc: true, deposited: true, trading: false, volume: 65000, commission: 13, level: 1, status: "active" },
      { id: newId(), uid: "9034**12", registeredAt: now() - 2 * 86400000, kyc: false, deposited: false, trading: false, volume: 0, commission: 0, level: 1, status: "pending" },
      { id: newId(), uid: "7781**00", registeredAt: now() - 28 * 86400000, kyc: true, deposited: true, trading: true, volume: 980000, commission: 196, level: 2, status: "active" },
    ],
    commissions: {
      available: 293,
      pending: 42,
      withdrawn: 0,
      transactions: [
        { id: newId(), type: "Trading Commission", amount: 84, percentage: 20, sourceUser: "5642**81", status: "credited", createdAt: now() - 86400000 },
        { id: newId(), type: "Trading Commission", amount: 196, percentage: 20, sourceUser: "7781**00", status: "credited", createdAt: now() - 2 * 86400000 },
        { id: newId(), type: "Referral Bonus", amount: 13, percentage: 0, sourceUser: "1102**45", status: "pending", createdAt: now() - 3 * 86400000 },
      ],
    },
    activities: {}, // id -> { claimed }
    notifications: [
      { id: newId(), title: "New referral registered", body: "User 9034**12 just signed up using your link.", ts: now() - 3600000, read: false },
      { id: newId(), title: "Commission earned", body: "You earned 84 USDT from referral 5642**81.", ts: now() - 86400000, read: false },
    ],
    leaderboard: buildLeaderboard(),
  };
};

function buildLeaderboard() {
  const names = ["MoonTrader", "AlphaWolf", "CryptoSage", "BlockKing", "NightOwl", "GreenCandle", "DiamondHands", "SatoshiJr", "WhalePilot", "PumpHunter"];
  return names.map((n, i) => ({
    rank: i + 1,
    name: n + " " + Math.floor(100 + Math.random() * 900),
    referrals: Math.floor(2000 - i * 130 + Math.random() * 80),
    volume: Math.floor(50_000_000 - i * 3_200_000 + Math.random() * 1_000_000),
    rewards: Math.floor(120_000 - i * 8_000 + Math.random() * 3_000),
  }));
}

let memory = null;

const load = () => {
  if (typeof window === "undefined") return seed();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch (e) {}
  return seed();
};

const persist = (s) => {
  try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
};

const ensure = () => { if (!memory) memory = load(); return memory; };

const set = (updater) => {
  const next = typeof updater === "function" ? updater(memory) : updater;
  memory = next;
  persist(next);
  eventBus.emit(EVENTS.STATE_CHANGED, next);
};

const pushNotif = (s, title, body) => {
  s.notifications = [{ id: newId(), title, body, ts: now(), read: false }, ...s.notifications].slice(0, 50);
  eventBus.emit(EVENTS.NOTIFICATION, { title, body });
};

export const LocalStorageReferralRepository = {
  getState() { return ensure(); },

  regenerateCode() {
    set((s) => {
      const code = genCode();
      return { ...s, profile: { ...s.profile, code, link: `https://bitclub.com/register?ref=${code}` } };
    });
    return ensure().profile;
  },

  recordClick() {
    set((s) => ({ ...s, stats: { ...s.stats, clicks: s.stats.clicks + 1 } }));
  },

  simulateNewReferral() {
    const uid = String(Math.floor(1000 + Math.random() * 9000)) + "**" + String(Math.floor(10 + Math.random() * 89));
    set((s) => {
      const next = { ...s };
      const inv = { id: newId(), uid, registeredAt: now(), kyc: false, deposited: false, trading: false, volume: 0, commission: 0, level: 1, status: "pending" };
      next.invitees = [inv, ...s.invitees];
      next.stats = { ...s.stats, registrations: s.stats.registrations + 1, activeReferrals: s.stats.activeReferrals + 1 };
      next.profile = { ...s.profile, totalUses: s.profile.totalUses + 1 };
      pushNotif(next, "New referral registered", `User ${uid} just signed up using your link.`);
      eventBus.emit(EVENTS.REFERRAL_REGISTERED, inv);
      return next;
    });
  },

  simulateTrade(inviteeId, fee = 100) {
    set((s) => {
      const next = { ...s };
      const idx = s.invitees.findIndex((i) => i.id === inviteeId);
      if (idx < 0) return s;
      const tier = getTier(s.stats.tradingVolume);
      const commission = +(fee * (tier.rebate / 100)).toFixed(2);
      const inv = { ...s.invitees[idx], trading: true, volume: s.invitees[idx].volume + fee * 10, commission: s.invitees[idx].commission + commission, status: "active" };
      next.invitees = [...s.invitees.slice(0, idx), inv, ...s.invitees.slice(idx + 1)];
      next.stats = { ...s.stats, tradingVolume: s.stats.tradingVolume + fee * 10 };
      next.commissions = {
        ...s.commissions,
        available: s.commissions.available + commission,
        transactions: [
          { id: newId(), type: "Trading Commission", amount: commission, percentage: tier.rebate, sourceUser: inv.uid, status: "credited", createdAt: now() },
          ...s.commissions.transactions,
        ],
      };
      pushNotif(next, "Commission earned", `You earned ${commission} USDT from referral ${inv.uid}.`);
      eventBus.emit(EVENTS.COMMISSION_EARNED, { amount: commission });
      return next;
    });
  },

  claimActivity(id, points) {
    set((s) => {
      if (s.activities[id]?.claimed) return s;
      const next = { ...s };
      next.activities = { ...s.activities, [id]: { claimed: true, ts: now() } };
      next.commissions = {
        ...s.commissions,
        transactions: [
          { id: newId(), type: "Campaign Reward", amount: points, percentage: 0, sourceUser: "—", status: "credited", createdAt: now() },
          ...s.commissions.transactions,
        ],
      };
      pushNotif(next, "Reward claimed", `You earned ${points} points from invitation activity.`);
      return next;
    });
  },

  markNotificationRead(id) {
    set((s) => ({ ...s, notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) }));
  },

  markAllNotificationsRead() {
    set((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  },

  withdraw(amount) {
    set((s) => {
      if (amount > s.commissions.available) return s;
      const next = { ...s };
      next.commissions = {
        ...s.commissions,
        available: s.commissions.available - amount,
        withdrawn: s.commissions.withdrawn + amount,
        transactions: [
          { id: newId(), type: "Withdrawal", amount: -amount, percentage: 0, sourceUser: "—", status: "completed", createdAt: now() },
          ...s.commissions.transactions,
        ],
      };
      pushNotif(next, "Withdrawal complete", `${amount} USDT moved to your spot wallet.`);
      return next;
    });
  },

  reset() { set(seed()); },
};

export function getTier(volume) {
  const tiers = [
    { key: "regular", name: "Regular Inviter", minVolume: 0, rebate: 10 },
    { key: "silver", name: "Silver Inviter", minVolume: 500_000, rebate: 15 },
    { key: "gold", name: "Gold Inviter", minVolume: 1_000_000, rebate: 20 },
    { key: "platinum", name: "Platinum Inviter", minVolume: 2_500_000, rebate: 25 },
    { key: "premier", name: "Premier Inviter", minVolume: 5_000_000, rebate: 30 },
  ];
  let t = tiers[0];
  for (const x of tiers) if (volume >= x.minVolume) t = x;
  return t;
}
