import { FiCheck } from "react-icons/fi";

const JourneyStep = ({ index, step, active, last }) => {
  const done = step.done;
  return (
    <div style={{ display: "flex", gap: 14, position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: done ? "#fff" : active ? "#fff" : "#15181d",
            color: done ? "#0a0c0f" : active ? "#0a0c0f" : "#7d828a",
            border: done ? "none" : active ? "none" : "1px solid #2a2e35",
            fontWeight: 800,
            fontSize: 12,
            boxShadow: done
              ? "0 0 14px rgba(34,193,195,0.55)"
              : active
                ? "0 0 12px rgba(255,255,255,0.25)"
                : "none",
            transition: "all 350ms ease",
          }}
        >
          {done ? <FiCheck size={16} /> : index + 1}
        </div>
        {!last && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 50,
              marginTop: 4,
              background: done
                ? "linear-gradient(180deg,#22c1c3, #2a2e35)"
                : "#2a2e35",
              transition: "background 400ms ease",
            }}
          />
        )}
      </div>
      <div
        style={{
          paddingBottom: 28,
          flex: 1,
          opacity: active || done ? 1 : 0.55,
        }}
      >
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>
          {step.title}
        </div>
        <div
          style={{
            color: "#9aa0a8",
            fontSize: 13,
            marginTop: 4,
            lineHeight: 1.4,
          }}
        >
          {step.desc}
        </div>
        {done && (
          <div
            style={{
              color: "#22c1c3",
              fontSize: 13,
              marginTop: 6,
              fontWeight: 600,
            }}
          >
            Completed
          </div>
        )}
        {active && !done && (
          <div
            style={{
              color: "#fcd9a0",
              fontSize: 12,
              marginTop: 6,
              fontWeight: 600,
            }}
          >
            In progress
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyStep;
