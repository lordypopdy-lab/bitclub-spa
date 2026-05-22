import { Link } from "react-router-dom";
import { FiInfo, FiX } from "react-icons/fi";

const AssetBanner = ({ text = "Upgrade to unified account", onClose }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#0f1a24",
      border: "1px solid #14283a",
      borderRadius: 8,
      padding: "12px 14px",
      margin: "12px 16px",
      color: "#cfd2d6",
      fontSize: 14,
    }}
  >
    <FiInfo size={18} color="#cfd2d6" />
    <span style={{ flex: 1 }}>{text}</span>
    <Link
      onClick={onClose}
      style={{ background: "transparent", border: "none", color: "#7d828a", cursor: "pointer", padding: 0 }}
    >
      <FiX size={18} />
    </Link>
  </div>
);

export default AssetBanner;
