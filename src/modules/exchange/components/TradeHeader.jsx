import { Link } from "react-router-dom";
import { FiArrowLeft, FiHelpCircle, FiClock } from "react-icons/fi";

const TradeHeader = ({ onBack }) => {
  const iconBtn = {
    background: "transparent",
    border: "none",
    color: "#fff",
    padding: 6,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between px-3"
      style={{
        height: 56,
        background: "#000",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link onClick={onBack} style={iconBtn} aria-label="Back">
        <FiArrowLeft size={22} color="#fff" />
      </Link>
      <div style={{ color: "#fff", fontSize: 17, fontWeight: 600 }}>
        Buy &amp; Sell
      </div>
      <div className="d-flex align-items-center" style={{ gap: 6 }}>
        <Link to="/assets/withdraw/history" style={iconBtn} aria-label="History">
          <FiClock size={20} color="#fff" />
        </Link>
        <Link to="#" style={iconBtn} aria-label="Help">
          <FiHelpCircle size={20} color="#fff" />
        </Link>
      </div>
    </div>
  );
};

export default TradeHeader;
