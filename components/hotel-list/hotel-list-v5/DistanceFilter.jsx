import React, { useState } from 'react';

export default function DistanceFilter() {
  const [distance, setDistance] = useState(0);

  const handleDistanceChange = event => {
    setDistance(event.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <label htmlFor="distanceRange" className="form-label">
            Distance from location: {distance} m
          </label>
          <input
            type="range"
            className="form-range"
            id="distanceRange"
            min="0"
            max="100"
            step="1"
            value={distance}
            onChange={handleDistanceChange}
          />
        </div>
      </div>
    </div>
  );
}
