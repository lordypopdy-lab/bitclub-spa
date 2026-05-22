import CurrencySelector from "./CurrencySelector";
import PaymentSelector from "./PaymentSelector";
import { ASSETS } from "./data/rates";

const BuyTab = ({
  amount,
  fiat,
  asset,
  payment,
  receiveEstimate,
  onPickFiat,
  onPickAsset,
  onPickPayment,
}) => {
  const fiatMeta = ASSETS[fiat];
  const assetMeta = ASSETS[asset];
  return (
    <>
      <div style={{ paddingTop: 18, paddingBottom: 18 }}>
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
          <button
            onClick={onPickFiat}
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
            {fiat} <span style={{ color: "#9a9a9a", fontSize: 12 }}>▾</span>
          </button>
        </div>
        <div style={{ color: "#7a7a7a", fontSize: 13, marginTop: 8 }}>
          Receive ≈ {receiveEstimate || "-"} {asset}
        </div>
      </div>

      <div style={{ height: 60 }} />

      <CurrencySelector
        icon={assetMeta.icon}
        iconBg={assetMeta.iconBg}
        label="Buy"
        value={asset}
        badge={assetMeta.badge}
        onClick={onPickAsset}
      />
      <PaymentSelector
        icon={payment.icon}
        iconBg={payment.iconBg}
        label="Pay with"
        value={payment.name}
        onClick={onPickPayment}
      />
    </>
  );
};

export default BuyTab;
