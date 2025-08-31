import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MyMap from "../pages/GoogleMap";

const libraries = ["places", "visualization"];

export default function MapsWrapper() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <MyMap />
    </div>
  );
}
