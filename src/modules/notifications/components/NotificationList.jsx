import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/mockData.js";
import NotificationItem from "./NotificationItem.jsx";

const NotificationList = ({ store }) => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: 4 }}>
      {categories.map((c) => (
        <NotificationItem
          key={c.key}
          category={{ ...c, unread: store.unreadCount(c.key) }}
          onClick={() => {
            store.markAllRead(c.key);
            navigate( c.path );
          }}
        />
      ))}
    </div>
  );
};

export default NotificationList;
