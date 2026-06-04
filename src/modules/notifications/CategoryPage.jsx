import React, { useState } from "react";
import NotificationHeader from "./components/NotificationHeader.jsx";
import NotificationDetailList from "./components/NotificationDetailList.jsx";
import ClearSheet from "./components/ClearSheet.jsx";
import { useNotificationsStore } from "./hooks/useNotificationsStore.js";
import { titleByKey } from "./data/mockData.js";

const styleTag = `
@keyframes notifFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes notifSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
`;

const CategoryPage = ({ categoryKey }) => {
  const store = useNotificationsStore();
  const [sheet, setSheet] = useState(false);
  const items = store.state[categoryKey]?.items || [];
  const title = titleByKey[categoryKey] || "Notifications";

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
        onItemClick={(n) => store.markRead(categoryKey, n.id)}
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
