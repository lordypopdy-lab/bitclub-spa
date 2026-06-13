// Lightweight event bus. Swap with Socket.IO later without changing callers.
const listeners = new Map();

export const eventBus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  },
  emit(event, payload) {
    listeners.get(event)?.forEach((fn) => {
      try { fn(payload); } catch (e) { /* noop */ }
    });
    listeners.get("*")?.forEach((fn) => { try { fn({ event, payload }); } catch (e) {} });
  },
};

export const EVENTS = {
  STATE_CHANGED: "referral:state_changed",
  REFERRAL_REGISTERED: "referral:registered",
  REFERRAL_KYC: "referral:kyc",
  REFERRAL_DEPOSIT: "referral:deposit",
  REFERRAL_TRADE: "referral:trade",
  COMMISSION_EARNED: "referral:commission",
  NOTIFICATION: "referral:notification",
};
