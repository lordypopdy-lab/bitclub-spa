import { useState, useEffect } from "react";
import axios from "../../../services/api"; 
import { Link } from "react-router-dom";
import { timeAgo } from "../../../utils/timeAgo";

const NotificationModal = () => {
  const [notifications, setNotifications] = useState([]);

  const getNotification = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const { data } = await axios.post("/getNotification", { email });

      const list = data?.notificationList || [];

      setNotifications([...list].reverse());
    } catch (error) {
      console.log("Notification error:", error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="modal fade modalRight" id="notification">
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          {/* HEADER */}
          <div className="header fixed-top bg-surface d-flex justify-content-center align-items-center">
            <span className="left" data-bs-dismiss="modal" aria-hidden="true">
              <i className="icon-left-btn"></i>
            </span>
            <h3>Notification</h3>
          </div>

          {/* BODY */}
          <div className="overflow-auto pt-45 pb-16">
            <div className="tf-container">

              {notifications.length === 0 ? (
                <p style={{ textAlign: "center", color: "#777", marginTop: "20px" }}>
                  You're all caught up 🚀
                </p>
              ) : (
                <ul className="mt-12">
                  {notifications.map((item, index) => (
                    <li key={item._id || index} className="mt-12">

                      <Link to="#" className="noti-item bg-menuDark">

                        <div className="pb-8 line-bt d-flex justify-content-between">
                          <p className="text-button fw-6">
                            {item.header} {item.message}
                          </p>
                          <i className="dot-lg bg-primary"></i>
                        </div>

                        <span className="d-block mt-8">
                          {timeAgo(item.timestamp)}
                        </span>

                      </Link>

                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationModal;