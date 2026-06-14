// Pure fee calculations. Reads from asset catalog; easy to swap with API.
import { getAsset } from "../data/assets.js";

export const FeeEngine = {
  forNetwork(symbol, networkId) {
    const a = getAsset(symbol);
    if (!a) return null;
    return a.networks.find((n) => n.id === networkId) || null;
  },
  calculate({ symbol, networkId, amount }) {
    const n = this.forNetwork(symbol, networkId);
    if (!n) return { fee: 0, receive: 0 };
    const fee = n.fee;
    const receive = Math.max(0, Number(amount || 0) - fee);
    return { fee, receive, eta: n.eta, min: n.min, max: n.max };
  },
};
