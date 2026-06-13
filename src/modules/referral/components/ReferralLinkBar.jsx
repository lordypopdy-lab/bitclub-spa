import { Link } from "react-router-dom";
import { FiCopy, FiShare2 } from "react-icons/fi";

const ReferralLinkBar = ({ link, code, onShare }) => {
  const copy = (text) => {
    try {
      navigator.clipboard?.writeText(text);
    } catch (e) {}
  };
  return (
    <div style={{ padding: "0 16px", marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#15181d",
          border: "1px solid #1c1f23",
          borderRadius: 12,
          padding: "10px 12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#7d828a", fontSize: 10 }}>Referral link</div>
          <div
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {link}
          </div>
        </div>
        <Link onClick={() => copy(link)} style={btn}>
          <FiCopy size={14} />
        </Link>
        <Link
          onClick={onShare}
          style={{ ...btn, background: "#22c1c3", color: "#0a0c0f" }}
        >
          <FiShare2 size={14} />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
          background: "#15181d",
          border: "1px solid #1c1f23",
          borderRadius: 12,
          padding: "10px 12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#7d828a", fontSize: 10 }}>Referral code</div>
          <div
            style={{
              color: "#fcd9a0",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            {code}
          </div>
        </div>
        <Link onClick={() => copy(code)} style={btn}>
          <FiCopy size={14} />
        </Link>
      </div>
    </div>
  );
};

const btn = {
  background: "#1c1f23",
  border: "none",
  color: "#fff",
  borderRadius: 8,
  padding: "8px 10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  fontWeight: 700,
};

export default ReferralLinkBar;
