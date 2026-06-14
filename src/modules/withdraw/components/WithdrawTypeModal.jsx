import { Link } from "react-router-dom";
import { FiArrowUpRight, FiRepeat, FiMinusCircle, FiX } from "react-icons/fi";

const options = [
  {
    title: "On-chain withdrawal",
    description:
      "Send tokens to the recipient's address via the blockchain network.",
    icon: FiArrowUpRight,
    path: "/assets/withdraw/onchain",
  },
  {
    title: "Internal transfer",
    description: "Send tokens to another BITCLUB user with zero fees.",
    icon: FiRepeat,
    path: "/assets/withdraw/internal",
  },
  {
    title: "Sell crypto",
    description:
      "Instantly sell cryptocurrencies for fiat and receive funds directly.",
    icon: FiMinusCircle,
    path: "/buy-sell",
  },
];

const WithdrawTypeModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.65)",
          zIndex: 9998,
        }}
      />

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: "#0c0d0e",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: "12px 16px 30px",
          animation: "slideUp .25s ease",
        }}
      >
        <div
          style={{
            width: 60,
            height: 5,
            background: "#131315",
            borderRadius: 99,
            margin: "0 auto 20px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Select withdrawal type
          </h3>

          <Link
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
            }}
          >
            <FiX size={22} />
          </Link>
        </div>

        {options.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              onClick={() => onSelect(item.path)}
              style={{
                border: "1px solid #060608",
                borderRadius: 14,
                padding: 20,
                marginBottom: 14,
                cursor: "pointer",
                background: "#131415",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "#1d2027",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#fff" />
                </div>

                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes slideUp{
            from{
              transform:translateY(100%);
            }
            to{
              transform:translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default WithdrawTypeModal;
