import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiAward, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

const items = [
  { to: "/rewards", label: "Exclusive rewards", Icon: FiAward, exact: true },
  { to: "/rewards/redeem", label: "Redeem", Icon: FiShoppingBag },
  {
    to: "/rewards/promotion",
    label: "Promotion Center",
    Icon: FiTrendingUp,
    hot: true,
  },
];

const RewardsBottomNav = () => {
  const { pathname: path } = useLocation();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#000",
        borderTop: "1px solid #1c1f23",
        display: "flex",
        padding: "10px 4px calc(10px + env(safe-area-inset-bottom))",
        zIndex: 100,
      }}
    >
      {items.map(({ to, label, Icon, exact, hot }) => {
        const active = exact ? path === to : path.startsWith(to);
        const color = active ? "#fff" : "#7d828a";

        return (
          <Link
            key={to}
            to={to}
            style={{
              flex: 1,
              textAlign: "center",
              color,
              textDecoration: "none",
              fontSize: 11,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Icon size={22} />

              {hot && (
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    right: "50%",
                    marginRight: -28,
                    background: "#22c1c3",
                    color: "#0a0c0f",
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 999,
                  }}
                >
                  HOT
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: 4,
                fontWeight: active ? 700 : 500,
              }}
            >
              {label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default RewardsBottomNav;