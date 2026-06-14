import { useEffect, useState, useCallback } from "react";
import { BalanceRepository, WithdrawalRepository } from "../repositories/index.js";
import { eventBus, EVENTS } from "../services/eventBus.js";
import { LimitsEngine } from "../services/limitsEngine.js";

export const useBalances = () => {
  const [bal, setBal] = useState(() => BalanceRepository.getAll());
  useEffect(() => {
    const off = eventBus.on(EVENTS.BALANCE_UPDATED, () => setBal(BalanceRepository.getAll()));
    return () => off();
  }, []);
  return bal;
};

export const useBalance = (symbol) => {
  const all = useBalances();
  return all[symbol] || { available: 0, frozen: 0 };
};

export const useWithdrawals = () => {
  const [list, setList] = useState(() => WithdrawalRepository.list());
  useEffect(() => {
    const evts = [EVENTS.WITHDRAWAL_CREATED, EVENTS.WITHDRAWAL_PENDING, EVENTS.WITHDRAWAL_APPROVED, EVENTS.WITHDRAWAL_COMPLETED, EVENTS.WITHDRAWAL_REJECTED];
    const offs = evts.map((e) => eventBus.on(e, () => setList(WithdrawalRepository.list())));
    return () => offs.forEach((o) => o());
  }, []);
  return list;
};

export const useLimits = () => {
  const [info, setInfo] = useState(() => LimitsEngine.info());
  const refresh = useCallback(() => setInfo(LimitsEngine.info()), []);
  useEffect(() => {
    const offs = [EVENTS.WITHDRAWAL_CREATED, EVENTS.WITHDRAWAL_COMPLETED, EVENTS.WITHDRAWAL_REJECTED].map((e) =>
      eventBus.on(e, refresh)
    );
    return () => offs.forEach((o) => o());
  }, [refresh]);
  return info;
};
