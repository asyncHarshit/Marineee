import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";

const { BaseLayer, Overlay } = LayersControl;

const data = [
  {
    year: 1991,
    country: "Bangladesh",
    state: "Chittagong",
    city: "Chittagong",
    hazard: "Cyclone",
    event_count: 1,
    lat: 22.3350,
    lng: 91.8325,
  },
  {
    year: 1992,
    country: "USA",
    state: "Florida",
    city: "Homestead",
    hazard: "Hurricane",
    event_count: 1,
    lat: 25.4687,
    lng: -80.4776,
  },
  {
    year: 1998,
    country: "Honduras",
    state: "Francisco Morazán",
    city: "Tegucigalpa",
    hazard: "Hurricane",
    event_count: 1,
    lat: 14.0723,
    lng: -87.1921,
  },
  {
    year: 2004,
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
    hazard: "Tsunami",
    event_count: 1,
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    year: 2004,
    country: "Indonesia",
    state: "Aceh",
    city: "Banda Aceh",
    hazard: "Tsunami",
    event_count: 1,
    lat: 5.5483,
    lng: 95.3238,
  },
];

// Convert data for heat layer [lat, lng, intensity]
const heatData = data.map((d) => [d.lat, d.lng, d.event_count]);

export const SpatialHeatMap = () => {
  return (
    <MapContainer
      center={[20, 80]}
      zoom={3}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        {/* Heatmap Layer */}
        <Overlay checked name="Heatmap">
          <LayerGroup>
            {heatData.length > 0 &&
              (() => {
                const heatLayer = L.heatLayer(heatData, {
                  radius: 25,
                  blur: 15,
                  maxZoom: 10,
                });
                heatLayer.addTo(L.layerGroup());
              })()}
          </LayerGroup>
        </Overlay>

        {/* Circle Markers with Popups */}
        <Overlay checked name="Event Markers">
          <LayerGroup>
            {data.map((d, idx) => (
              <CircleMarker
                key={idx}
                center={[d.lat, d.lng]}
                radius={8}
                color="red"
                fillOpacity={0.7}
              >
                <Popup>
                  <b>{d.city}, {d.country}</b> <br />
                  Year: {d.year} <br />
                  State/Region: {d.state} <br />
                  Hazard: {d.hazard} <br />
                  Event Count: {d.event_count}
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default SpatialHeatMap;
