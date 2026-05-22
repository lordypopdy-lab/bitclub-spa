import { Link } from "react-router-dom";

const HomeSubTabs = ({ tabs, active, onChange }) => (
  <div
    style={{
      display: "flex",
      gap: 8,
      overflowX: "auto",
      padding: "12px 16px 10px",
      scrollbarWidth: "none",
    }}
  >
    {tabs.map((t) => {
      const isActive = t === active;
      return (
        <Link
          key={t}
          onClick={() => onChange(t)}
          style={{
            background: isActive ? "#1a1d22" : "transparent",
            border: isActive ? "1px solid #2a2e35" : "1px solid transparent",
            color: isActive ? "#fff" : "#7d828a",
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {t}
        </Link>
      );
    })}
  </div>
);

export default HomeSubTabs;
