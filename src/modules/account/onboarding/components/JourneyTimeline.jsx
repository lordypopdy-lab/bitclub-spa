import React from "react";
import JourneyStep from "./JourneyStep.jsx";

const JourneyTimeline = ({ steps }) => {
  const activeIdx = steps.findIndex((s) => !s.done);
  return (
    <div style={{ padding: "22px 16px 12px" }}>
      {steps.map((s, i) => (
        <JourneyStep
          key={s.id}
          index={i}
          step={s}
          active={i === activeIdx}
          last={i === steps.length - 1}
        />
      ))}
    </div>
  );
};

export default JourneyTimeline;
