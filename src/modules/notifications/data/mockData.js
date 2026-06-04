// Mock notification data per category
const make = (n, prefix, msgFactory) =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: msgFactory(i).title,
    message: msgFactory(i).message,
    date: msgFactory(i).date,
    read: i > 1,
  }));

export const announcements = make(9, "ann", (i) => {
  const items = [
    {
      title: "Bitclub announcement on resuming RLUSD - XRP Ledger withdrawals",
      message:
        "Dear users: Bitclub has now opened the withdrawal service on the RLUSD - XRP Ledger network.",
      date: "2026-06-04 11:05:17",
    },
    {
      title: "Bitclub to convert QNTSTOCKUSDT perpetual contract",
      message:
        "Bitclub will convert the QNTSTOCKUSDT perpetual contract to align with the new market structure.",
      date: "2026-06-04 10:27:21",
    },
    {
      title: "Bitclub announcement on resuming JST withdrawals",
      message:
        "Dear users: Bitclub has now opened the withdrawal service for JST.",
      date: "2026-06-04 09:59:27",
    },
    {
      title: "Announcement on Bitclub listing SMRUSDT",
      message:
        "To further diversify our trading products and ecosystem, Bitclub will list SMRUSDT.",
      date: "2026-06-04 09:53:47",
    },
    {
      title: "Bitclub to support margin functions for stock tokens",
      message:
        "Bitclub has officially added rAAPL, rAMZN, rMETA and more to the margin product line.",
      date: "2026-06-04 09:01:44",
    },
    {
      title: "Bitclub announcement on suspending JST withdrawals",
      message:
        "Dear users: Due to wallet maintenance, Bitclub will temporarily suspend JST withdrawals.",
      date: "2026-06-04 08:08:27",
    },
    {
      title: "Rules for using stock tokens as margin",
      message:
        "Overview Bitclub supports the use of select stock tokens as margin for derivatives.",
      date: "2026-06-04 07:21:38",
    },
    {
      title: "Bitclub announcement on suspending RLUSD withdrawals",
      message:
        "Dear users: Due to wallet maintenance, Bitclub will temporarily suspend RLUSD withdrawals.",
      date: "2026-06-04 03:57:57",
    },
    {
      title: "Bitclub announcement on resuming MOVE withdrawals",
      message:
        "Dear users: Bitclub has now resumed MOVE network withdrawals.",
      date: "2026-06-03 22:14:02",
    },
  ];
  return items[i];
});

export const promotions = make(5, "pro", (i) => {
  const items = [
    { title: "Catch the crude oil wave!", message: "Trade WTI perpetuals and share a 50,000 USDT prize pool.", date: "2026-06-03 18:00:00" },
    { title: "Deposit & earn up to 1,200 USDT", message: "New users get exclusive deposit rewards this week.", date: "2026-06-02 12:00:00" },
    { title: "Copy trading carnival", message: "Top traders share 200,000 USDT in commissions.", date: "2026-06-01 09:30:00" },
    { title: "Launchpool: stake to earn", message: "Stake BGB to farm new tokens with zero risk.", date: "2026-05-30 11:20:00" },
    { title: "Refer a friend, earn 50%", message: "Lifetime commission on every referred trade.", date: "2026-05-28 10:00:00" },
  ];
  return items[i];
});

export const news = make(5, "news", (i) => {
  const items = [
    { title: "LIT heats up as the perp DEX sector rallies", message: "👀 LIT heats up as the perp DEX sector continues to dominate flows.", date: "2026-06-04 10:12:00" },
    { title: "ETF inflows hit a new monthly high", message: "Spot BTC ETFs absorbed $4.1B last week, the highest since launch.", date: "2026-06-04 08:00:00" },
    { title: "SOL ecosystem TVL crosses $12B", message: "Solana DeFi continues its parabolic ascent.", date: "2026-06-03 22:00:00" },
    { title: "Restaking narrative cools off", message: "Major LRTs see double-digit drawdowns this week.", date: "2026-06-03 14:00:00" },
    { title: "Stablecoin supply hits all-time high", message: "USDT + USDC supply tops $180B for the first time.", date: "2026-06-02 09:00:00" },
  ];
  return items[i];
});

export const marketUpdates = make(5, "mkt", (i) => {
  const items = [
    { title: "BTC price has fallen", message: "BTC dropped 2.4% in the last hour to $67,820.", date: "2026-06-04 11:00:00" },
    { title: "ETH crosses $3,500", message: "Ether reclaims the $3,500 resistance with strong volume.", date: "2026-06-04 09:30:00" },
    { title: "SOL up 8% on the day", message: "Solana leads majors after ecosystem upgrade.", date: "2026-06-04 06:10:00" },
    { title: "DOGE volatility alert", message: "DOGE 1h volume +320%, watch for breakout.", date: "2026-06-03 19:45:00" },
    { title: "Funding rates turning negative", message: "Perp funding flips negative across majors.", date: "2026-06-03 12:00:00" },
  ];
  return items[i];
});

