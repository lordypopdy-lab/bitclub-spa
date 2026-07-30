import React from "react";

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight = ({ text = "", query = "" }) => {
  const q = (query || "").trim();
  if (!q) return <>{text}</>;
  const parts = String(text).split(new RegExp(`(${escapeRe(q)})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={i}
            style={{
              background: "rgba(34,193,195,0.22)",
              color: "#22c1c3",
              padding: "0 2px",
              borderRadius: 3,
            }}
          >
            {p}
          </mark>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
};

export default React.memo(Highlight);
