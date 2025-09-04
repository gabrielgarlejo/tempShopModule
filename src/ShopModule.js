import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { UpdateStatusModal, RecordRepairModal } from "./RepairStatusModal";
import "./ShopModule.css";

const initialVehicles = [
  {
    id: 1,
    name: "LE-4",
    vin: "1C6RR7GU7ES176075",
    plate: "1A13333",
    image: "/logo192.png",
    status: "Under Repair",
    lastRepair: "Replaced alternator oil filter",
    nextRepair: "June 30, 2025",
    type: "Van",
  },
  {
    id: 2,
    name: "LE-4",
    vin: "1C6RR7GT8ES176075",
    plate: "1A13212",
    image: "/logo192.png",
    status: "Under Repair",
    lastRepair: "Replaced alternator oil filter",
    nextRepair: "June 3, 2025",
    type: "SUV",
  },
];

const notifications = [
  "Vehicle PW-1 is scheduled for repair on 06/23/2025",
  "New repair request submitted for LE-4",
];

function NotificationPanel({ notifications }) {
  return (
    <div className="notification-panel">
      <div className="notification-title">
        <span className="notification-icon">🔔</span>
        Incoming Notifications
      </div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          {notification}
        </div>
      ))}
    </div>
  );
}

function VehicleSearch({ filter, setFilter }) {
  return (
    <div className="vehicle-search">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Filter by vehicle name, plate, or status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

function VehicleCard({ vehicle, onRecordRepair, onUpdateStatus }) {
  return (
    <div className="vehicle-card">
      <div className="vehicle-header">
        <div className="vehicle-image">
          {vehicle.type === "Van" ? "🚐" : "🚙"}
        </div>
        <div className="vehicle-info">
          <h3>{vehicle.name}</h3>
          <div className="vehicle-details">
            VIN/SN: {vehicle.vin}
            <br />
            License Plate: {vehicle.plate}
          </div>
        </div>
      </div>

      <div className="vehicle-status">
        <span className="status-icon">⚠️</span>
        {vehicle.status}
      </div>

      <div className="repair-info">
        <div>
          <strong>Last Repair Description:</strong> {vehicle.lastRepair}
        </div>
        <div>
          <strong>Next Scheduled Repair:</strong> {vehicle.nextRepair}
        </div>
      </div>

      <div className="vehicle-actions">
        <button
          className="action-button"
          onClick={() => onRecordRepair(vehicle)}
        >
          Record Repair
        </button>
        <button
          className="action-button"
          onClick={() => onUpdateStatus(vehicle)}
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

export default function ShopModule() {
  const [filter, setFilter] = useState("");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(filter.toLowerCase()) ||
      v.plate.toLowerCase().includes(filter.toLowerCase()) ||
      v.status.toLowerCase().includes(filter.toLowerCase())
  );

  const handleUpdateStatus = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowStatusModal(true);
  };

  const handleSaveStatus = (status) => {
    setVehicles(
      vehicles.map((v) => (v.id === selectedVehicle.id ? { ...v, status } : v))
    );
    setShowStatusModal(false);
    setSelectedVehicle(null);
  };

  const handleRecordRepair = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowRepairModal(true);
  };

  const handleConfirmRepair = ({ repair, type, date, time, plate }) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === selectedVehicle.id
          ? {
              ...v,
              lastRepair: repair,
              nextRepair: date,
              type,
              plate,
            }
          : v
      )
    );
    setShowRepairModal(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="shop-module-root">
      <Sidebar />
      <div className="shop-main">
        <header className="shop-header">
          <div className="shop-avatar">
            <span role="img" aria-label="user">
              👤
            </span>
          </div>
        </header>
        <div className="shop-title">Shop Module</div>
        <NotificationPanel notifications={notifications} />
        <VehicleSearch filter={filter} setFilter={setFilter} />
        <div className="vehicle-list">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onRecordRepair={handleRecordRepair}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      </div>
      <UpdateStatusModal
        open={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSave={handleSaveStatus}
        vehicle={selectedVehicle}
      />
      <RecordRepairModal
        open={showRepairModal}
        onClose={() => setShowRepairModal(false)}
        onConfirm={handleConfirmRepair}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
