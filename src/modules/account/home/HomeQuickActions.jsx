import { useNavigate } from "react-router-dom";
import {
  BsGift,
  BsPeopleFill,
  BsPiggyBank,
  BsRobot,
  BsBuilding,
  BsGrid,
} from "react-icons/bs";

const ICONS = {
  Rewards: BsGift,
  Referral: BsPeopleFill,
  Earn: BsPiggyBank,
  "Trading bots": BsRobot,
  "IPO Prime": BsBuilding,
  More: BsGrid,
};

const items = [
  "Rewards",
  "Referral",
  "Earn",
  "Trading bots",
  "IPO Prime",
  "More",
];

const HomeQuickActions = () => {
  const navigate = useNavigate();

  const handleNavigation = (label) => {
    switch (label) {
      case "Rewards":
        navigate("/rewards");
        break;

      case "Referral":
        navigate("/referral");
        break;

      case "Earn":
        navigate("/earn");
        break;

      case "Trading bots":
        navigate("/trading-bots");
        break;

      case "IPO Prime":
        navigate("/ipo-prime");
        break;

      case "More":
        navigate("/more");
        break;

      default:
        break;
    }
  };
  return (
    <>
      <div style={{ padding: "16px 16px 6px" }}>
        <div
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          Get started with Bitclub!
        </div>
        <div
          style={{
            background: "linear-gradient(180deg,#0f1217 0%,#0a0c10 100%)",
            border: "1px solid #181b21",
            borderRadius: 14,
            padding: "18px 16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 22,
              lineHeight: 1.15,
            }}
          >
            Deposit and start
            <br />
            trading
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 6,
                background: "#15181d",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{ width: "66%", height: "100%", background: "#22c1c3" }}
              />
            </div>
            <div style={{ color: "#cfd2d6", fontSize: 12, fontWeight: 600 }}>
              2/3
            </div>
          </div>
          <div style={{ color: "#cfd2d6", fontSize: 13, marginTop: 10 }}>
            View all steps ›
          </div>
          <div
            style={{ position: "absolute", right: 14, top: 18, fontSize: 44 }}
          >
            👛
          </div>
        </div>
      </div>

      <div style={{ padding: "2px 14px 4px" }}>
        <button
          onClick={() => navigate("/add-funds")}
          style={{
            width: "100%",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "13px",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          Deposit
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          padding: "16px 16px 8px",
          scrollbarWidth: "none",
        }}
      >
        {items.map((label) => {
          const Icon = ICONS[label] || BsGrid;

          return (
            <div
              key={label}
              onClick={() => handleNavigation(label)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 64,
                cursor: "pointer",
              }}
            >
              <Icon color="#fff" size={22} />

              <span
                style={{
                  color: "#cfd2d6",
                  fontSize: 12,
                  textAlign: "center",
                  lineHeight: 1.15,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeQuickActions;
