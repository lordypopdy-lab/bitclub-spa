import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const styleTag = `
@keyframes rwSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes rwFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes rwPop { 0% { transform: scale(0.85); opacity: 0; } 60% { transform: scale(1.04); opacity: 1; } 100% { transform: scale(1); } }
`;

const Sheet = ({
  open,
  onClose,
  title,
  children,
  height = "auto",
  showClose = true,
  padded = true,
}) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <style>{styleTag}</style>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          animation: "rwFadeIn 0.2s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0f1115",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: padded ? "10px 20px 24px" : 0,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "rwSlideUp 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          height,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "6px 0 10px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              background: "#2a2e35",
            }}
          />
        </div>
        {(title || showClose) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
              {title}
            </div>
            {showClose && (
              <Link
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: 4,
                  cursor: "pointer",
                }}
              >
                <FiX size={20} />
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Sheet;
