import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

export const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);
      L.marker([latitude, longitude]).addTo(mapInstance.current);
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '12px' }} />;
};