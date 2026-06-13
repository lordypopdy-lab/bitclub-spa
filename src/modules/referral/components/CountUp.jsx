import React, { useEffect, useRef, useState } from "react";

const CountUp = ({
  value,
  duration = 800,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const [n, setN] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - k, 3);
      setN(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const formatted = decimals
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString();
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default CountUp;
