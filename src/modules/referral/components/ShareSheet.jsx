import React from "react";
import Sheet from "../../rewards/components/Sheet.jsx";
import { FiCopy, FiImage, FiLink, FiShare2 } from "react-icons/fi";
import {
  FaXTwitter,
  FaTelegram,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa6";

const ShareSheet = ({ open, onClose, code, link }) => {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&bgcolor=ffffff&data=${encodeURIComponent(link)}`;

  const copy = (t) => {
    try {
      navigator.clipboard?.writeText(t);
    } catch (e) {}
  };
  const share = (where) => {
    const text = `Kickstart your 2026 journey with Bitclub. Sign up for a 6200 USDT welcome gift. ${link}`;
    const urls = {
      tg: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("Join Bitclub")}`,
      wa: `https://wa.me/?text=${encodeURIComponent(text)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    };
    if (urls[where]) window.open(urls[where], "_blank");
  };

  return (
    <Sheet open={open} onClose={onClose} title="" showClose={false}>
      <div
        style={{
          background: "#15181d",
          borderRadius: 14,
          padding: 18,
          position: "relative",
        }}
      >
        <div style={{ color: "#22c1c3", fontSize: 18, fontWeight: 800 }}>
          ◆ Bitclub
        </div>
        <div style={{ color: "#9aa0a8", fontSize: 13, marginTop: 14 }}>
          Kickstart your 2026 journey with Bitclub
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: 800,
            marginTop: 8,
            lineHeight: 1.3,
          }}
        >
          Sign up now to receive a<br />
          6200 USDT welcome gift
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 12,
              background: "linear-gradient(135deg,#22c1c3,#0a3a3c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
            }}
          >
            🎁
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <span style={{ color: "#0a0c0f", fontWeight: 700, fontSize: 13 }}>
              Referral code:
            </span>
            <span
              style={{
                color: "#0a0c0f",
                fontWeight: 800,
                fontSize: 14,
                marginLeft: 6,
              }}
            >
              {code}
            </span>
          </div>
          <img
            src={qr}
            alt="qr"
            width={56}
            height={56}
            style={{ borderRadius: 4 }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 10,
          marginTop: 18,
          padding: "0 4px",
        }}
      >
        <Action
          icon={<FiImage />}
          bg="#22c55e"
          label="Save"
          onClick={() => window.open(qr, "_blank")}
        />
        <Action
          icon={<FiLink />}
          bg="#22c55e"
          label="Copy"
          onClick={() => copy(link)}
        />
        <Action
          icon={<FaXTwitter />}
          bg="#000"
          border="#2a2e35"
          label="X"
          onClick={() => share("x")}
        />
        <Action
          icon={<FaTelegram />}
          bg="#3b82f6"
          label="Telegram"
          onClick={() => share("tg")}
        />
        <Action
          icon={<FaWhatsapp />}
          bg="#22c55e"
          label="WhatsApp"
          onClick={() => share("wa")}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 14,
        }}
      >
        <button onClick={onClose} style={btn1}>
          Cancel
        </button>
        <button onClick={() => share("fb")} style={btn2}>
          More
        </button>
      </div>
    </Sheet>
  );
};

const Action = ({ icon, label, bg, border, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      padding: 0,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      cursor: "pointer",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: bg,
        border: border ? `1px solid ${border}` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 11, color: "#cfd2d6" }}>{label}</div>
  </button>
);

const btn1 = {
  background: "#15181d",
  border: "1px solid #2a2e35",
  color: "#fff",
  borderRadius: 10,
  padding: "13px 0",
  fontWeight: 700,
  cursor: "pointer",
};
const btn2 = {
  background: "#fff",
  border: "none",
  color: "#0a0c0f",
  borderRadius: 10,
  padding: "13px 0",
  fontWeight: 800,
  cursor: "pointer",
};

export default ShareSheet;
