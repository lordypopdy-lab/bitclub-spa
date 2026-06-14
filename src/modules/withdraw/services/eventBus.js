// Lightweight pub/sub. Swap with Socket.IO later, callers unchanged.
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
  WITHDRAWAL_CREATED: "withdrawal:created",
  WITHDRAWAL_PENDING: "withdrawal:pending",
  WITHDRAWAL_APPROVED: "withdrawal:approved",
  WITHDRAWAL_COMPLETED: "withdrawal:completed",
  WITHDRAWAL_REJECTED: "withdrawal:rejected",
  BALANCE_UPDATED: "balance:updated",
  NOTIFICATION_CREATED: "notification:created",
};
