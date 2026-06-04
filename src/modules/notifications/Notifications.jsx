import React, { useState } from "react";
import NotificationHeader from "./components/NotificationHeader.jsx";
import NotificationList from "./components/NotificationList.jsx";
import ClearSheet from "./components/ClearSheet.jsx";
import { useNotificationsStore } from "./hooks/useNotificationsStore.js";

const styleTag = `
@keyframes notifFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes notifSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
`;

const Notifications = () => {
  const store = useNotificationsStore();
  const [sheet, setSheet] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <style>{styleTag}</style>
      <NotificationHeader
        title="Notifications"
        onAction={() => setSheet(true)}
        fallback="/"
      />
      <NotificationList store={store} />
      <ClearSheet
        open={sheet}
        onClose={() => setSheet(false)}
        onClearAll={() => {
          store.clearAll();
          setSheet(false);
        }}
      />
    </div>
  );
};

export default Notifications;
