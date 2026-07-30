import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHeader from "./components/NotificationHeader.jsx";
import NotificationDetailList from "./components/NotificationDetailList.jsx";
import ClearSheet from "./components/ClearSheet.jsx";
import { useNotificationsStore } from "./hooks/useNotificationsStore.js";
import { titleByKey } from "./data/mockData.js";

const styleTag = `
@keyframes notifFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes notifSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes notifShimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
`;

const CategoryPage = ({ categoryKey }) => {
  const store = useNotificationsStore();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(false);
  const items = store.state[categoryKey]?.items || [];
  const title = titleByKey[categoryKey] || "Notifications";
  const scrollKey = `bitclub_notif_scroll_${categoryKey}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const y = parseInt(window.sessionStorage.getItem(scrollKey) || "0", 10);
    if (y > 0) requestAnimationFrame(() => window.scrollTo(0, y));
    const onScroll = () =>
      window.sessionStorage.setItem(scrollKey, String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollKey]);

  const openItem = (n) => {
    if (typeof window !== "undefined")
      window.sessionStorage.setItem(scrollKey, String(window.scrollY));
    store.markRead(categoryKey, n.id);
    navigate(`/notifications/${categoryKey}/${n.id}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <style>{styleTag}</style>
      <NotificationHeader
        title={title}
        onAction={() => setSheet(true)}
        fallback="/notifications"
      />
      <NotificationDetailList
        categoryKey={categoryKey}
        items={items}
        onItemClick={openItem}
      />

      <ClearSheet
        open={sheet}
        onClose={() => setSheet(false)}
        currentLabel={title}
        onClearCurrent={() => {
          store.clearCategory(categoryKey);
          setSheet(false);
        }}
        onClearAll={() => {
          store.clearAll();
          setSheet(false);
        }}
      />
    </div>
  );
};

export default CategoryPage;
