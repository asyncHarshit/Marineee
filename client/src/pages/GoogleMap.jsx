import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 28.6139, lng: 77.2090 };

const MyMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", 
    googleMapsApiKey: apiKey || "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MyMap;
