import Sparkline from "./CoinSparkline.jsx";

const fmt = (n) => {
  if (n == null) return "—";
  if (n >= 1000)
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(6);
};

const MarketCard = ({
  symbol,
  category,
  price,
  change,
  color = "#22c1c3",
  seed = 1,
}) => {
  const up = change >= 0;
  return (
    <div
      style={{
        flex: "1 0 47%",
        background: "linear-gradient(180deg,#0f1217 0%,#0a0c10 100%)",
        border: "1px solid #181b21",
        borderRadius: 12,
        padding: "12px 14px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            minWidth: 0,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 11 }}>
            {symbol}
          </span>
          <span style={{ color: "#7d828a", fontSize: 11 }}>{category}</span>
        </div>
        <Sparkline
          color={up ? "#22c1c3" : "#ff5e7e"}
          seed={seed}
          up={up}
          width={50}
          height={22}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          marginTop: 8,
        }}
      >
        <span style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>
          {price < 1 ? `$${fmt(price)}` : fmt(price)}
        </span>
        <span
          style={{
            color: up ? "#22c1c3" : "#ff5e7e",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {up ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default MarketCard;
