import { Link, useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import {
  BsClockHistory,
  BsMegaphone,
} from "react-icons/bs";

const items = [
  { to: "/p2p", label: "P2P", Icon: FiUsers },
  { to: "/p2p-orders", label: "Orders", Icon: BsClockHistory },
  { to: "/p2p-ads", label: "Ads", Icon: BsMegaphone },
];

const P2PBottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0a0b0d",
        borderTop: "1px solid #1c1f23",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 4px calc(8px + env(safe-area-inset-bottom))",
        zIndex: 100,
      }}
    >
      {items.map(({ to, label, Icon }) => {
        const active =
          path === to ||
          (to === "/p2p" && path.startsWith("/p2p-express"));

        const color = active ? "#fff" : "#7d828a";

        return (
          <Link
            key={to}
            to={to}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              color,
              textDecoration: "none",
              fontSize: 12,
              flex: 1,
              fontWeight: active ? 700 : 400,
            }}
          >
            <Icon size={22} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default P2PBottomNav;