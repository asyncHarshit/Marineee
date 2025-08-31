import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Satellite, Navigation, Eye } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export const EmergnecyMapView = () => {
  const [uploads, setUploads] = useState([]);
  const [selected, setSelected] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await fetch("/citizen/uploads");
        const data = await res.json();
        if (data.success) setUploads(data.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Badge variant="destructive">Live Emergency - High Priority</Badge>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Satellite className="w-4 h-4 mr-2" /> Satellite
          </Button>
          <Button variant="outline" size="sm">
            <Navigation className="w-4 h-4 mr-2" /> Directions
          </Button>
          <Button variant="default" size="sm">
            <Eye className="w-4 h-4 mr-2" /> Live View
          </Button>
        </div>
      </div>

      {/* Google Map */}
      <div className="relative h-96">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 20.5937, lng: 78.9629 }} // India center fallback
            zoom={5}
          >
            {uploads.map((upload) => (
              <Marker
                key={upload._id}
                position={{
                  lat: upload.location.lat,
                  lng: upload.location.lng,
                }}
                onClick={() => setSelected(upload)}
                icon={{
                  url:
                    upload.type === "video"
                      ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                      : "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                }}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{
                  lat: selected.location.lat,
                  lng: selected.location.lng,
                }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="p-2 w-64">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Reported by: {selected.user?.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Type: {selected.type.toUpperCase()}
                  </p>

                  {/* Media Preview */}
                  {selected.type === "image" ? (
                    <img
                      src={selected.url}
                      alt="report"
                      className="rounded-lg w-full h-32 object-cover mb-2"
                    />
                  ) : (
                    <video
                      src={selected.url}
                      controls
                      className="rounded-lg w-full h-32 object-cover mb-2"
                    />
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(selected.createdAt).toLocaleString()}
                    </span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};
