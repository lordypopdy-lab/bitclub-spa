import { Link } from "react-router-dom";
import Sheet from "../../rewards/components/Sheet.jsx";
import { FaCheckCircle } from "react-icons/fa";

const ActiveInviteSheet = ({
  open,
  onClose,
  onInvite,
  eligible = 0,
  volume = 0,
}) => {
  const step1 = true;
  const pct1 = Math.min(100, (eligible / 1) * 100);
  const pct2 = Math.min(100, (volume / 5000) * 100);
  return (
    <Sheet open={open} onClose={onClose} title="">
      <div style={{ color: "#fcd9a0", fontSize: 20, fontWeight: 800 }}>
        Premier Inviter
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
        <div
          style={{ flex: 1, height: 3, background: "#fcd9a0", borderRadius: 2 }}
        />
        <div
          style={{ flex: 1, height: 3, background: "#3a2e1a", borderRadius: 2 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 18,
        }}
      >
        <FaCheckCircle color={step1 ? "#22c1c3" : "#3a3e44"} />
        <div style={{ flex: 1, color: "#fff", fontWeight: 600 }}>
          Account verified
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 12 }}>
          {step1 ? "Verified" : "Pending"}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginTop: 18,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#3a3e44",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          2
        </div>
        <div style={{ color: "#fff", fontWeight: 600 }}>
          Invite friends to complete any of the following tasks
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          border: "1px solid #3a2e1a",
          borderRadius: 12,
          padding: 14,
          background: "linear-gradient(180deg,#1a1206,#0a0c0f)",
        }}
      >
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
          Get 1 eligible invitee(s) in 30 days
        </div>
        <Bar pct={pct1} text={`${eligible}/1`} />
        <div
          style={{
            textAlign: "center",
            color: "#7d828a",
            fontSize: 11,
            margin: "14px 0",
            letterSpacing: 4,
          }}
        >
          ····· Or ·····
        </div>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
          All invitees reach a total trading volume of 5000 USDT within the past
          30 days
        </div>
        <Bar pct={pct2} text={`${Math.min(volume, 5000)}/5000`} />
        <Link
          onClick={onInvite}
          style={{
            marginTop: 14,
            width: "100%",
            background: "linear-gradient(90deg,#fcd9a0,#f5e0b0)",
            border: "none",
            color: "#1a1206",
            borderRadius: 12,
            padding: "13px 0",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Invite now
        </Link>
      </div>
      <div
        style={{
          color: "#7d828a",
          fontSize: 11,
          marginTop: 12,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Only invitees who sign up after the promotion launches will be included
        in the data calculations. Trading volume data is updated hourly.
      </div>
    </Sheet>
  );
};

const Bar = ({ pct, text }) => (
  <div style={{ position: "relative", marginTop: 10 }}>
    <div style={{ height: 4, background: "#2a2010", borderRadius: 999 }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg,#fcd9a0,#f5b06a)",
          borderRadius: 999,
        }}
      />
    </div>
    <div
      style={{
        textAlign: "right",
        color: "#9aa0a8",
        fontSize: 11,
        marginTop: 4,
      }}
    >
      {text}
    </div>
  </div>
);

export default ActiveInviteSheet;
