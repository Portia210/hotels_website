'use client';
import haversine from 'haversine-distance';

import { useSearchParams } from 'next/navigation';

const useDistanceCalc = () => {
  const params = useSearchParams();

  const getDistance = (hotelLat, hotelLon) => {
    if (!hotelLat || !hotelLon) return 0;
    let destination = params.get('destination');
    if (!destination) return 0;
    destination = JSON.parse(decodeURIComponent(destination));
    const lat = destination.lat;
    const lon = destination.lng;
    const origin = { lat, lon };
    const target = { lat: hotelLat, lon: hotelLon };
    const result = haversine(origin, target) / 1000; // in km
    return result.toFixed(2);
  };

  return { getDistance };
};

export default useDistanceCalc;
