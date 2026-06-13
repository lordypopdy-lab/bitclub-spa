import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiHelpCircle,
  FiMoreHorizontal,
} from "react-icons/fi";

const RewardsHeader = ({ onShare, onHelp, onMore, fallback = "/" }) => {
  const navigate = useNavigate();

  const back = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        background: "#000",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <Link onClick={back} aria-label="Back" style={btn}>
        <FiArrowLeft size={22} />
      </Link>

      <div style={{ flex: 1 }} />

      <Link onClick={onShare} aria-label="Share" style={btn}>
        <FiShare2 size={18} />
      </Link>

      <Link
        onClick={onHelp}
        aria-label="Rules"
        style={{ ...btn, marginLeft: 14 }}
      >
        <FiHelpCircle size={18} />
      </Link>

      <Link
        onClick={onMore}
        aria-label="More"
        style={{ ...btn, marginLeft: 14 }}
      >
        <FiMoreHorizontal size={18} />
      </Link>
    </div>
  );
};

const btn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  padding: 0,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

export default RewardsHeader;
