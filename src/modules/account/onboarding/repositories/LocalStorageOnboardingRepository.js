// LocalStorage implementation of IOnboardingRepository.
// Future: MongoOnboardingRepository with same interface — UI swaps via repositories/index.js.
import { eventBus, EVENTS } from "../services/eventBus.js";

const KEY = "bitclub_onboarding_state_v1";

const seed = () => ({
  kycCompleted: false,
  firstDepositCompleted: false,
  firstTradeCompleted: false,
  onboardingCompleted: false,
  rewardClaimed: false,
  completedAt: null,
  history: [],
});

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

const compute = (s) => {
  const steps = [s.kycCompleted, s.firstDepositCompleted, s.firstTradeCompleted];
  const done = steps.filter(Boolean).length;
  const progress = Math.round((done / steps.length) * 100);
  const completed = done === steps.length;
  return { ...s, progress, completedSteps: done, totalSteps: steps.length, onboardingCompleted: completed };
};

const set = (updater) => {
  const next = compute(typeof updater === "function" ? updater(memory) : updater);
  memory = next;
  persist(next);
  eventBus.emit(EVENTS.STATE_CHANGED, next);
};

const pushHistory = (s, type, msg) => {
  s.history = [{ id: Math.random().toString(36).slice(2, 9), type, msg, ts: Date.now() }, ...s.history].slice(0, 30);
};

export const LocalStorageOnboardingRepository = {
  getState() { return compute(ensure()); },

  completeKyc() {
    if (ensure().kycCompleted) return;
    set((s) => {
      const next = { ...s, kycCompleted: true };
      pushHistory(next, "kyc", "Identity verification completed.");
      eventBus.emit(EVENTS.KYC_APPROVED);
      return next;
    });
    this._maybeFinish();
  },

  completeFirstDeposit() {
    if (ensure().firstDepositCompleted) return;
    set((s) => {
      const next = { ...s, firstDepositCompleted: true };
      pushHistory(next, "deposit", "First deposit completed.");
      eventBus.emit(EVENTS.DEPOSIT_COMPLETED);
      return next;
    });
    this._maybeFinish();
  },

  completeFirstTrade() {
    if (ensure().firstTradeCompleted) return;
    set((s) => {
      const next = { ...s, firstTradeCompleted: true };
      pushHistory(next, "trade", "First trade completed.");
      eventBus.emit(EVENTS.FIRST_TRADE_COMPLETED);
      return next;
    });
    this._maybeFinish();
  },

  claimReward() {
    const s = ensure();
    if (!s.onboardingCompleted || s.rewardClaimed) return false;
    set((cur) => {
      const next = { ...cur, rewardClaimed: true };
      pushHistory(next, "reward", "Welcome reward unlocked (+50 pts, voucher, mystery box).");
      return next;
    });
    // Try to credit rewards center if present
    try {
      const RK = "bitclub_rewards_state_v1";
      const raw = window.localStorage.getItem(RK);
      if (raw) {
        const r = JSON.parse(raw);
        r.points = (r.points || 0) + 50;
        r.transactions = [{ id: Math.random().toString(36).slice(2, 9), type: "Welcome Bonus", amount: 50, ts: Date.now() }, ...(r.transactions || [])].slice(0, 50);
        window.localStorage.setItem(RK, JSON.stringify(r));
      }
    } catch (e) {}
    eventBus.emit(EVENTS.REWARD_UNLOCKED, { points: 50 });
    return true;
  },

  reset() { set(seed()); },

  _maybeFinish() {
    const s = ensure();
    if (s.onboardingCompleted && !s.completedAt) {
      set((cur) => ({ ...cur, completedAt: Date.now() }));
      eventBus.emit(EVENTS.ONBOARDING_COMPLETED);
    }
  },
};
