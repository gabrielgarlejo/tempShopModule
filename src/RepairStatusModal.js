import React, { useState } from "react";
import "./RepairStatusModal.css";

export function UpdateStatusModal({ open, onClose, onSave, vehicle }) {
  const [status, setStatus] = useState(
    vehicle?.status === "Available" ? "Available" : "Out of Service"
  );

  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Update Status</h2>
        <div>
          <label>
            <input
              type="radio"
              checked={status === "Available"}
              onChange={() => setStatus("Available")}
            />
            Available
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              checked={status === "Out of Service"}
              onChange={() => setStatus("Out of Service")}
            />
            Out of Service
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onSave(status)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export function RecordRepairModal({ open, onClose, onConfirm, vehicle }) {
  const [repair, setRepair] = useState("");
  const [type, setType] = useState(vehicle?.type || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [plate, setPlate] = useState(vehicle?.plate || "");

  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Repair</h2>
        <div>
          <label>Repair</label>
          <input value={repair} onChange={(e) => setRepair(e.target.value)} />
        </div>
        <div>
          <label>Type Of Vehicle</label>
          <input value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label>Plate Number</label>
          <input value={plate} onChange={(e) => setPlate(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onConfirm({ repair, type, date, time, plate })}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
