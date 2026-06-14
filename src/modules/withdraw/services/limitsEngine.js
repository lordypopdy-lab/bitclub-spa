// Daily withdrawal limits by KYC tier.
import { WithdrawalRepository } from "../repositories/index.js";

const KYC_KEY = "bitclub_kyc_tier_v1"; // "none" | "basic" | "advanced"

const TIERS = {
  none: { dailyUsd: 500, label: "Unverified" },
  basic: { dailyUsd: 10000, label: "Basic KYC" },
  advanced: { dailyUsd: 100000, label: "Advanced KYC" },
};

export const LimitsEngine = {
  getTier() {
    if (typeof window === "undefined") return "basic";
    try { return window.localStorage.getItem(KYC_KEY) || "basic"; } catch (e) { return "basic"; }
  },
  setTier(t) { try { window.localStorage.setItem(KYC_KEY, t); } catch (e) {} },
  info() {
    const tier = this.getTier();
    const used = WithdrawalRepository.dailyTotalUsd();
    const cap = TIERS[tier].dailyUsd;
    return { tier, label: TIERS[tier].label, used, cap, remaining: Math.max(0, cap - used) };
  },
  check(usdValue) {
    const i = this.info();
    if (usdValue > i.remaining) return { ok: false, error: `Daily limit exceeded. Remaining: $${i.remaining.toFixed(2)} (${i.label}).` };
    return { ok: true };
  },
};
