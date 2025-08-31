import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 20.5937, // India center
  lng: 78.9629,
};

const hotspots = [
  {
    id: 1,
    lat: 19.076, // Mumbai
    lng: 72.8777,
    color: "red",
    message: "⚠️ High Alert: Mumbai Coastal Reports",
  },
  {
    id: 2,
    lat: 13.0827, // Chennai
    lng: 80.2707,
    color: "yellow",
    message: "⚠️ Moderate Alert: Chennai Coastline",
  },
  {
    id: 3,
    lat: 17.6868, // Vizag
    lng: 83.2185,
    color: "orange",
    message: "⚠️ Warning: Visakhapatnam Bay Activities",
  },
  {
    id: 4,
    lat: 9.9312, // Kochi
    lng: 76.2673,
    color: "red",
    message: "⚠️ Kochi Harbour Incident Reports",
  },
];

export function CommandMapCard() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });


  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <div className="text-center">Loading map...</div>;

  return (
    <div className="absolute inset-6 mt-20 rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          styles: [
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#aadaff" }],
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [{ color: "#e6f2ff" }],
            },
          ],
          disableDefaultUI: true,
        }}
      >
        {hotspots.map((spot) => (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            onClick={() => setSelected(spot.id)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: spot.color,
              fillOpacity: 0.9,
              scale: 10,
              strokeWeight: 1,
              strokeColor: "white",
            }}
          />
        ))}

        {hotspots.map(
          (spot) =>
            selected === spot.id && (
              <InfoWindow
                key={spot.id}
                position={{ lat: spot.lat, lng: spot.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="text-sm font-semibold text-red-600">
                  {spot.message}
                </div>
              </InfoWindow>
            )
        )}
      </GoogleMap>
    </div>
  );
}
