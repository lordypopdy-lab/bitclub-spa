import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const CampaignCard = ({ campaign, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: 16,
        padding: "20px 18px",
        background: campaign.accent,
        border: "1px solid #1c1f23",
        overflow: "hidden",
        cursor: "pointer",
        minHeight: 160,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${campaign.glow}, transparent 70%)`,
        }}
      />
      <div style={{ position: "relative", maxWidth: "70%" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>
          {campaign.title}
        </div>
        <div
          style={{
            color: "#cfd2d6",
            fontSize: 12,
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {campaign.description}
        </div>
        <Link
          style={{
            marginTop: 14,
            background: "#fff",
            color: "#0a0c0f",
            border: "none",
            borderRadius: 999,
            padding: "7px 14px",
            fontSize: 12,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
          }}
        >
          {campaign.cta} <FiChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
