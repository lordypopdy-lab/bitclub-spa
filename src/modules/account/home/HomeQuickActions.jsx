import { useNavigate } from "react-router-dom";
import {
  BsGift,
  BsPeopleFill,
  BsPiggyBank,
  BsRobot,
  BsBuilding,
  BsGrid,
} from "react-icons/bs";
import { useOnboarding } from "../onboarding/hooks/useOnboarding.js";

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
  const { state } = useOnboarding();
  const pct = state.progress;
  return (
    <>
      <div style={{ padding: "16px 16px 6px" }}>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Get started with Bitget!
        </div>
        <div
          onClick={() => navigate("/onboarding/progress")}
          style={{
            background: "linear-gradient(180deg,#0f1217 0%,#0a0c10 100%)",
            border: "1px solid #181b21",
            borderRadius: 14,
            padding: "18px 16px",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
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
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: "#22c1c3",
                  transition: "width 500ms ease",
                }}
              />
            </div>
            <div style={{ color: "#cfd2d6", fontSize: 12, fontWeight: 600 }}>
              {state.completedSteps}/{state.totalSteps}
            </div>
          </div>
          <div
            style={{
              color: "#22c1c3",
              fontSize: 13,
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            View all steps ›
          </div>
          <div
            style={{ position: "absolute", right: 14, top: 18, fontSize: 44 }}
          >
            👛
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 16px 4px" }}>
        <button
          onClick={() => navigate("/add-funds")}
          style={{
            width: "100%",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "14px",
            fontWeight: 600,
            fontSize: 14,
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
          const target =
            label === "Rewards" || label === "Referral" ? "/rewards" : null;
          return (
            <div
              key={label}
              onClick={() => target && navigate( target )}
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
