import React, { useState } from 'react';
import useTrans from '@/hooks/useTrans';

export default function DistanceFilter() {
  const { t, isReverse } = useTrans();

  const [distance, setDistance] = useState(0);

  const handleDistanceChange = event => {
    setDistance(event.target.value);
  };

  const renderText = () => {
    if (isReverse) {
      return t('Hotel.distanceFromLocation');
    }
    return t('Hotel.distanceFromLocation');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <label
            htmlFor="distanceRange"
            className="form-label"
            dir={isReverse && 'rtl'}
          >
            {renderText()} {distance} m
          </label>
          <input
            type="range"
            className="form-range"
            id="distanceRange"
            min="0"
            max="10000"
            step="1"
            value={distance}
            onChange={handleDistanceChange}
          />
        </div>
      </div>
    </div>
  );
}
