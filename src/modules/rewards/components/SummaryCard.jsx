import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const SummaryCard = ({ points, couponsCount, onCheckIn, tier }) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 0.2,
            }}
          >
            Rewards Center
          </div>
          <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 6 }}>
            Earn points and redeem for USDT
          </div>
        </div>
        <Link
          onClick={onCheckIn}
          style={{
            background: "rgba(34,193,195,0.08)",
            border: "1px solid rgba(34,193,195,0.35)",
            color: "#fff",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 0 18px rgba(34,193,195,0.25)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Daily check-in
        </Link>
      </div>

      <div
        style={{
          marginTop: 18,
          position: "relative",
          borderRadius: 16,
          padding: "18px 16px",
          background: "linear-gradient(180deg, #15191f 0%, #0a0c0f 100%)",
          border: "1px solid #1c1f23",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -40,
            width: 140,
            height: 140,
            background:
              "radial-gradient(circle, rgba(34,193,195,0.18), transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            position: "relative",
          }}
        >
          <Link
            onClick={() => navigate({ to: "/rewards/history" })}
            style={{ ...rowBtn, flex: 1, justifyContent: "flex-start" }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: "1.5px solid #2a2e35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22c1c3",
                fontWeight: 800,
              }}
            >
              $
            </div>
            <div style={{ marginLeft: 12, textAlign: "left" }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {points}
              </div>
              <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 4 }}>
                Available points
              </div>
            </div>
            <FiChevronRight color="#7d828a" />
          </Link>
          <div
            style={{ width: 1, alignSelf: "stretch", background: "#1c1f23" }}
          />
          <Link
            onClick={() => navigate({ to: "/rewards/coupons" })}
            style={{ ...rowBtn, flex: 1, justifyContent: "flex-start" }}
          >
            <div style={{ textAlign: "left", flex: 1 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {couponsCount}
              </div>
              <div style={{ color: "#9aa0a8", fontSize: 12, marginTop: 4 }}>
                Coupons Center
              </div>
            </div>
            <FiChevronRight color="#7d828a" />
          </Link>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: tier.color,
              boxShadow: `0 0 10px ${tier.color}`,
            }}
          />
          <span style={{ color: "#cfd2d6", fontSize: 12 }}>
            Tier: <b style={{ color: "#fff" }}>{tier.name}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

const rowBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  padding: 0,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

export default SummaryCard;
