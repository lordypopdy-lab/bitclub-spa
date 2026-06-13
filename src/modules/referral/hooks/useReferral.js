import { useEffect, useState } from "react";
import { ReferralRepository, getTier } from "../repositories/index.js";
import { eventBus, EVENTS } from "../services/eventBus.js";
import { TIERS } from "../data/config.js";

export const useReferral = () => {
  const [state, setState] = useState(() => ReferralRepository.getState());

  useEffect(() => {
    const off = eventBus.on(EVENTS.STATE_CHANGED, (s) => setState({ ...s }));
    return () => off();
  }, []);

  const tier = getTier(state.stats.tradingVolume);
  const nextTier = TIERS.find((t) => t.minVolume > state.stats.tradingVolume) || TIERS[TIERS.length - 1];
  const progress = Math.min(100, (state.stats.tradingVolume / (nextTier.minVolume || 1)) * 100);
  const unreadNotifs = state.notifications.filter((n) => !n.read).length;

  return {
    state,
    tier,
    nextTier,
    progress,
    unreadNotifs,
    repo: ReferralRepository,
  };
};
