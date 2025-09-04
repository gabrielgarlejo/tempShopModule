import React from "react";
import "./Sidebar.css";

export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">JMTC</div>
      <div className="sidebar-menu">
        <div className="sidebar-item active">
          <span role="img" aria-label="gear">
            ⚙️
          </span>{" "}
          Shop
        </div>
        <div className="sidebar-item" onClick={onLogout}>
          <span role="img" aria-label="logout">
            🔓
          </span>{" "}
          Logout
        </div>
      </div>
    </div>
  );
}
