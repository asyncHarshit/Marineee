import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Search, MapPin } from "lucide-react";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India center

export const MapWithUploads = () => {
  const [mapMode, setMapMode] = useState("roadmap");
  const [uploads, setUploads] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [currentLocation, ] = useState("");

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  // fetch uploads
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("/citizen/uploads");
        if (res.data.success) {
          setUploads(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    };
    fetchUploads();
  }, []);

  // Hardcoded hotspots near coastal areas
  const hotspots = [
    {
      id: "mumbai",
      position: { lat: 19.076, lng: 72.8777 },
      label: "⚠️ High Alert: Mumbai Coastal Reports",
      color: "red",
    },
    {
      id: "chennai",
      position: { lat: 13.0827, lng: 80.2707 },
      label: "⚠️ Moderate Alert: Chennai Coastline",
      color: "yellow",
    },
    {
      id: "vizag",
      position: { lat: 17.6868, lng: 83.2185 },
      label: "⚠️ Warning: Visakhapatnam Bay Activities",
      color: "orange",
    },
    {
      id: "kochi",
      position: { lat: 9.9312, lng: 76.2673 },
      label: "⚠️ Kochi Harbour Incident Reports",
      color: "red",
    },
  ];

  const mapLayers = [
    { id: "roadmap", label: "Roadmap" },
    { id: "satellite", label: "Satellite" },
    { id: "terrain", label: "Terrain" },
    { id: "marine", label: "Marine" }, // fallback to roadmap styling
  ];

  return (
    <Card className="bg-white h-120">
      <CardContent className="p-0 h-full relative">
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {mapLayers.map((layer) => (
            <Button
              key={layer.id}
              variant={mapMode === layer.id ? "default" : "outline"}
              size="sm"
              onClick={() => setMapMode(layer.id)}
              className={`${
                mapMode === layer.id
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              } shadow-lg`}
            >
              {layer.label}
            </Button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Area */}
        <div className="relative h-full rounded-lg overflow-hidden">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={5}
              mapTypeId={
                mapMode === "satellite"
                  ? "satellite"
                  : mapMode === "terrain"
                  ? "terrain"
                  : "roadmap"
              }
            >
              {/* Upload markers */}
              {uploads.map((upload) => (
                <Marker
                  key={upload._id}
                  position={{
                    lat: upload.location?.lat,
                    lng: upload.location?.lng,
                  }}
                  icon={{
                    url:
                      upload.type === "video"
                        ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                  onClick={() => setSelectedUpload(upload)}
                />
              ))}

              {/* InfoWindow for selected upload */}
              {selectedUpload && (
                <InfoWindow
                  position={{
                    lat: selectedUpload.location.lat,
                    lng: selectedUpload.location.lng,
                  }}
                  onCloseClick={() => setSelectedUpload(null)}
                >
                  <div className="max-w-xs">
                    {selectedUpload.type === "image" ? (
                      <img
                        src={selectedUpload.url}
                        alt="Uploaded"
                        className="rounded-lg w-48 h-32 object-cover"
                      />
                    ) : (
                      <video
                        src={selectedUpload.url}
                        controls
                        className="rounded-lg w-48 h-32"
                      />
                    )}
                    <p className="text-xs mt-2 text-gray-600">
                      Uploaded by {selectedUpload.user?.name || "Citizen"}
                    </p>
                  </div>
                </InfoWindow>
              )}

              {/* Hardcoded Hotspots */}
              {hotspots.map((spot) => (
                <Marker
                  key={spot.id}
                  position={spot.position}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: spot.color,
                    fillOpacity: 1,
                    strokeWeight: 1,
                  }}
                  onClick={() => setSelectedHotspot(spot)}
                />
              ))}

              {/* InfoWindow for hotspot */}
              {selectedHotspot && (
                <InfoWindow
                  position={selectedHotspot.position}
                  onCloseClick={() => setSelectedHotspot(null)}
                >
                  <div className="p-2 text-sm">
                    {selectedHotspot.label}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}

          {/* Current Location */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                {currentLocation || "Fetching..."}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
