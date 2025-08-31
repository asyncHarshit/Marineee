import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Hazard dataset with coordinates (only entries with lat/long)
const hazardData = [
  {
    country: "Bangladesh",
    city: "Chittagong",
    hazard: "Cyclone",
    event_count: 1,
    avg_impact: 40,
    lat: 22.33500,
    lng: 91.83250,
  },
  {
    country: "Honduras",
    city: "Tegucigalpa",
    hazard: "Hurricane",
    event_count: 1,
    avg_impact: 40,
    lat: 14.45411,
    lng: -87.06243,
  },
  {
    country: "India",
    city: "Gopalpur",
    hazard: "Cyclone",
    event_count: 1,
    avg_impact: 95,
    lat: 19.264721,
    lng: 84.862005,
  },
  {
    country: "India",
    city: "Kolkata",
    hazard: "Cyclone",
    event_count: 2,
    avg_impact: 61.5,
    lat: 22.572645,
    lng: 88.363892,
  },
  {
    country: "Myanmar",
    city: "Yangon",
    hazard: "Cyclone",
    event_count: 1,
    avg_impact: 47,
    lat: 17.034213,
    lng: 95.226667,
  },
  {
    country: "Nicaragua",
    city: "Bluefields",
    hazard: "Hurricane",
    event_count: 1,
    avg_impact: 57,
    lat: 12.01366,
    lng: -83.76353,
  },
  {
    country: "Philippines",
    city: "Tacloban",
    hazard: "Typhoon",
    event_count: 1,
    avg_impact: 57,
    lat: 12.244553,
    lng: 125.038816,
  },
  {
    country: "USA",
    city: "Florida Keys",
    hazard: "Hurricane",
    event_count: 1,
    avg_impact: 52,
    lat: 27.8333,
    lng: -81.717,
  },
];

export default function SeverityHeatmap() {
  return (
    <MapContainer
      center={[20, 80]}
      zoom={3}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hazardData.map((point, idx) => (
        <CircleMarker
          key={idx}
          center={[point.lat, point.lng]}
          radius={Math.sqrt(point.avg_impact)} // proportional size
          pathOptions={{ color: "red", fillOpacity: 0.6 }}
        >
          <Popup>
            <div>
              <strong>{point.country}</strong> - {point.city}
              <br /> Hazard: {point.hazard}
              <br /> Event Count: {point.event_count}
              <br /> Avg Impact Score: {point.avg_impact}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
