import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { BsBarChartLine, BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { HiOutlineWallet } from "react-icons/hi2";

const MenubarFooter = () => {
  const location = useLocation();

  const items = [
    { to: "/home", label: "Home", Icon: FiHome },
    { to: "/markets", label: "Markets", Icon: BsBarChartLine },
    { to: "/p2p", label: "Trade", Icon: BsArrowLeftRight },
    { to: "/assets", label: "Assets", Icon: HiOutlineWallet },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#000",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 4px calc(8px + env(safe-area-inset-bottom))",
        zIndex: 100,
        borderTopRightRadius: "37px",
        borderTopLeftRadius: "37px",
      }}
    >
      {items.map(({ to, label, Icon }) => {
        const active =
          to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(to);

        const color = active ? "#ffffff" : "#7d828a";

        return (
          <Link
            key={to}
            to={to}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: -3,
              color,
              textDecoration: "none",
              fontSize: 12,
              flex: 1,
              transition: "all 0.2s ease",
            }}
          >
            <Icon
              size={24}
              style={{
                transform: active ? "scale(1.05)" : "scale(1)",
                transition: "0.2s",
              }}
            />
            <span
              style={{
                fontWeight: active ? "600" : "400",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MenubarFooter;