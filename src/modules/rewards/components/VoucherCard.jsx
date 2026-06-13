import { Link } from "react-router-dom";
import { FiHelpCircle } from "react-icons/fi";

const VoucherCard = ({ item, canRedeem, onRedeem }) => (
  <div
    style={{
      border: "1px solid #1c1f23",
      borderRadius: 14,
      overflow: "hidden",
      background: "#0a0c0f",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        background: "linear-gradient(180deg, #5fbfc5 0%, #3a9ea4 100%)",
        padding: "22px 0 18px",
        textAlign: "center",
        borderBottomLeftRadius: "50% 22px",
        borderBottomRightRadius: "50% 22px",
        position: "relative",
      }}
    >
      <div
        style={{ color: "#fff", fontSize: 28, fontWeight: 800, lineHeight: 1 }}
      >
        {item.value}
      </div>
      <div
        style={{
          color: "#eaffff",
          fontSize: 12,
          marginTop: 6,
          letterSpacing: 1,
        }}
      >
        {item.unit}
      </div>
    </div>
    <div
      style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>
        <FiHelpCircle
          size={14}
          color="#7d828a"
          style={{ flexShrink: 0, marginTop: 2 }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}
      >
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
          {item.cost} Points
        </span>
        <span
          style={{
            color: "#22c1c3",
            border: "1px solid #22c1c3",
            borderRadius: 4,
            padding: "1px 6px",
            fontSize: 11,
          }}
        >
          {item.tag}
        </span>
      </div>
      <Link
        onClick={onRedeem}
        style={{
          marginTop: 14,
          background: "#15181d",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Redeem
      </Link>
    </div>
  </div>
);

export default VoucherCard;
