"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const hazardData = [
  { year: 1991, country: "Bangladesh", city: "Chittagong", hazard: "Cyclone", lat: 22.3569, lng: 91.7832 },
  { year: 1992, country: "USA", city: "Homestead", hazard: "Hurricane", lat: 25.4687, lng: -80.4776 },
  { year: 1998, country: "Honduras", city: "Tegucigalpa", hazard: "Hurricane", lat: 14.0723, lng: -87.1921 },
  { year: 2004, country: "India", city: "Chennai", hazard: "Tsunami", lat: 13.0827, lng: 80.2707 },
  { year: 2004, country: "Indonesia", city: "Banda Aceh", hazard: "Tsunami", lat: 5.5483, lng: 95.3238 },
  { year: 2005, country: "USA", city: "New Orleans", hazard: "Hurricane", lat: 29.9511, lng: -90.0715 },
  { year: 2008, country: "India", city: "Cuddalore", hazard: "Cyclone", lat: 11.7447, lng: 79.768 },
  { year: 2008, country: "Myanmar", city: "Yangon", hazard: "Cyclone", lat: 16.8409, lng: 96.1735 },
  { year: 2009, country: "India", city: "Kolkata", hazard: "Cyclone", lat: 22.5726, lng: 88.3639 },
  { year: 2011, country: "Japan", city: "Sendai", hazard: "Tsunami", lat: 38.2682, lng: 140.8694 },
  { year: 2012, country: "India", city: "Mahabalipuram", hazard: "Cyclone", lat: 12.6208, lng: 80.192 },
  { year: 2013, country: "India", city: "Gopalpur", hazard: "Cyclone", lat: 19.2667, lng: 84.9167 },
  { year: 2013, country: "Philippines", city: "Tacloban", hazard: "Typhoon", lat: 11.2445, lng: 125.0029 },
  { year: 2014, country: "India", city: "Visakhapatnam", hazard: "Cyclone", lat: 17.6868, lng: 83.2185 },
  { year: 2016, country: "India", city: "Chennai", hazard: "Cyclone", lat: 13.0827, lng: 80.2707 },
  { year: 2017, country: "USA", city: "Florida Keys", hazard: "Hurricane", lat: 24.5557, lng: -81.7826 },
  { year: 2017, country: "USA", city: "Houston", hazard: "Hurricane", lat: 29.7604, lng: -95.3698 },
  { year: 2019, country: "India", city: "Puri", hazard: "Cyclone", lat: 19.8135, lng: 85.8312 },
  { year: 2020, country: "India", city: "Kolkata", hazard: "Cyclone", lat: 22.5726, lng: 88.3639 },
  { year: 2020, country: "Nicaragua", city: "Bluefields", hazard: "Hurricane", lat: 11.9964, lng: -83.764 },
  { year: 2021, country: "India", city: "Una", hazard: "Cyclone", lat: 20.8232, lng: 71.0379 },
  { year: 2021, country: "USA", city: "New Orleans", hazard: "Hurricane", lat: 29.9511, lng: -90.0715 },
  { year: 2023, country: "Mozambique", city: "Tete", hazard: "Cyclone", lat: -16.1564, lng: 33.5867 },
];

function HeatmapLayer() {
  const map = useMap();

  useEffect(() => {
    const points = hazardData.map((d) => [d.lat, d.lng, 1]); // lat, lng, intensity
    const heat = L.heatLayer(points, { radius: 25, blur: 15, maxZoom: 10 });
    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map]);

  return null;
}

export function HeatmapWithSlider() {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatmapLayer />
      {hazardData.map((d, i) => (
        <CircleMarker key={i} center={[d.lat, d.lng]} radius={5} color="red">
          <Popup>
            <b>{d.hazard}</b> <br />
            {d.city}, {d.country} <br />
            Year: {d.year}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