export const newListings = make(5, "list", (i) => {
  const items = [
    { title: "New USDT-M futures trading pair: BTCUSDT", message: "New USDT-M futures trading pair: BTCUSDT now live with up to 125x leverage.", date: "2026-06-04 10:00:00" },
    { title: "Spot listing: SMR/USDT", message: "Shimmer (SMR) is now tradable on Bitclub spot.", date: "2026-06-04 08:00:00" },
    { title: "Innovation Zone: ZK/USDT", message: "ZK token listed under the Innovation Zone.", date: "2026-06-03 16:00:00" },
    { title: "New perpetual: ENA-USDT", message: "Ethena perpetuals are now available.", date: "2026-06-02 11:00:00" },
    { title: "Margin pair added: TIA/USDT", message: "Celestia is now supported in cross & isolated margin.", date: "2026-06-01 09:00:00" },
  ];
  return items[i];
});

export const incentives = make(5, "inc", (i) => {
  const items = [
    { title: "Today's incentives have been distributed", message: "💰 Today's incentives have been distributed to your spot wallet.", date: "2026-06-04 09:00:00" },
    { title: "Trading rebate credited", message: "Your 24h trading rebate of 12.45 USDT has been credited.", date: "2026-06-03 09:00:00" },
    { title: "VIP upgrade reward", message: "You've reached VIP 2. Claim your 50 USDT bonus.", date: "2026-06-02 14:00:00" },
    { title: "Launchpool rewards", message: "Your staking rewards of 124 LTOKEN are now claimable.", date: "2026-06-01 09:00:00" },
    { title: "Referral commission credited", message: "You earned 8.32 USDT in referral commissions.", date: "2026-05-31 09:00:00" },
  ];
  return items[i];
});

export const systemMessages = make(5, "sys", (i) => {
  const items = [
    { title: "Spot trading pair delisting", message: "The following spot pairs will be delisted on 2026-06-10: XYZ/USDT.", date: "2026-06-04 07:30:00" },
    { title: "Scheduled system maintenance", message: "Bitclub will perform scheduled maintenance on 2026-06-06 02:00 UTC.", date: "2026-06-03 18:00:00" },
    { title: "KYC verification reminder", message: "Please complete advanced KYC to keep full withdrawal limits.", date: "2026-06-02 10:00:00" },
    { title: "Password changed successfully", message: "Your account password was changed from a new device.", date: "2026-06-01 21:14:00" },
    { title: "New login detected", message: "A new login from Chrome on Windows was detected.", date: "2026-05-31 08:22:00" },
  ];
  return items[i];
});

export const categories = [
  {
    key: "announcements",
    title: "Announcements",
    preview: "Bitclub announcement on resuming ...",
    date: "2026-06-04",
    icon: "megaphone",
    iconColor: "#22c1c3",
    path: "/notifications/announcements",
  },
  {
    key: "promotions",
    title: "Promotions",
    preview: "Catch the crude oil wave!",
    date: "2026-06-03",
    icon: "party",
    iconColor: "#cfd2d6",
    path: "/notifications/promotions",
  },
  {
    key: "news",
    title: "News notifications",
    preview: "👀 LIT heats up as the perp DEX se...",
    date: "2026-06-04",
    icon: "news",
    iconColor: "#22c1c3",
    path: "/notifications/news",
  },
  {
    key: "market-updates",
    title: "Market updates",
    preview: "BTC price has fallen",
    date: "2026-06-04",
    icon: "chart",
    iconColor: "#22c1c3",
    path: "/notifications/market-updates",
  },
  {
    key: "new-listings",
    title: "New listings",
    preview: "New USDT-M futures trading pair: B...",
    date: "2026-06-04",
    icon: "sparkle",
    iconColor: "#fff",
    path: "/notifications/new-listings",
  },
  {
    key: "incentives",
    title: "Incentives",
    preview: "💰 Today's incentives have been di...",
    date: "2026-06-04",
    icon: "gift",
    iconColor: "#22c1c3",
    path: "/notifications/incentives",
  },
  {
    key: "system-messages",
    title: "System message",
    preview: "Spot trading pair delisting",
    date: "2026-06-04",
    icon: "mail",
    iconColor: "#cfd2d6",
    path: "/notifications/system-messages",
  },
];

export const datasetByKey = {
  announcements,
  promotions,
  news,
  "market-updates": marketUpdates,
  "new-listings": newListings,
  incentives,
  "system-messages": systemMessages,
};

export const titleByKey = {
  announcements: "Announcements",
  promotions: "Promotions",
  news: "News notifications",
  "market-updates": "Market updates",
  "new-listings": "New listings",
  incentives: "Incentives",
  "system-messages": "System message",
};
