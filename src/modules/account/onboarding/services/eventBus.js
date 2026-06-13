// Lightweight event bus. Swap with Socket.IO later without changing callers.
const listeners = new Map();

export const eventBus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  },
  emit(event, payload) {
    listeners.get(event)?.forEach((fn) => { try { fn(payload); } catch (e) {} });
  },
};

export const EVENTS = {
  STATE_CHANGED: "onboarding:state_changed",
  KYC_APPROVED: "onboarding:kyc_approved",
  DEPOSIT_COMPLETED: "onboarding:deposit_completed",
  FIRST_TRADE_COMPLETED: "onboarding:first_trade_completed",
  ONBOARDING_COMPLETED: "onboarding:completed",
  REWARD_UNLOCKED: "onboarding:reward_unlocked",
};
