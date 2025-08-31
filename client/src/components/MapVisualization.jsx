"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Satellite, Database, Layers, MapPin, Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 20.5937, lng: 78.9629 }; // Default India center

export function MapVisualization() {
  const [activeOverlay, setActiveOverlay] = useState("satellite");
  const [isLiveAnalysis] = useState(true);
  const [uploads, setUploads] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API, // ensure key is in .env
    version: "weekly", // required for AdvancedMarkerElement
    libraries: ["marker"], // load advanced marker library
  });

  // Fetch uploads from backend
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/citizen/uploads");
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setUploads(data.data);
        }
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    };
    fetchUploads();
  }, []);

  // Initialize markers when uploads change

const infoWindowRef = useRef(null);

const initializeMarkers = useCallback(() => {
  if (!mapRef.current || !window.google?.maps?.marker) return;

  // Clear old markers
  if (mapRef.current.advancedMarkers) {
    mapRef.current.advancedMarkers.forEach((m) => m.setMap(null));
  }
  mapRef.current.advancedMarkers = [];

  // Create a single reusable InfoWindow
  if (!infoWindowRef.current) {
    infoWindowRef.current = new window.google.maps.InfoWindow();
  }

  uploads.forEach((upload) => {
    const pin = document.createElement("img");
    pin.src = upload.type === "image" ? "public/camera.png" : "public/video.png";
    pin.style.width = "20px";
    pin.style.height = "20px";

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: { lat: upload.location.lat, lng: upload.location.lng },
      map: mapRef.current,
      content: pin,
    });

    marker.addListener("click", () => {
      // Build content dynamically
      const content = `
        <div style="max-width:280px; padding:4px">
          ${
            upload.type === "image"
              ? `<img src="${upload.url}" style="width:100%; border-radius:8px;" />`
              : `<video src="${upload.url}" controls style="width:100%; border-radius:8px;"></video>`
          }
          <p style="font-size:12px; margin-top:6px;">
            Uploaded by ${upload.user?.name || "Anonymous"}
          </p>
        </div>
      `;

      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open({
        anchor: marker,
        map: mapRef.current,
      });
    });

    mapRef.current.advancedMarkers.push(marker);
  });
}, [uploads]);


  useEffect(() => {
    if (isLoaded && uploads.length > 0) {
      initializeMarkers();
    }
  }, [isLoaded, uploads, initializeMarkers]);

  const overlayOptions = [
    { id: "satellite", label: "Satellite Imagery", icon: Satellite },
    { id: "gap", label: "Gap Dataset", icon: Database },
    { id: "overlay", label: "Overlay Layers", icon: Layers },
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Google Earth Engine Map</h3>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={isLiveAnalysis ? "default" : "secondary"}
                  className="text-xs bg-green-100 text-green-700 border-0"
                >
                  Live Analysis
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0">
        <div className="relative h-90 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl mx-6 mb-4 overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              onLoad={(map) => (mapRef.current = map)}
              options={{ mapId: "DEMO_MAP_ID" }} 
            >
              {/* InfoWindow replacement */}
              {activeMarker && (
                <div
                  className="absolute bg-white shadow-lg rounded-lg p-3"
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {activeMarker.type === "image" ? (
                    <img
                      src={activeMarker.url}
                      alt="Uploaded content"
                      className="rounded-lg max-h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={activeMarker.url}
                      controls
                      className="rounded-lg max-h-48 w-full"
                    />
                  )}
                  <p className="text-xs text-gray-600 mt-2">
                    Uploaded by {activeMarker.user?.name || "Anonymous"}
                  </p>
                  <button
                    className="text-red-500 text-xs mt-2"
                    onClick={() => setActiveMarker(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading Map...
            </div>
          )}

          {/* Analysis Tools Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Earth Engine Analysis
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Real-time Processing
              </span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {overlayOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={
                      activeOverlay === option.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveOverlay(option.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Last Updated: 2 min ago
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
