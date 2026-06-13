// Static configuration for the Rewards Center.
// Everything else (state, points, streaks) lives in useRewardsStore.

export const CHECKIN_REWARDS = [3, 5, 10, 10, 10, 15, "mystery"];

export const MYSTERY_BOX_REWARDS = [
  { id: "pts20", label: "+20 Points", kind: "points", value: 20, rarity: "common", weight: 35 },
  { id: "pts50", label: "+50 Points", kind: "points", value: 50, rarity: "common", weight: 25 },
  { id: "pts100", label: "+100 Points", kind: "points", value: 100, rarity: "rare", weight: 18 },
  { id: "v5", label: "5 USDT Voucher", kind: "voucher", value: 5, rarity: "rare", weight: 12 },
  { id: "v10", label: "10 USDT Voucher", kind: "voucher", value: 10, rarity: "epic", weight: 7 },
  { id: "v20", label: "20 USDT Voucher", kind: "voucher", value: 20, rarity: "epic", weight: 3 },
];

export const TASKS = [
  {
    id: "daily_login",
    title: "Daily login",
    description: "Log in to Bitclub today.",
    points: 3,
    target: 1,
    unit: "",
    cta: "Claim",
    metric: "login",
  },
  {
    id: "daily_spot",
    title: "Daily spot trade",
    description: "Reach 20 USDT in spot trading volume.",
    points: 10,
    target: 20,
    unit: "USDT",
    cta: "Trade",
    metric: "spotVolume",
  },
  {
    id: "daily_futures",
    title: "Daily futures trade",
    description: "Reach 200 USDT in futures trading volume.",
    points: 20,
    target: 200,
    unit: "USDT",
    cta: "Trade",
    metric: "futuresVolume",
  },
  {
    id: "daily_deposit",
    title: "Daily deposit",
    description: "Complete a valid deposit of any amount.",
    points: 10,
    target: 1,
    unit: "",
    cta: "Deposit",
    metric: "deposit",
  },
  {
    id: "referral",
    title: "Invite a friend",
    description: "Refer one friend who completes signup.",
    points: 50,
    target: 1,
    unit: "",
    cta: "Invite",
    metric: "referral",
    oneTime: true,
  },
  {
    id: "kyc",
    title: "Complete KYC",
    description: "Verify your identity to unlock full features.",
    points: 100,
    target: 1,
    unit: "",
    cta: "Verify",
    metric: "kyc",
    oneTime: true,
  },
];

export const REDEEM_ITEMS = [
  { id: "v1", title: "position boost voucher", value: 60, unit: "USDT", cost: 400, tag: "Stocks", product: "USDT-M Futures", type: "Position voucher" },
  { id: "v2", title: "position boost voucher", value: 60, unit: "USDT", cost: 400, tag: "Commodity", product: "USDT-M Futures", type: "Position voucher" },
  { id: "v3", title: "position boost voucher", value: 60, unit: "USDT", cost: 400, tag: "Crypto", product: "USDT-M Futures", type: "Position voucher" },
  { id: "v4", title: "position boost voucher", value: 60, unit: "USDT", cost: 400, tag: "Index", product: "USDT-M Futures", type: "Position voucher" },
  { id: "v5", title: "Fee rebate voucher", value: 1, unit: "USDT", cost: 100, tag: "Spot", product: "Spot", type: "Fee rebate voucher" },
  { id: "v6", title: "Fee rebate voucher", value: 5, unit: "USDT", cost: 450, tag: "Spot", product: "Spot", type: "Fee rebate voucher" },
  { id: "v7", title: "Trading bonus", value: 10, unit: "USDT", cost: 800, tag: "Futures", product: "USDT-M Futures", type: "Trading bonus" },
  { id: "v8", title: "Crypto voucher", value: 2, unit: "USDT", cost: 200, tag: "Crypto", product: "Spot", type: "Crypto voucher" },
];

export const PRODUCT_OPTIONS = [
  "All", "Spot", "USDT-M Futures", "Earn", "Coin-M Futures",
  "USDC-M Futures", "Spot margin", "VIP", "Promotions",
];

export const REWARD_TYPE_OPTIONS = [
  "All", "Coupon", "Trading bonus", "Crypto voucher", "APR voucher",
  "Interest voucher", "Position voucher", "Fee rebate voucher", "Trial pass",
];

export const TIERS = [
  { key: "bronze", name: "Bronze", min: 0, color: "#a87245" },
  { key: "silver", name: "Silver", min: 500, color: "#c7c7c7" },
  { key: "gold", name: "Gold", min: 2000, color: "#e0b53b" },
  { key: "platinum", name: "Platinum", min: 5000, color: "#9ad0ff" },
  { key: "diamond", name: "Diamond", min: 12000, color: "#22c1c3" },
];

export const RULES_TEXT = [
  "New users can unlock a welcome pack worth 6200 USDT after signing up. Invite friends to join Bitclub and complete identity verification to earn an extra 200 USDT referral reward. New users who deposit and trade within seven days stand a chance to win up to 6000 USDT in rewards. All rewards must be claimed within 12 days of signing up.",
  "Each user can complete a new user task only once. After completing a task, users must claim the reward manually.",
  "Users must complete new user tasks within 7 days of signing up and claim their rewards within 12 days.\n· Note: If you delete your account and sign up again using the same verified identity, you will not be considered as a new user and you will not be eligible for any new user perks or rewards. Invitees with duplicate identity verification information are not eligible for referral rewards.",
  "Users can visit the Rewards Center to check in daily and earn points. Points can be redeemed for vouchers and other rewards.",
];

export const FAQ_ITEMS = [
  {
    q: "What are spot fee rebate vouchers?",
    a: "When you use a spot fee rebate voucher in spot trading, part of your transaction fees (excluding special fees) will be refunded in USDT on the following day.",
  },
  {
    q: "What are futures position boost vouchers?",
    a: "This voucher can be used to open futures positions in hedging or isolated margin mode. It cannot be combined with USDT holdings and must be used on its own. Positions can be held for up to 24 hours, after which they will be closed at market price.\nThe voucher becomes invalid once the position is closed (or partially closed), liquidated, or expires. Any profits, after deducting the voucher amount, are credited to your account. You are not responsible for any losses.\nAfter completing the task, the voucher will appear in the Coupons Center. You must claim it manually before it expires.",
  },
  { q: "What are futures trading bonuses?", a: "Futures trading bonuses can be used as margin for futures positions. They cannot be withdrawn but profits earned using them are yours to keep." },
  { q: "What are points?", a: "Points are earned by completing tasks and daily check-ins. They can be redeemed in the Rewards Center for vouchers, bonuses, and exclusive perks." },
  { q: "How to view your voucher rewards?", a: "Open the Coupons Center from the Rewards dashboard to view all active, used, and expired vouchers." },
];
