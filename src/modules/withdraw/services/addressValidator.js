// Address format validation per network. Pure functions.
import { getAsset } from "../data/assets.js";

export const AddressValidator = {
  validate(symbol, networkId, address) {
    if (!address || typeof address !== "string") return { ok: false, error: "Address is required" };
    const a = getAsset(symbol);
    if (!a) return { ok: false, error: "Unknown asset" };
    const n = a.networks.find((x) => x.id === networkId);
    if (!n) return { ok: false, error: "Unknown network" };
    if (!n.regex.test(address.trim())) return { ok: false, error: `Invalid ${networkId} address format` };
    return { ok: true };
  },
};
