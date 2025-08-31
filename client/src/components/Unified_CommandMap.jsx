import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Signal, Users, Share2, Monitor } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 20.5937, // India center
  lng: 78.9629,
};

export const UnifiedCommandMap = ({ credibilityHotspots }) => {
  const [mapMode, setMapMode] = useState("hotspots");
  const [activeMarker, setActiveMarker] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  // Hardcoded coastal hotspots
  const coastalHotspots = [
    {
      id: "mumbai",
      lat: 19.076,
      lng: 72.8777,
      warning: "Cyclone Warning: Heavy rainfall & strong winds expected in Mumbai coastline.",
    },
    {
      id: "chennai",
      lat: 13.0827,
      lng: 80.2707,
      warning: "Flood Alert: Rising sea levels detected near Chennai shoreline.",
    },
    {
      id: "vizag",
      lat: 17.6868,
      lng: 83.2185,
      warning: "Tsunami Risk: High seismic activity reported near Visakhapatnam coast.",
    },
  ];

  // Hardcoded news for Social Media / News mode
  const hardcodedNews = [
    {
      id: "manali",
      city: "Manali",
      state: "Himachal Pradesh",
      lat: 32.24,
      lng: 77.19,
      news: "The Beas river has been in spate, washing away parts of the Chandigarh-Manali highway and causing significant damage. Viral videos show a pickup truck being swallowed by the raging Beas river.",
      source: "https://timesofindia.indiatimes.com/city/shimla/himachal-floods-beas-river-washes-away-parts-of-chandigarh-highway-manali-leh-road-blocked/articleshow/123516606.cms",
    },
    {
      id: "pathankot",
      city: "Pathankot",
      state: "Punjab",
      lat: 32.26,
      lng: 75.64,
      news: "Severe flooding with rivers flowing above danger levels. Indian Army and NDRF conducting rescue operations. Over 1,000 villages impacted.",
      source: "https://timesofindia.indiatimes.com/city/chandigarh/barnala-mansa-go-under-as-punjab-gets-1643-excess-rain/articleshow/123533503.cms",
    },
    {
      id: "rudraprayag",
      city: "Rudraprayag",
      state: "Uttarakhand",
      lat: 30.29,
      lng: 78.98,
      news: "Cloudbursts and landslides caused destruction, casualties, and missing people. A bridge on Jyotirmath-Malari highway washed away.",
      source: "https://www.thehindu.com/news/national/india-rain-telangana-jammu-and-kashmir-himachal-pradesh-flood-uttarakhand-live-updates-on-august-29-2025/article69987762.ece",
    },
    {
      id: "jammu",
      city: "Jammu",
      state: "Jammu & Kashmir",
      lat: 32.73,
      lng: 74.85,
      news: "Incessant rains caused rivers to flow above alert levels. Landslide near Mata Vaishno Devi shrine claimed lives. 6,000+ people evacuated.",
      source: "https://www.thehindu.com/news/national/jammu-and-kashmir/rains-relentlessly-pound-jk-rescue-operation-underway-in-landslide-and-flash-flood-hit-areas/article69981948.ece",
    },
    {
      id: "srinagar",
      city: "Srinagar",
      state: "Jammu & Kashmir",
      lat: 34.08,
      lng: 74.83,
      news: "Severe rains and flash floods disrupted travel and caused evacuations. National Highway repeatedly closed due to landslides.",
      source: "https://apnews.com/article/pakistan-india-floods-punjab-seeks-army-help-7764601f6012c24c72f36d4088b56b39",
    },
  ];

  return (
    <Card className="h-96 bg-gradient-to-br from-blue-200 to-blue-400 border-0 rounded-2xl shadow-md relative overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-white/90 text-blue-900 border-0 rounded-full">
            Unified Command Map - Real-time Intelligence
          </Badge>
          <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">{credibilityHotspots.length} Hotspots</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className={`border-0 rounded-full ${
              mapMode === "reports" ? "bg-blue-900 text-white" : "bg-white/90 text-blue-900"
            }`}
            onClick={() => setMapMode("reports")}
          >
            Reports
          </Button>
          <Button
            size="sm"
            className={`border-0 rounded-full ${
              mapMode === "social" ? "bg-blue-900 text-white" : "bg-white/90 text-blue-900"
            }`}
            onClick={() => setMapMode("social")}
          >
            Social
          </Button>
          <Button
            size="sm"
            className={`border-0 rounded-full ${
              mapMode === "hotspots" ? "bg-blue-900 text-white" : "bg-white/90 text-blue-900"
            }`}
            onClick={() => setMapMode("hotspots")}
          >
            Hotspots
          </Button>
        </div>
      </div>

      {/* Google Map */}
      <div className="absolute inset-6 mt-16 rounded-xl overflow-hidden shadow">
        {isLoaded && (
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
            {/* Hotspots */}
            {mapMode === "hotspots" &&
              coastalHotspots.map((spot) => (
                <Marker
                  key={spot.id}
                  position={{ lat: spot.lat, lng: spot.lng }}
                  onClick={() => setActiveMarker(spot.id)}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                >
                  {activeMarker === spot.id && (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div className="p-2 max-w-xs">
                        <h4 className="font-bold text-red-600">⚠ Warning</h4>
                        <p className="text-sm">{spot.warning}</p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}

            {/* Reports (fake clustered markers near Mathura) */}
            {mapMode === "reports" &&
              Array.from({ length: 3 }).map((_, i) => (
                <Marker
                  key={i}
                  position={{
                    lat: 27.4924 + (Math.random() - 0.5) * 0.1,
                    lng: 77.6737 + (Math.random() - 0.5) * 0.1,
                  }}
                  onClick={() => setActiveMarker(`report-${i}`)}
                >
                  {activeMarker === `report-${i}` && (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div className="p-2 max-w-xs">
                        <h4 className="font-bold text-blue-700">📌 Disaster Report</h4>
                        <p className="text-sm">
                          {i === 0 && "Bridge collapse reported due to flooding."}
                          {i === 1 && "Fire outbreak near residential area in Mathura."}
                          {i === 2 && "Road blockage reported due to heavy rainfall."}
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}

            {/* Social Media / News Mode */}
            {mapMode === "social" &&
              hardcodedNews.map((newsItem) => (
                <Marker
                  key={newsItem.id}
                  position={{ lat: newsItem.lat, lng: newsItem.lng }}
                  onClick={() => setActiveMarker(newsItem.id)}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
                  }}
                >
                  {activeMarker === newsItem.id && (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div className="p-2 max-w-xs">
                        <h4 className="font-bold text-pink-600">
                          📰 {newsItem.city}, {newsItem.state}
                        </h4>
                        <p className="text-sm">{newsItem.news}</p>
                        <a
                          href={newsItem.source}
                          target="_blank"
                          className="text-blue-700 underline text-xs"
                        >
                          Read more
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Signal className="w-4 h-4" />
              <span className="text-sm">
                {credibilityHotspots.reduce((acc, h) => acc + h.reportCount, 0)} Active Reports
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">3 Response Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">
                {hardcodedNews.reduce((acc, t) => acc + (t.mentions || 0), 0)} Social Mentions
              </span>
            </div>
          </div>
          <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white border-0 rounded-full">
            <Monitor className="w-4 h-4 mr-1" />
            Full Screen
          </Button>
        </div>
      </div>
    </Card>
  );
};
