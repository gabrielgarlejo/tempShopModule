import React from "react";
import "./VehicleCard.css";

export default function VehicleCard({
  vehicle,
  onRecordRepair,
  onUpdateStatus,
}) {
  return (
    <div className="vehicle-card">
      <img src={vehicle.image} alt="vehicle" className="vehicle-img" />
      <div className="vehicle-title">{vehicle.name}</div>
      <div className="vehicle-meta">
        VIN/SN: <span className="vehicle-vin">{vehicle.vin}</span>
        <br />
        License Plate: <span className="vehicle-plate">{vehicle.plate}</span>
      </div>
      <div className="vehicle-status">
        <span role="img" aria-label="warning">
          ⚠️
        </span>{" "}
        {vehicle.status}
      </div>
      <div className="vehicle-desc">
        <div>Last Repair Description: {vehicle.lastRepair}</div>
        <div>Next Scheduled Repair: {vehicle.nextRepair}</div>
      </div>
      <div className="vehicle-actions">
        <button onClick={() => onRecordRepair(vehicle)}>Record Repair</button>
        <button onClick={() => onUpdateStatus(vehicle)}>Update Status</button>
      </div>
    </div>
  );
}
