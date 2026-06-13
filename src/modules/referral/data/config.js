// Centralized referral config. Admin panel would mutate these later.

export const TIERS = [
  { key: "regular", name: "Regular Inviter", minVolume: 0, rebate: 10, color: "#9aa0a8" },
  { key: "silver", name: "Silver Inviter", minVolume: 500_000, rebate: 15, color: "#c7c7c7" },
  { key: "gold", name: "Gold Inviter", minVolume: 1_000_000, rebate: 20, color: "#e0b53b" },
  { key: "platinum", name: "Platinum Inviter", minVolume: 2_500_000, rebate: 25, color: "#9ad0ff" },
  { key: "premier", name: "Premier Inviter", minVolume: 5_000_000, rebate: 30, color: "#fcd9a0" },
];

export const LEVEL_RATES = { 1: 20, 2: 10, 3: 5 };

export const ACTIVITIES = [
  { id: "inv1", target: 1, points: 20, title: "Invite 1 Friend" },
  { id: "inv5", target: 5, points: 100, title: "Invite 5 Friends" },
  { id: "inv10", target: 10, points: 250, title: "Invite 10 Friends" },
  { id: "inv20", target: 20, points: 500, title: "Invite 20 Friends" },
];

export const CAMPAIGNS = [
  {
    id: "coin_buddy",
    title: "Coin Buddy",
    description: "Invite a friend and you'll both get a chance to win 1,000,000 trending tokens, including SOL airdrops!",
    accent: "linear-gradient(135deg,#3a1a5e,#1a0a2e)",
    glow: "rgba(155,89,255,0.35)",
    cta: "Join now",
  },
  {
    id: "treasure",
    title: "Referral Treasure Hunt",
    description: "Join the treasure hunt! Rewards include $1 XAUT and $2 XAUT crypto vouchers.",
    accent: "linear-gradient(135deg,#3a2a0a,#1a1206)",
    glow: "rgba(252,217,160,0.3)",
    cta: "Join now",
  },
  {
    id: "assist2earn",
    title: "Assist2Earn",
    description: "Invite two friends and get 20 USDT in trading bonuses while they get 5 USDT each.",
    accent: "linear-gradient(135deg,#3a1a0a,#1a0a06)",
    glow: "rgba(255,140,80,0.3)",
    cta: "Join now",
  },
  {
    id: "referral_program",
    title: "Referral Program",
    description: "Invite 1 friend to get $80 BTC in airdrops and Mystery Boxes worth up to 1,500 USDT.",
    accent: "linear-gradient(135deg,#0a3a3c,#06181a)",
    glow: "rgba(34,193,195,0.35)",
    cta: "Join now",
  },
];

export const PREMIER_REQUIREMENT = {
  volume: 5_000_000,
  duration: 365,
  rebate: 25,
};

export const FAQ = [
  { q: "What is the Bitclub Premier Inviter program?", a: "To thank you for your support, Bitclub launched the Premier Inviter program. Eligible users can activate perks and enjoy up to a 25% rebate on the transaction fees of their invitees." },
  { q: "How long does the Premier Inviter program last?", a: "The Premier Inviter program is a long-term initiative with no official end date. Participants will be notified in advance of any changes." },
  { q: "How are rebates calculated?", a: "Rebates are calculated daily based on your invitees' transaction fees. Settlement is automatic and credited to your commission wallet in USDT." },
  { q: "How do I claim my rebates?", a: "Rebates are credited automatically every 24 hours and are immediately available in your commission wallet." },
];
