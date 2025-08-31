import React, { useState, useEffect ,useCallback,  useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Mic, Camera, Plus, MapPin, Bell, Radio, Wifi, WifiOff, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Satellite , Database , Layers } from 'lucide-react';
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 20.5937, lng: 78.9629 }; // Default India center

export function CitizenDashboard() {
  const userName = "Harshit Rajput";
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionSpeed, setConnectionSpeed] = useState('fast');
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

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate slow connection detection
    const checkConnection = () => {
      const connection = navigator.connection;
      if (connection) {
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          setConnectionSpeed('slow');
          toast.warning('⚠️ Slow internet detected', {
            description: 'Some features may be limited'
          });
        } else {
          setConnectionSpeed('fast');
        }
      }
    };

    checkConnection();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  const newsReels = [
    { id: 1, title: "Coral Restoration Success", location: "Great Barrier Reef", image: "🪸", time: "2h ago" },
    { id: 2, title: "New Marine Species Found", location: "Pacific Ocean", image: "🐠", time: "4h ago" },
    { id: 3, title: "Clean Ocean Initiative", location: "Mediterranean Sea", image: "🌊", time: "6h ago" },
    { id: 4, title: "Whale Migration Update", location: "Atlantic Ocean", image: "🐋", time: "8h ago" }
  ];

  const handleVoiceRecord = () => {
    if (!isOnline) {
      toast.info('📡 Send via Tower', {
        description: 'Voice alert will be sent when connection is restored',
        action: {
          label: "Send Now",
          onClick: () => toast.success("Voice alert queued for transmission")
        }
      });
    } else if (connectionSpeed === 'slow') {
      toast.info('📡 Send via Tower', {
        description: 'Use tower transmission for better reliability?',
        action: {
          label: "Use Tower",
          onClick: () => toast.success("Using tower transmission")
        }
      });
    } else {
      toast.success("Recording started");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between rounded-b-2xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
          </div>
          <span className="font-medium">MarineVoice</span>
        </div>
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <WifiOff className="w-4 h-4 text-red-300" />
          ) : connectionSpeed === 'slow' ? (
            <Wifi className="w-4 h-4 text-yellow-300" />
          ) : (
            <Wifi className="w-4 h-4 text-green-300" />
          )}
          <Button variant="ghost" size="sm" className="text-white p-1 h-auto">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Welcome Message */}
        <div className="py-2">
          <h1 className="text-xl text-gray-800">
            Welcome, <span className="bg-blue-200 px-2 py-1 rounded">{userName}</span>
          </h1>
        </div>

        {/* Main Map View */}
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

      </CardContent>
        {/* News Reels */}
        <div className="space-y-3">
          <h3 className="text-gray-800">Latest Updates</h3>
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {newsReels.map((reel) => (
                <Card
                  key={reel.id}
                  className="min-w-48 h-32 bg-white border border-gray-200 p-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">{reel.image}</div>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{reel.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{reel.location}</p>
                    <p className="text-xs text-gray-400">{reel.time}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Recent Reports */}
        <div className="space-y-3">
          <h3 className="text-gray-800">Recent Reports</h3>
          <div className="space-y-2">
            <Card className="p-3 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Water Quality Report</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </Card>
            <Card className="p-3 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Marine Life Sighting</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </Card>
            <Card className="p-3 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pollution Alert</p>
                  <p className="text-xs text-gray-400">3 days ago</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </Card>
          </div>
        </div>

        <div className="h-8"></div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <Button
          className="w-14 h-14 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={handleVoiceRecord}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-gray-600 hover:text-blue-900"
            onClick={handleVoiceRecord}
          >
            <Mic className="w-5 h-5" />
            <span className="text-xs">Voice</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-gray-600 hover:text-blue-900"
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Camera</span>
          </Button>

          <div className="w-12"></div>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-gray-600 hover:text-blue-900"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Reports</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 text-gray-600 hover:text-blue-900"
          >
            <Radio className="w-5 h-5" />
            <span className="text-xs">Tower</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
