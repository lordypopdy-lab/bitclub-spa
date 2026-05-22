import BalanceInfo from "./BalanceInfo";
import CurrencySelector from "./CurrencySelector";
import PaymentSelector from "./PaymentSelector";
import { ASSETS } from "./data/rates";

const SellTab = ({
  amount,
  asset,
  fiat,
  receiveWith,
  receiveEstimate,
  onPickAsset,
  onPickFiat,
  onPickReceiveWith,
}) => {
  const assetMeta = ASSETS[asset];
  const fiatMeta = ASSETS[fiat];
  return (
    <>
      <div style={{ paddingTop: 18, paddingBottom: 8 }}>
        <div className="d-flex align-items-baseline" style={{ gap: 10 }}>
          <span
            style={{
              color: "#fff",
              fontSize: 64,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            {amount || "0"}
          </span>
          <span style={{ color: "#4ec9ff", fontSize: 14, fontWeight: 600 }}>
            Max
          </span>
          <button
            onClick={onPickAsset}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            {asset} <span style={{ color: "#9a9a9a", fontSize: 12 }}>▾</span>
          </button>
        </div>
        <div style={{ color: "#7a7a7a", fontSize: 13, marginTop: 8 }}>
          Receive ≈ {receiveEstimate || "-"} {fiat}
        </div>
      </div>

      <BalanceInfo amount="0.00000000" symbol={asset} />

      <CurrencySelector
        icon={fiatMeta.icon}
        iconBg={fiatMeta.iconBg}
        label="Receive"
        value={fiat}
        onClick={onPickFiat}
      />
      <PaymentSelector
        icon={receiveWith.icon}
        iconBg={receiveWith.iconBg}
        label="Receive with"
        value={receiveWith.name}
        onClick={onPickReceiveWith}
      />
    </>
  );
};

export default SellTab;
