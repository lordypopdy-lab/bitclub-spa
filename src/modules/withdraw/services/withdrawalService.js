// Orchestrates risk control, validation, fee, balance freeze, transaction creation, and async finalize.
// UI calls into this service — never repositories directly.
import { WithdrawalRepository, BalanceRepository, NotificationRepository } from "../repositories/index.js";
import { AddressValidator } from "./addressValidator.js";
import { FeeEngine } from "./feeEngine.js";
import { LimitsEngine } from "./limitsEngine.js";
import { getAsset } from "../data/assets.js";

const usdOf = (symbol, amount) => {
  const a = getAsset(symbol);
  return (a?.priceUsd || 0) * Number(amount || 0);
};

// Anti-duplicate: same address+amount+symbol within 30s blocked
const recent = [];
const isDuplicate = (key) => {
  const now = Date.now();
  for (let i = recent.length - 1; i >= 0; i--) if (now - recent[i].t > 30000) recent.splice(i, 1);
  return recent.some((r) => r.key === key);
};

export const WithdrawalService = {
  validateOnChain({ symbol, networkId, address, amount, memo }) {
    if (!symbol || !networkId) return { ok: false, error: "Select asset and network" };
    const amt = Number(amount);
    if (!amt || amt <= 0) return { ok: false, error: "Enter a valid amount" };
    const addr = AddressValidator.validate(symbol, networkId, address);
    if (!addr.ok) return addr;
    const fee = FeeEngine.calculate({ symbol, networkId, amount: amt });
    if (amt < fee.min) return { ok: false, error: `Minimum withdrawal is ${fee.min} ${symbol}` };
    if (amt > fee.max) return { ok: false, error: `Maximum withdrawal is ${fee.max} ${symbol}` };
    if (fee.receive <= 0) return { ok: false, error: "Amount must exceed network fee" };
    const bal = BalanceRepository.get(symbol);
    if (bal.available < amt) return { ok: false, error: "Insufficient available balance" };
    const usd = usdOf(symbol, amt);
    const lim = LimitsEngine.check(usd);
    if (!lim.ok) return lim;
    return { ok: true, fee: fee.fee, receive: fee.receive, usdValue: usd };
  },

  async submitOnChain(req) {
    const v = this.validateOnChain(req);
    if (!v.ok) throw new Error(v.error);
    const key = `${req.symbol}|${req.address}|${req.amount}`;
    if (isDuplicate(key)) throw new Error("Duplicate withdrawal blocked. Please wait.");
    recent.push({ key, t: Date.now() });

    BalanceRepository.freeze(req.symbol, Number(req.amount));
    const tx = WithdrawalRepository.create({
      type: "onchain",
      symbol: req.symbol,
      network: req.networkId,
      address: req.address,
      memo: req.memo || "",
      amount: Number(req.amount),
      fee: v.fee,
      receive: v.receive,
      usdValue: v.usdValue,
    });
    NotificationRepository.push({
      title: "Withdrawal submitted",
      body: `${req.amount} ${req.symbol} to ${req.address.slice(0, 8)}…${req.address.slice(-6)}`,
    });

    // Simulated async processing pipeline
    setTimeout(() => {
      WithdrawalRepository.updateStatus(tx.id, "processing");
      NotificationRepository.push({ title: "Withdrawal processing", body: `Tx ${tx.id} is being broadcast.` });
    }, 1500);
    setTimeout(() => {
      BalanceRepository.debitFrozen(req.symbol, Number(req.amount));
      WithdrawalRepository.updateStatus(tx.id, "completed");
      NotificationRepository.push({ title: "Withdrawal completed", body: `${v.receive} ${req.symbol} sent successfully.` });
    }, 4500);

    return tx;
  },

  validateInternal({ symbol, amount, recipient, self }) {
    if (!recipient) return { ok: false, error: "Enter recipient email or UID" };
    if (self && (recipient === self.email || recipient === self.uid)) return { ok: false, error: "You cannot transfer to yourself" };
    const amt = Number(amount);
    if (!amt || amt <= 0) return { ok: false, error: "Enter a valid amount" };
    const bal = BalanceRepository.get(symbol);
    if (bal.available < amt) return { ok: false, error: "Insufficient available balance" };
    const usd = usdOf(symbol, amt);
    const lim = LimitsEngine.check(usd);
    if (!lim.ok) return lim;
    return { ok: true, usdValue: usd };
  },

  async submitInternal(req) {
    const v = this.validateInternal(req);
    if (!v.ok) throw new Error(v.error);
    BalanceRepository.debit(req.symbol, Number(req.amount));
    const tx = WithdrawalRepository.create({
      type: "internal",
      symbol: req.symbol,
      network: "BITCLUB",
      address: req.recipient,
      memo: req.memo || "",
      amount: Number(req.amount),
      fee: 0,
      receive: Number(req.amount),
      usdValue: v.usdValue,
      status: "completed",
      completedAt: Date.now(),
    });
    NotificationRepository.push({ title: "Internal transfer sent", body: `${req.amount} ${req.symbol} sent to ${req.recipient}` });
    NotificationRepository.push({ title: "Internal transfer received", body: `${req.recipient} received ${req.amount} ${req.symbol} (simulated)` });
    return tx;
  },

  validateSell({ symbol, amount, fiat, method }) {
    if (!fiat || !method) return { ok: false, error: "Choose fiat & payment method" };
    const amt = Number(amount);
    if (!amt || amt <= 0) return { ok: false, error: "Enter a valid amount" };
    const bal = BalanceRepository.get(symbol);
    if (bal.available < amt) return { ok: false, error: "Insufficient balance" };
    const usd = usdOf(symbol, amt);
    const lim = LimitsEngine.check(usd);
    if (!lim.ok) return lim;
    return { ok: true, usdValue: usd };
  },

  async submitSell(req) {
    const v = this.validateSell(req);
    if (!v.ok) throw new Error(v.error);
    const a = getAsset(req.symbol);
    const fiatRate = req.fiat === "EUR" ? 0.92 : req.fiat === "GBP" ? 0.78 : 1;
    const gross = a.priceUsd * Number(req.amount) * fiatRate;
    const fee = gross * (req.feeRate / 100);
    const net = gross - fee;

    BalanceRepository.debit(req.symbol, Number(req.amount));
    BalanceRepository.credit(req.fiat, net);

    const tx = WithdrawalRepository.create({
      type: "sell",
      symbol: req.symbol,
      network: req.method,
      address: req.fiat,
      amount: Number(req.amount),
      fee,
      receive: net,
      fiat: req.fiat,
      usdValue: v.usdValue,
      status: "completed",
      completedAt: Date.now(),
    });
    NotificationRepository.push({ title: "Sell completed", body: `Sold ${req.amount} ${req.symbol} for ${net.toFixed(2)} ${req.fiat}` });
    return tx;
  },
};
