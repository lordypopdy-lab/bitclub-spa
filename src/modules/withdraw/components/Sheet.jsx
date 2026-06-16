import React, { useEffect } from "react";

const Sheet = ({ open, onClose, title, children, height = "auto" }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "flex-end", animation: "fadeIn 200ms ease", overflow: "hidden" }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: "100vw", background: "#0a0c0f", borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: "12px 0 calc(env(safe-area-inset-bottom) + 24px)", maxHeight: "85vh", overflowY: "auto", overflowX: "hidden",
        boxSizing: "border-box", wordBreak: "break-word", overflowWrap: "break-word",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
        animation: "slideUp 280ms cubic-bezier(.2,.8,.2,1)",
      }}>
        <div style={{ width: 36, height: 4, background: "#3a3f47", borderRadius: 2, margin: "4px auto 14px" }} />
        {title && <div style={{ padding: "0 20px 14px", fontWeight: 800, fontSize: 18, color: "#fff", wordBreak: "break-word" }}>{title}</div>}
        {children}
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%);} to { transform: none;} }
        @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
      `}</style>
    </div>
  );
};

export default Sheet;
