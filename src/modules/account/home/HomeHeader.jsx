import { Link } from "react-router-dom";
import { FiSearch, FiHeadphones, FiBell } from "react-icons/fi";

const HomeHeader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 16px 8px",
      background: "#000",
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        fontWeight: 800,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      B
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#15181d",
        borderRadius: 999,
        padding: "8px 14px",
        color: "#7d828a",
        fontSize: 13,
      }}
    >
      <FiSearch size={15} />
      <span>preOPAI</span>
    </div>
    <Link
      style={{
        background: "transparent",
        border: "none",
        color: "#cfd2d6",
        padding: 6,
      }}
    >
      <FiHeadphones size={20} />
    </Link>
    <Link
      style={{
        background: "transparent",
        border: "none",
        color: "#cfd2d6",
        position: "relative",
        padding: 6,
      }}
    >
      <FiBell size={20} />
      <span
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#22c1c3",
        }}
      />
    </Link>
  </div>
);

export default HomeHeader;
