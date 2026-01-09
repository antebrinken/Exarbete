import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Custom marker icon to avoid missing default icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface MapMarker {
  id: string;
  position: [number, number];
  popup?: React.ReactNode;
}

interface MapViewProps {
  center: [number, number];
  markers: MapMarker[];
  selectedId?: string;
  onMarkerClick?: (markerId: string) => void;
  zoom?: number;
  height?: string;
}

function FlyToSelected({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 0.8 });
  }, [center, map]);
  return null;
}

const MapView: React.FC<MapViewProps> = ({ center, markers, selectedId, onMarkerClick, zoom = 13, height = "350px" }) => {
  // Center on selected marker if any
  const selectedMarker = markers.find((m) => m.id === selectedId);

  return (
    <div style={{ width: "100%", height, borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 32px #0002" }}>
      <MapContainer
        center={selectedMarker ? selectedMarker.position : center}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedMarker && <FlyToSelected center={selectedMarker.position} />}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            opacity={marker.id === selectedId ? 1 : 0.7}
            eventHandlers={onMarkerClick ? { click: () => onMarkerClick(marker.id) } : undefined}
          >
            {marker.popup && (
              <Popup>{marker.popup}</Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
