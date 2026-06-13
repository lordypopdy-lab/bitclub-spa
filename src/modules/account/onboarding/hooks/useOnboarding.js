import { useEffect, useState } from "react";
import { OnboardingRepository } from "../repositories/index.js";
import { eventBus, EVENTS } from "../services/eventBus.js";

export const useOnboarding = () => {
  const [state, setState] = useState(() => OnboardingRepository.getState());

  useEffect(() => {
    const off = eventBus.on(EVENTS.STATE_CHANGED, (s) => setState({ ...s }));
    return () => off();
  }, []);

  const steps = [
    { id: "kyc", title: "Verify your identity", desc: "Submit required documents to complete identity verification.", done: state.kycCompleted, cta: "Verify Identity", to: "/assets" },
    { id: "deposit", title: "Add funds", desc: "Make your first crypto purchase/deposit.", done: state.firstDepositCompleted, cta: "Deposit", to: "/add-funds" },
    { id: "trade", title: "Start trading", desc: "Make your first trade now!", done: state.firstTradeCompleted, cta: "Start Trading", to: "/markets" },
  ];

  const nextIdx = steps.findIndex((s) => !s.done);
  const next = nextIdx === -1 ? null : steps[nextIdx];
  const cta = state.onboardingCompleted
    ? (state.rewardClaimed ? { label: "Welcome Reward Claimed", to: "/rewards", disabled: true } : { label: "Claim Welcome Reward", to: "/rewards", claim: true })
    : { label: next.cta, to: next.to };

  return { state, steps, next, cta, repo: OnboardingRepository };
};
