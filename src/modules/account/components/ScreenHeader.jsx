import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const ScreenHeader = ({
  title,
  right,
  onBack,
  fallback = "/",
}) => {
  const navigate = useNavigate();

  const back = () => {
    if (onBack) {
      return onBack();
    }

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        position: "sticky",
        top: 0,
        background: "#0a0b0d",
        zIndex: 50,
      }}
    >
      <Link
        onClick={back}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          padding: 0,
          width: 36,
          cursor: "pointer",
        }}
        aria-label="Back"
      >
        <FiArrowLeft size={22} />
      </Link>

      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "#fff",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          minWidth: 36,
          justifyContent: "flex-end",
        }}
      >
        {right}
      </div>
    </div>
  );
};

export default ScreenHeader;