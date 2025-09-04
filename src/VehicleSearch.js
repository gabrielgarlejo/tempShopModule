import React from "react";
import "./VehicleSearch.css";

export default function VehicleSearch({ filter, setFilter }) {
  return (
    <div className="vehicle-search">
      <span role="img" aria-label="search">
        🔍
      </span>
      <input
        type="text"
        placeholder="Filter by vehicle name, plate, or status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
