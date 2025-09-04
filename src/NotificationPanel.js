import React from "react";
import "./NotificationPanel.css";

export default function NotificationPanel({ notifications }) {
  return (
    <div className="notification-panel">
      <div className="notification-title">
        <span role="img" aria-label="bell">
          🔔
        </span>{" "}
        <b>Incoming Notifications</b>
      </div>
      <div className="notification-list">
        {notifications.map((n, i) => (
          <div key={i} className="notification-item">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
