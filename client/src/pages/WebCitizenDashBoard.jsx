
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  BarChart3, 
  Users, 
  Mic, 
  Camera, 
  Upload,
  Search,
  Globe,
  Smartphone,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  TrendingUp,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileImage,
  Activity,
  Fish,
  Waves,
  Thermometer,
  Zap,
  Play,
  Pause,
  Square,
  Download,
  Layers,
  Navigation,
  Wind,
  Video,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/seperator';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { GoogleMap, Marker ,  useJsApiLoader } from "@react-google-maps/api";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { Progress } from '../components/ui/progress';
import axios from 'axios';
import { backend_url } from '@/BackendUrl';
import { isSpamMessage } from "../utils/spamCheck";
// import transcribeAudio from '@/utils/audioEmergencycheck';


// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: 'dc2hx2zhw',
  uploadPreset: 'SIH2025',
  uploadUrl: 'https://api.cloudinary.com/v1_1/dc2hx2zhw/auto/upload'
};

// Utility function to upload to Cloudinary
const uploadToCloudinary = async (audioBlob, fileName) => {
  const formData = new FormData();
  formData.append('file', audioBlob, fileName);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);
  
  const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  
  return await response.json();
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 20.5937, lng: 78.9629 }; 

// Mock data
const initialReports = [
  {
    id: 1,
    title: 'Air Quality Report',
    type: 'Air Quality',
    location: 'Zone A',
    date: '2 hours ago',
    status: 'published',
    priority: 'high',
    icon: FileText,
    description: 'Detailed analysis of air pollution levels showing elevated particulate matter concentrations.',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    attachments: ['air_sample_1.jpg', 'analysis_report.pdf'],
    createdBy: 'Maria Santos',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Wildlife Conservation Area',
    type: 'Environmental',
    location: 'Park District North',
    date: '1 day ago',
    status: 'under-review',
    priority: 'medium',
    icon: Camera,
    description: 'New urban wildlife habitat established with native plant species.',
    coordinates: { lat: 34.0622, lng: -118.2537 },
    attachments: ['habitat_photos.jpg'],
    createdBy: 'Maria Santos',
    updatedAt: '2024-01-14T08:15:00Z'
  },
  {
    id: 3,
    title: 'Pollution Alert',
    type: 'Pollution',
    location: 'Harbor District',
    date: '4 days ago',
    status: 'published',
    priority: 'high',
    icon: Mic,
    description: 'Oil spill reported by local fishermen near the harbor entrance.',
    coordinates: { lat: 34.0422, lng: -118.2337 },
    attachments: ['oil_spill_voice_report.mp3'],
    createdBy: 'Maria Santos',
    updatedAt: '2024-01-11T14:45:00Z'
  },
  {
    id: 4,
    title: 'Beach Erosion Study',
    type: 'Environmental',
    location: 'South Beach',
    date: '1 week ago',
    status: 'draft',
    priority: 'low',
    icon: FileText,
    description: 'Monitoring coastal erosion patterns over the past 6 months.',
    coordinates: { lat: 34.0322, lng: -118.2237 },
    attachments: ['erosion_measurements.csv'],
    createdBy: 'Maria Santos',
    updatedAt: '2024-01-08T16:20:00Z'
  },
  {
    id: 5,
    title: 'Coral Bleaching Event',
    type: 'Marine Health',
    location: 'Reef Area 7',
    date: '2 weeks ago',
    status: 'published',
    priority: 'high',
    icon: Camera,
    description: 'Documentation of coral bleaching incidents affecting 30% of the reef.',
    coordinates: { lat: 34.0722, lng: -118.2637 },
    attachments: ['coral_bleaching_photos.zip'],
    createdBy: 'Maria Santos',
    updatedAt: '2024-01-01T12:00:00Z'
  }
];

const Sidebar = ({ activeItem, onNavigate, onQuickAction }) => {
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Map, label: "Map View", page: "map" },
    { icon: FileText, label: "My Reports", page: "reports" },
    { icon: BarChart3, label: "Analytics", page: "analytics" },
    { icon: Users, label: "Community", page: "community" },
  ];

  const quickActions = [
    { icon: Mic, label: "Voice Report", action: "voice" },
    { icon: Camera, label: "Photo Upload", action: "photo" },
    { icon: Upload, label: "File Upload", action: "file" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-foreground">MarineVoice</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="text-sm text-muted-foreground">Welcome, Maria Santos</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={activeItem === item.page ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeItem === item.page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-foreground hover:bg-accent"
              }`}
              onClick={() => onNavigate(item.page)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground mb-3">
            Quick Actions
          </div>
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant={onQuickAction === action.action  ? "default" : "bg-blue-700"}
              className={`w-full justify-start gap-3 ${
                onQuickAction === action.action 
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-foreground hover:bg-accent"
              }`}
              onClick={() => onQuickAction(action.action)}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};



const Header = ({ globalSearchQuery, onGlobalSearch, currentPage, activeQuickAction }) => {
  const getPageTitle = (page) => {
    if (activeQuickAction) {
      switch (activeQuickAction) {
        case "voice":
          return "Voice Recorder";
        case "photo":
          return "Photo Upload";
        case "file":
          return "File Upload";
        default:
          break;
      }
    }

    switch (page) {
      case "dashboard":
        return "Citizen Dashboard";
      case "map":
        return "Map View";
      case "reports":
        return "My Reports";
      case "analytics":
        return "Analytics Dashboard";
      case "community":
        return "Community";
      default:
        return "Citizen Dashboard";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-foreground">
          {getPageTitle(currentPage)}
        </h2>
        <span className="text-sm text-blue-600">Zone A</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports, locations, etc..."
            value={globalSearchQuery}
            onChange={(e) => onGlobalSearch(e.target.value)}
            className="pl-10 w-64"
          />
        </div>

        {/* Platform badges */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
            <Globe className="h-3 w-3 mr-1" />
            Web
          </Badge>
          <Badge variant="outline">
            <Smartphone className="h-3 w-3 mr-1" />
            Mobile
          </Badge>
        </div>
      </div>
    </header>
  );
};


const Dashboard = ({ reports, onViewReport }) => {
  const [previewReport, setPreviewReport] = useState(null);
  const [voiceAlerts, setVoiceAlerts] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ , setUpload] = useState([]);
  // const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  const recentReports = reports.slice(0, 3);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API, // ensure key is in .env
    version: "weekly", // required for AdvancedMarkerElement
    libraries: ["marker"], // load advanced marker library
  });

  // Fetch voice alerts and uploads from backend
  useEffect(() => {
    const fetchUserData = async () => {
              try {
          setLoading(true);

          const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
          
          if (!user?.id) {
            console.log('No user found in localStorage, skipping API calls');
            setLoading(false);
            return;
          }
          
          console.log('Fetching data for user:', user.id);
          
          // Fetch voice alerts - using GET to retrieve existing data
          const voiceResponse = await fetch(`${backend_url}/api/citizen/voice-alert?userId=${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Fetch uploads - using GET to retrieve existing data
          const uploadsResponse = await fetch(`${backend_url}/api/citizen/get-upload?userId=${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        if (voiceResponse.ok) {
          const voiceData = await voiceResponse.json();
          console.log('Voice alerts from backend:', voiceData);
          setVoiceAlerts(voiceData);
        } else {
          console.error('Failed to fetch voice alerts:', voiceResponse.status, voiceResponse.statusText);
        }

        if (uploadsResponse.ok) {
          const uploadsData = await uploadsResponse.json();
          console.log('Uploads from backend:', uploadsData);
          setUploads(uploadsData);
        } else {
          console.error('Failed to fetch uploads:', uploadsResponse.status, uploadsResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

    useEffect(() => {
      const fetchUpload = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/citizen/uploads");
          const data = await res.json();
          console.log(data);
          if (data.success) {
            setUpload(data.data);
          }
        } catch (err) {
          console.error("Error fetching uploads:", err);
        }
      };
      fetchUpload();
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

  const handleReportClick = (report) => {
    setPreviewReport(report);
  };

  const closePreview = () => {
    setPreviewReport(null);
  };

  const environmentalUpdates = [
    {
      id: 1,
      title: "Air Quality Improvement",
      description: "City reports 30% reduction in pollution levels this quarter",
      location: "Downtown District",
      time: "2h ago",
      icon: "🌬️",
      color: "bg-green-50",
    },
    {
      id: 2,
      title: "Urban Green Initiative",
      description: "New park opens with sustainable energy systems",
      location: "Central Park Area",
      time: "4h ago",
      icon: "🌳",
      color: "bg-green-50",
    },
    {
      id: 3,
      title: "Recycling Program Success",
      description: "Community exceeds waste reduction targets by 45%",
      location: "Various Locations",
      time: "6h ago",
      icon: "♻️",
      color: "bg-blue-50",
    },
    {
      id: 4,
      title: "Noise Pollution Reduced",
      description: "Traffic management improvements show positive results",
      location: "Highway Corridor",
      time: "8h ago",
      icon: "🔇",
      color: "bg-purple-50",
    },
  ];

  const contributionStats = [
    { label: "Reports Submitted", value: "47", color: "text-blue-600" },
    { label: "Photos Uploaded", value: "123", color: "text-green-600" },
    { label: "Voice Records", value: "89", color: "text-purple-600" },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6">
          {/* Live Map View */}
          <Card className="bg-white h-140">
          <CardContent className="p-0">
            <div className="relative h-90 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl mx-6 mb-4 overflow-hidden">
              {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                  <Marker position={center} />
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
          </Card>

          {/* Latest Environmental Updates */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Latest Environmental Updates</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600"
                onClick={() => toast.info("Viewing all environmental updates...")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {environmentalUpdates.map((update) => (
                  <div
                    key={update.id}
                    className={`p-4 rounded-lg ${update.color} hover:shadow-sm transition-shadow cursor-pointer`}
                    onClick={() =>
                      toast.info(`${update.title}: ${update.description}`)
                    }
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{update.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1">{update.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {update.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{update.location}</span>
                          <span>{update.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Reports */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Recent Reports</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleReportClick(report)}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      report.status === "published"
                        ? "bg-green-500"
                        : report.status === "under-review"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{report.title}</h4>
                    <p className="text-xs text-muted-foreground">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                  {/* Show preview icon if report has Cloudinary content */}
                  {(report.cloudinaryUrls || report.audioData || report.cloudinaryPublicId) && (
                    <div className="flex items-center gap-1">
                      {report.type === 'Voice Report' && report.audioData && (
                        <Mic className="h-3 w-3 text-purple-600" />
                      )}
                      {report.type === 'Wildlife' && report.cloudinaryUrls && (
                        <Camera className="h-3 w-3 text-green-600" />
                      )}
                      {report.type === 'Research' && report.cloudinaryUrls && (
                        <Video className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Your Contributions */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Contributions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contributionStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Voice Alerts from Backend */}
          {loading && (
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-muted-foreground">Loading your data...</span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!loading && !localStorage.getItem('user') && (
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-muted-foreground">
                  <p className="text-sm mb-2">Please log in to view your data</p>
                  <p className="text-xs">Login to see your voice alerts and media uploads</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && localStorage.getItem('user') && voiceAlerts.length === 0 && uploads.length === 0 && (
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-muted-foreground">
                  <p className="text-sm mb-2">No voice alerts or uploads yet</p>
                  <p className="text-xs">Start contributing by recording voice alerts or uploading media</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!loading && voiceAlerts.length > 0 && (
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Voice Alerts from Backend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {voiceAlerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert._id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleReportClick({
                      id: alert._id,
                      title: `Voice Alert - ${new Date(alert.createdAt).toLocaleDateString()}`,
                      type: 'Voice Report',
                      location: alert.location ? `Lat: ${alert.location.lat}, Lng: ${alert.location.lng}` : 'Location not available',
                      date: new Date(alert.createdAt).toLocaleDateString(),
                      status: 'published',
                      priority: 'medium',
                      description: alert.transcript || 'Voice recording captured',
                      audioData: alert.audioUrl,
                      createdAt: alert.createdAt,
                      updatedAt: alert.updatedAt,
                      coordinates: alert.location ? { lat: alert.location.lat, lng: alert.location.lng } : null,
                      locationData: alert.location
                    })}
                  >
                    <div className="w-2 h-2 rounded-full mt-2 bg-purple-500"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        Voice Alert - {new Date(alert.createdAt).toLocaleDateString()}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {alert.location ? `Lat: ${alert.location.lat?.toFixed(4)}, Lng: ${alert.location.lng?.toFixed(4)}` : 'Location not available'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Mic className="h-3 w-3 text-purple-600" />
                  </div>
                ))}
                {voiceAlerts.length > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      +{voiceAlerts.length - 3} more voice alerts
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Uploads from Backend */}
          {!loading && uploads.length > 0 && (
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Media Uploads from Backend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploads.slice(0, 3).map((upload) => (
                  <div
                    key={upload._id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleReportClick({
                      id: upload._id,
                      title: `${upload.type === 'image' ? 'Photo' : 'Video'} Upload - ${new Date(upload.createdAt).toLocaleDateString()}`,
                      type: upload.type === 'image' ? 'Wildlife' : 'Research',
                      location: upload.location ? `Lat: ${upload.location.lat}, Lng: ${upload.location.lng}` : 'Location not available',
                      date: new Date(upload.createdAt).toLocaleDateString(),
                      status: 'published',
                      priority: 'medium',
                      description: `${upload.type === 'image' ? 'Photo' : 'Video'} documentation uploaded`,
                      cloudinaryUrls: [upload.url],
                      createdAt: upload.createdAt,
                      updatedAt: upload.updatedAt,
                      coordinates: upload.location ? { lat: upload.location.lat, lng: upload.location.lng } : null,
                      locationData: upload.location
                    })}
                  >
                    <div className="w-2 h-2 rounded-full mt-2 bg-green-500"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {upload.type === 'image' ? 'Photo' : 'Video'} Upload - {new Date(upload.createdAt).toLocaleDateString()}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {upload.location ? `Lat: ${upload.location.lat?.toFixed(4)}, Lng: ${upload.location.lng?.toFixed(4)}` : 'Location not available'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(upload.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {upload.type === 'image' ? (
                      <Camera className="h-3 w-3 text-green-600" />
                    ) : (
                      <Video className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                ))}
                {uploads.length > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      +{uploads.length - 3} more uploads
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewReport && (
        <Dialog open={!!previewReport} onOpenChange={closePreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {previewReport.type === 'Voice Report' && <Mic className="h-5 w-5 text-purple-600" />}
                {previewReport.type === 'Wildlife' && <Camera className="h-5 w-5 text-green-600" />}
                {previewReport.type === 'Research' && <Video className="h-5 w-5 text-blue-600" />}
                {previewReport.title}
              </DialogTitle>
              <DialogDescription>
                {previewReport.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Report Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Location:</span> {previewReport.location}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {previewReport.createdAt ? new Date(previewReport.createdAt).toLocaleDateString() : previewReport.date}
                </div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <Badge className={`ml-2 ${
                    previewReport.status === 'published' ? 'bg-green-100 text-green-800' : 
                    previewReport.status === 'under-review' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {previewReport.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Priority:</span> 
                  <Badge className={`ml-2 ${
                    previewReport.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    previewReport.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {previewReport.priority}
                  </Badge>
                </div>
              </div>

              {/* Cloudinary Content Preview */}
              {previewReport.audioData && previewReport.type === 'Voice Report' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Voice Recording</span>
                  </div>
                  <audio controls className="w-full" src={previewReport.audioData}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {previewReport.cloudinaryUrls && previewReport.type === 'Wildlife' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Photos ({previewReport.cloudinaryUrls.length})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {previewReport.cloudinaryUrls.slice(0, 3).map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded border cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => window.open(url, '_blank')}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-20 bg-gray-100 rounded border flex items-center justify-center text-gray-500 text-sm hidden"
                          style={{ display: 'none' }}
                        >
                          <Camera className="h-6 w-6" />
                        </div>
                      </div>
                    ))}
                    {previewReport.cloudinaryUrls.length > 3 && (
                      <div className="w-full h-20 bg-gray-100 rounded border flex items-center justify-center text-gray-500 text-sm">
                        +{previewReport.cloudinaryUrls.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {previewReport.cloudinaryUrls && previewReport.type === 'Research' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Videos ({previewReport.cloudinaryUrls.length})</span>
                  </div>
                  <div className="space-y-2">
                    {previewReport.cloudinaryUrls.slice(0, 2).map((url, index) => (
                      <video
                        key={index}
                        controls
                        className="w-full h-32 object-cover rounded border"
                        src={url}
                      >
                        Your browser does not support the video element.
                      </video>
                    ))}
                    {previewReport.cloudinaryUrls.length > 2 && (
                      <p className="text-sm text-muted-foreground text-center">
                        +{previewReport.cloudinaryUrls.length - 2} more videos available in full view
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => {
                  onViewReport(previewReport);
                  closePreview();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
              <Button variant="outline" onClick={closePreview} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const MapView = ({ reports, onAddReport }) => {
  const [mapMode, setMapMode] = useState("satellite");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [currentLocation, setCurrentLocation] = useState(null);


  const mapLayers = [
    { id: "satellite", label: "Satellite", icon: Globe },
    { id: "terrain", label: "Terrain", icon: Layers },
    { id: "marine", label: "Marine", icon: Waves },
  ];

  const filteredReports = reports.filter(
    (report) => filterType === "all" || report.type === filterType
  );

  const handleLocationClick = (location) => {
    setSelectedLocation(selectedLocation === location ? null : location);
  };

  useEffect(() => {
  if (navigator.geolocation && window.google) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geocoder = new window.google.maps.Geocoder();

        // reverse geocode to get address
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === "OK" && results[0]) {
              setCurrentLocation(results[0].formatted_address);
            } else {
              setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          }
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCurrentLocation("Location unavailable");
      }
    );
  }
}, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Interactive Map
            </h1>
            <p className="text-muted-foreground">
              Explore environmental reports across monitoring zones
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              onClick={onAddReport}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-white mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Label>Report Type:</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Water Quality">Water Quality</SelectItem>
                    <SelectItem value="Wildlife">Wildlife</SelectItem>
                    <SelectItem value="Pollution">Pollution</SelectItem>
                    <SelectItem value="Marine Health">Marine Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Map Area */}
        <div className="xl:col-span-3">
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
                    <layer.icon className="h-4 w-4 mr-2" />
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
              <div className="relative h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-lg overflow-hidden">
                {/* Dynamic background based on map mode */}
                <div
                  className={`absolute inset-0 ${
                    mapMode === "satellite"
                      ? "bg-gradient-to-br from-green-200 to-blue-400"
                      : mapMode === "terrain"
                      ? "bg-gradient-to-br from-yellow-200 to-green-400"
                      : "bg-gradient-to-br from-blue-200 to-cyan-400"
                  } opacity-80`}
                ></div>

                {/* Report Markers */}
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: 28.61, lng: 77.20 }} // Default center (Delhi)
                    zoom={12}
                    mapTypeId={mapMode === "satellite" ? "satellite" : mapMode === "terrain" ? "terrain" : "roadmap"}
                  >
                    {filteredReports.map((report) => (
                      <Marker
                        key={report.id}
                        position={report.location} // {lat, lng}
                        icon={{
                          url:
                            report.priority === "high"
                              ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                              : report.priority === "medium"
                              ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                              : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        }}
                        onClick={() => setSelectedLocation(report.location.name)}
                      />
                    ))}

                    {selectedLocation && (
                      <InfoWindow
                        position={reports.find((r) => r.location.name === selectedLocation)?.location}
                        onCloseClick={() => setSelectedLocation(null)}
                      >
                        <div>
                          <h4>{selectedLocation}</h4>
                          {reports
                            .filter((r) => r.location.name === selectedLocation)
                            .slice(0, 3)
                            .map((report) => (
                              <div key={report.id}>
                                <strong>{report.title}</strong>
                                <p>{report.priority}</p>
                              </div>
                            ))}
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                {/* Location Info Panel */}
                  {selectedLocation && (
                    <InfoWindow
                      position={reports.find((r) => r.location.name === selectedLocation)?.location}
                      onCloseClick={() => setSelectedLocation(null)}
                    >
                      <div className="max-w-xs">
                        <h4 className="font-medium mb-2">{selectedLocation}</h4>
                        <div className="space-y-1 text-sm">
                          {reports
                            .filter((r) => r.location.name === selectedLocation)
                            .slice(0, 3)
                            .map((report) => (
                              <div key={report.id} className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    report.priority === "high"
                                      ? "bg-red-500"
                                      : report.priority === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                />
                                <span className="truncate">{report.title}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </InfoWindow>
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

          {/* Map Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold">{filteredReports.length}</p>
                <p className="text-sm text-muted-foreground">Active Reports</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold">
                  {filteredReports.filter((r) => r.priority === "high").length}
                </p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold">
                  {Array.from(new Set(reports.map((r) => r.location))).length}
                </p>
                <p className="text-sm text-muted-foreground">Monitored Zones</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Location Summary */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base">Location Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from(new Set(reports.map((r) => r.location))).map(
                (location) => {
                  const locationReports = reports.filter(
                    (r) => r.location === location
                  );
                  return (
                    <div
                      key={location}
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{location}</h4>
                        <Badge variant="outline">{locationReports.length}</Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          High:{" "}
                          {locationReports.filter((r) => r.priority === "high")
                            .length}
                        </span>
                        <span>
                          Med:{" "}
                          {locationReports.filter((r) => r.priority === "medium")
                            .length}
                        </span>
                        <span>
                          Low:{" "}
                          {locationReports.filter((r) => r.priority === "low")
                            .length}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.slice(0, 4).map((report) => (
                <div key={report.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      report.status === "published"
                        ? "bg-green-500"
                        : report.status === "under-review"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Analytics Component
const Analytics = ({ reports }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("30");

  const analytics = {
    totalReports: 358,
    avgAirQuality: 83.2,
    pollutionIncidents: 61,
    activeContributors: 127,
  };

  // const monthlyData = [
  //   { month: "Jan", reports: 45 },
  //   { month: "Feb", reports: 52 },
  //   { month: "Mar", reports: 38 },
  //   { month: "Apr", reports: 61 },
  //   { month: "May", reports: 73 },
  //   { month: "Jun", reports: 89 },
  // ];

  // const reportTypes = [
  //   { type: "Air Quality", percentage: 35, color: "bg-blue-500" },
  //   { type: "Environmental", percentage: 26, color: "bg-green-500" },
  //   { type: "Pollution", percentage: 22, color: "bg-red-500" },
  //   { type: "Conservation", percentage: 15, color: "bg-orange-500" },
  //   { type: "Other", percentage: 2, color: "bg-gray-400" },
  // ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "air-quality", label: "Air Quality" },
    { id: "environment", label: "Environment" },
    { id: "contributors", label: "Contributors" },
  ];



  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Environmental Monitoring Data Insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const csvData = reports
                  .map((r) => `${r.title},${r.type},${r.location},${r.date},${r.status}`)
                  .join("\n");
                const blob = new Blob([`Title,Type,Location,Date,Status\n${csvData}`], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "environmental_data.csv";
                a.click();
                toast.success("Data exported successfully!");
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
                <SelectItem value="365">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
              onClick={() => {
                const reportData = {
                  period: selectedTimePeriod,
                  totalReports: analytics.totalReports,
                  airQuality: analytics.avgAirQuality,
                  pollutionIncidents: analytics.pollutionIncidents,
                  contributors: analytics.activeContributors,
                  generatedAt: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `environmental_report_${selectedTimePeriod}days.json`;
                a.click();
                toast.success("Report generated successfully!");
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Reports */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
                <p className="text-2xl font-semibold text-foreground">{analytics.totalReports}</p>
                <p className="text-sm text-green-600">↗ +12.5% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Air Quality */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Air Quality</p>
                <p className="text-2xl font-semibold text-foreground">{analytics.avgAirQuality}%</p>
                <p className="text-sm text-green-600">↗ +2.1% improvement</p>
              </div>
              <Wind className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Pollution Incidents */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pollution Incidents</p>
                <p className="text-2xl font-semibold text-foreground">{analytics.pollutionIncidents}</p>
                <p className="text-sm text-red-600">↘ -8.3% from last month</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        {/* Active Contributors */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Contributors</p>
                <p className="text-2xl font-semibold text-foreground">{analytics.activeContributors}</p>
                <p className="text-sm text-green-600">↗ +18.2% new users</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts and Tab Content */}
      {/* (Keep your existing charts & tab panels code from TSX — unchanged, since JSX only removes type annotations) */}
    </div>
  );
};

// Community Component
const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postType, setPostType] = useState("discussion");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState(null);
  const [stats, setStats] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user from localStorage - replace this with your actual auth logic
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    fetchPosts();
    fetchStats();
    if (user?.id) {
      fetchUserRank();
      fetchUserActivity();
    }
    getCurrentLocation();
  }, []);

  

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback location for demo
          setLocation({
            latitude: 40.7128,
            longitude: -74.0060
          });
        }
      );
    }
  };

  const fetchPosts = async () => {
    try {
      const searchParam = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(`${backend_url}/api/community${searchParam}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${backend_url}/api/community/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUserRank = async () => {
    try {
      const res = await fetch(`${backend_url}/api/community/rank/${user.id}`);
      const data = await res.json();
      console.log("user rank", data);
      setUserRank(data);
    } catch (error) {
      console.error("Error fetching user rank:", error);
    }
  };

  const fetchUserActivity = async () => {
    try {
      const res = await fetch(`${backend_url}/api/community/activity/${user.id}`);
      const data = await res.json();
      setRecentActivity(data);
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
  };

  const handlePostSubmit = async () => {
    if (!newPost.trim() || !postTitle.trim() || !location || !user?.id) {
      alert("Please fill all fields and ensure you're logged in");
      return;
    }

    setIsSubmitting(true); // Disable button and show loading state

    try {
      // 1. Repeated Message Spam Check
      if(isSpamMessage(user.id, newPost)){
        console.log("🚨 Spam detected: repeated message");
        toast.error("🚨 Spam detected: repeated message");
        setIsSubmitting(false);
        return;
      }
      const validationResponse = await fetch(`${backend_url}/api/gemini/validate-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newPost }), // We send the post content for analysis
      });


      const validationResult = await validationResponse.json();

      if (!validationResponse.ok) {
        // Handle server errors during validation
        setIsSubmitting(false);
        throw new Error(validationResult.error || 'Validation request failed.');
      }
      
      console.log("Gemini Decision:", validationResult);

      // --- Check Gemini's decision ---
      if (validationResult.decision === 'Irrelevant') {
        alert(`❌ Post Blocked. \nReason: ${validationResult.reason}`);
        setIsSubmitting(false);
        return; // Stop the submission
      }

      const response = await fetch(`${backend_url}/api/community`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: user.id,
          title: postTitle,
          content: newPost,
          postType,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            address: `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
          }
        }),
      });

      if (response.ok) {
        setNewPost("");
        setPostTitle("");
        fetchPosts();
        fetchStats();
        fetchUserRank();
        fetchUserActivity();
        alert("Post shared successfully!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post");
    } finally{
      setIsSubmitting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user?.id) {
      alert("Please log in to like posts");
      return;
    }

    try {
      const response = await fetch(`${backend_url}/api/community/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });
      
      if (response.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId) => {
    const comment = commentInputs[postId];
    if (!comment?.trim() || !user?.id) {
      alert("Please enter a comment and ensure you're logged in");
      return;
    }

    try {
      const response = await fetch(`${backend_url}/api/community/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: user.id,
          content: comment
        }),
      });
      
      if (response.ok) {
        setCommentInputs({...commentInputs, [postId]: ""});
        fetchPosts();
        fetchUserActivity();
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleShare = async (postId) => {
    try {
      await fetch(`${backend_url}/api/community/${postId}/share`, {
        method: "POST",
      });
      fetchPosts();
    } catch (err) {
      console.error("Error sharing post:", err);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getRankColor = (rank) => {
    if (rank?.includes('Platinum')) return 'from-gray-400 to-gray-600';
    if (rank?.includes('Gold')) return 'from-yellow-400 to-yellow-600';
    if (rank?.includes('Silver')) return 'from-gray-300 to-gray-500';
    return 'from-orange-400 to-orange-600';
  };

  const getRankEmoji = (rank) => {
    if (rank?.includes('Platinum')) return '💎';
    if (rank?.includes('Gold')) return '🏆';
    if (rank?.includes('Silver')) return '🥈';
    return '🥉';
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Main Content - Left Side */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Community</h1>
                {location && (
                  <p className="text-gray-600">
                    📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search posts, locations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Post Creation */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.[0] || "U"}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Post title..."
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Share your environmental observations..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPostType("discussion")}
                          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                            postType === "discussion" 
                              ? "bg-blue-600 text-white border-blue-600" 
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Discussion (+2 pts)
                        </button>
                        <button
                          onClick={() => setPostType("sighting")}
                          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                            postType === "sighting" 
                              ? "bg-green-600 text-white border-green-600" 
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          📍 Sighting (+3 pts)
                        </button>
                        <button
                          onClick={() => setPostType("event")}
                          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                            postType === "event" 
                              ? "bg-purple-600 text-white border-purple-600" 
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          🗓️ Event (+3 pts)
                        </button>
                      </div>
                      <button
  onClick={handlePostSubmit}
  disabled={
    isSubmitting || !newPost.trim() || !postTitle.trim() || !location || !user?.id
  }
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm rounded-md transition-colors flex items-center justify-center"
>
  {isSubmitting ? (
    <span className="flex items-center gap-2">
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Submitting...
    </span>
  ) : (
    "Share"
  )}
</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts List */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm ? "No posts found matching your search." : "No posts yet. Be the first to share!"}
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-sm border">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {post.author?.name?.[0] || "U"}
                          </div>
                          <div className="flex-1">
                            {/* Post Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{post.author?.name || "Anonymous"}</span>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                  {formatTimeAgo(post.createdAt)}
                                </span>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                  📍 {post.location?.address || "Location unavailable"}
                                </span>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  post.postType === "sighting"
                                    ? "bg-green-100 text-green-800"
                                    : post.postType === "event"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {post.postType}
                              </span>
                            </div>

                            {/* Post Content */}
                            <h3 className="font-medium mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-3">{post.content}</p>
                            
                            {/* Interaction Buttons */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <button
                                onClick={() => handleLike(post._id)}
                                className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                                  post.likes?.includes(user?.id) ? 'text-red-600' : ''
                                }`}
                              >
                                <Heart className="w-4 h-4" />
                                {post.likes?.length || 0}
                              </button>
                              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments?.length || 0}
                              </button>
                              <button
                                onClick={() => handleShare(post._id)}
                                className="flex items-center gap-1 hover:text-green-600 transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                                {post.shares || 0}
                              </button>
                            </div>

                            {/* Comment Input */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentInputs[post._id] || ""}
                                onChange={(e) => setCommentInputs({
                                  ...commentInputs,
                                  [post._id]: e.target.value
                                })}
                                className="flex-1 px-3 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleComment(post._id)}
                                disabled={!commentInputs[post._id]?.trim() || !user?.id}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Comment
                              </button>
                            </div>

                            {/* Comments Display */}
                            {post.comments && post.comments.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {post.comments.map((comment, index) => (
                                  <div key={index} className="bg-gray-50 rounded-md p-2">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium">
                                        {comment.author?.name || "Anonymous"}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatTimeAgo(comment.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Community Stats */}
            {stats && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 pb-3 border-b">
                  <h3 className="text-base font-medium">Community Stats</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Active Members</p>
                        <p className="text-2xl font-semibold">{stats.activeMembers}</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Posts This Week</p>
                        <p className="text-2xl font-semibold">{stats.postsThisWeek}</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">+23%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Top Contributors</p>
                        <p className="text-2xl font-semibold">{stats.topContributors}</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">Gold Contributors</span>
                  </div>
                </div>
              </div>
            )}

            {/* Your Rank */}
            {userRank && user && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 pb-3 border-b">
                  <h3 className="text-base font-medium">Your Rank</h3>
                </div>
                <div className="p-4">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getRankColor(userRank.rank)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-white text-xl">{getRankEmoji(userRank.rank)}</span>
                    </div>
                    <span className={`inline-block bg-gradient-to-r ${getRankColor(userRank.rank)} text-white px-3 py-1 rounded-full text-sm mb-2`}>
                      {userRank.rank}
                    </span>
                    <p className="text-lg font-semibold">{userRank.points} Points</p>
                    <p className="text-sm text-gray-500">{userRank.postsCount} Posts Submitted</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {user && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 pb-3 border-b">
                  <h3 className="text-base font-medium">Your Recent Activity</h3>
                </div>
                <div className="p-4 space-y-3">
                  {recentActivity.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">No recent activity</p>
                  ) : (
                    recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}{" "}
                            <span className="font-medium text-gray-900">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500">{formatTimeAgo(activity.time)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Login Prompt for Non-logged Users */}
            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Join the Community</h3>
                <p className="text-xs text-yellow-600 mb-3">Log in to post, like, and comment on community updates.</p>
                <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700">
                  Log In
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};



// Voice Recorder Component
const VoiceRecorder = ({ 
  isRecording, 
  recordingTime, 
  onStartRecording, 
  onStopRecording, 
  onSaveRecording, 
  onCancel,
  recordedAudio,
  isPlaying,
  onPlayRecording,
  onPauseRecording
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-md mx-auto">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Recorder
            </CardTitle>
            <p className="text-muted-foreground">Record your environmental observation</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recording Visualization */}
            <div className="flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all ${
                  isRecording
                    ? 'border-red-500 bg-red-50 animate-pulse'
                    : isPlaying
                    ? 'border-green-500 bg-green-50 animate-pulse'
                    : 'border-blue-500 bg-blue-50'
                }`}
              >
                <Mic
                  className={`h-12 w-12 ${
                    isRecording ? 'text-red-500' : isPlaying ? 'text-green-500' : 'text-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Recording Time */}
            <div className="text-center">
              <div className="text-3xl font-mono font-semibold">
                {formatTime(recordingTime)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {isRecording ? 'Recording in progress...' : isPlaying ? 'Playing recording...' : 'Ready to record'}
              </p>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center gap-3">
              {!isRecording ? (
                <Button
                  onClick={onStartRecording}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={onStopRecording} variant="outline" size="lg">
                  <Square className="h-5 w-5 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>

            {/* Playback Controls */}
            {recordingTime > 0 && !isRecording && recordedAudio && (
              <div className="space-y-3">
                <div className="text-center">
                  <h4 className="font-medium mb-2">Listen to your recording</h4>
                  <div className="flex justify-center gap-2">
                    {!isPlaying ? (
                      <Button
                        onClick={onPlayRecording}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Play Recording
                      </Button>
                    ) : (
                      <Button
                        onClick={onPauseRecording}
                        variant="outline"
                        size="sm"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {recordingTime > 0 && !isRecording && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={onSaveRecording}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Recording
                </Button>
                <Button onClick={onCancel} variant="outline" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}

            {/* Instructions */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Click "Start Recording" to begin capturing your voice report.</p>
              <p className="mt-1">Describe what you observed in detail.</p>
              {recordingTime > 0 && !isRecording && (
                <p className="mt-1 text-green-600">You can now listen to your recording before saving.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


// Photo Upload Component

const PhotoUpload = ({ 
  selectedFiles, 
  uploadProgress, 
  onFileSelect, 
  onUpload, 
  onCancel,
  onRequestLocation
}) => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ , setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    onFileSelect(files);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be loaded before allowing capture
        videoRef.current.onloadedmetadata = () => {
          console.log('Video loaded and ready');
          setIsVideoReady(true);
        };
        videoRef.current.onplay = () => {
          console.log('Video started playing');
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
      setIsVideoReady(false);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) {
      toast.error('Camera not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Check if video is ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast.error('Camera not ready yet. Please wait a moment.');
      return;
    }

    try {
      // Request location permission first
      await onRequestLocation();
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
          onFileSelect([file]); // Replace existing files with new capture
          toast.success('Photo captured successfully with location!');
        } else {
          toast.error('Failed to capture photo');
        }
      }, 'image/jpeg', 0.8);
    } catch (error) {
      console.error('Error capturing photo:', error);
      if (error.message.includes('Location')) {
        toast.error('Location permission required to capture photo.');
      } else {
        toast.error('Failed to capture photo');
      }
    }
  };

  // Start camera on mount and cleanup on unmount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Camera className="h-5 w-5" />
              Photo Upload
            </CardTitle>
            <p className="text-muted-foreground">
              Upload photos of your environmental observation
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Camera Interface */}
            <div className="space-y-4">
              {/* Camera Preview */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                {!isVideoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Initializing camera...</p>
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                  style={{ transform: 'scaleX(-1)' }} // Mirror the video for better UX
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Camera Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <Button
                    onClick={handleCapture}
                    disabled={!isVideoReady}
                    className={`rounded-full w-12 h-12 p-0 ${
                      isVideoReady 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Camera className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-full w-12 h-12 p-0"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isVideoReady 
                    ? "Position your camera and click the capture button to take a photo"
                    : "Camera is loading... Please wait a moment"
                  }
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">or</p>
              </div>
              
              <div
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h4 className="text-md font-medium mb-1">Upload from Gallery</h4>
                <p className="text-sm text-muted-foreground">
                  Select photos from your device
                </p>
              </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  Selected Files ({selectedFiles.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <FileImage className="h-4 w-4 text-blue-600" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={onUpload}
                disabled={
                  selectedFiles.length === 0 ||
                  (uploadProgress > 0 && uploadProgress < 100)
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadProgress === 100 ? "Upload Complete" : "Upload Photos"}
              </Button>
              <Button onClick={onCancel} variant="outline" className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


// Video Upload Component

const FileUpload = ({ selectedFiles, onFileSelect, onUpload, onCancel, onRequestLocation }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [ , setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const [ , setRecordedChunks] = useState([]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: true
      });
      
      setStream(mediaStream);
      setIsCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsVideoReady(true);
        };
        videoRef.current.onplay = () => {
          console.log('Video started playing');
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setIsVideoReady(false);
  };

  const startRecording = async () => {
    if (!stream) return;
    
    try {
      // Request location permission first
      await onRequestLocation();
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      
      let chunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `recorded-video-${Date.now()}.webm`, { type: 'video/webm' });
        onFileSelect([file]);
        toast.success('Video recorded successfully with location!');
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started with location captured...');
    } catch (error) {
      console.error('Error starting recording:', error);
      if (error.message.includes('Location')) {
        toast.error('Location permission required to start recording.');
      } else {
        toast.error('Failed to start recording');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    // Filter to only include video files
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    onFileSelect(videoFiles);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Video className="h-5 w-5" />
              Video Upload
            </CardTitle>
            <p className="text-muted-foreground">
              Record or upload video recordings of environmental observations
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Preview */}
            <div className="space-y-4">
              <Label>Camera Preview</Label>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover rounded-lg border"
                  style={{ transform: 'scaleX(-1)' }}
                />
                {!isVideoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="flex items-center gap-2 text-white">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Camera is loading...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Recording Controls */}
              <div className="flex gap-3 justify-center">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    disabled={!isVideoReady}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                {!isVideoReady 
                  ? "Camera is loading... Please wait a moment" 
                  : isRecording 
                    ? "Recording in progress... Click stop when finished"
                    : "Position your camera and click start recording to capture video"
                }
              </p>
            </div>

            <Separator />

            {/* Video Input */}
            <div>
              <Label htmlFor="videoInput">Upload from Gallery</Label>
              <input
                id="videoInput"
                type="file"
                multiple
                accept="video/*"
                onChange={handleFileSelect}
                className="w-full p-3 border border-border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: MP4, MOV, AVI, WebM, and other video formats
              </p>
            </div>

            {/* Selected Videos */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  Selected Videos ({selectedFiles.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFiles = selectedFiles.filter(
                            (_, i) => i !== index
                          );
                          onFileSelect(newFiles);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={onUpload}
                disabled={selectedFiles.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Videos
              </Button>
              <Button onClick={onCancel} variant="outline" className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>

            {/* Instructions */}
            <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium mb-1">Video Upload Guidelines:</h5>
              <ul className="space-y-1 text-xs">
                <li>• Maximum file size: 100MB per video</li>
                <li>• Multiple videos can be selected</li>
                <li>• Ensure videos contain relevant environmental observations</li>
                <li>• Include descriptive file names</li>
                <li>• Supported formats: MP4, MOV, AVI, WebM</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};



// Report Form Component
const ReportForm = ({ report, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState(report || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.type || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {isEditing ? "Edit Report" : "Create New Report"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your environmental report"
              : "Document your environmental observation or incident"}
          </p>
        </div>

        <Card className="bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter report title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Air Quality">Air Quality</SelectItem>
                      <SelectItem value="Water Quality">Water Quality</SelectItem>
                      <SelectItem value="Wildlife">Wildlife</SelectItem>
                      <SelectItem value="Pollution">Pollution</SelectItem>
                      <SelectItem value="Environmental">Environmental</SelectItem>
                      <SelectItem value="Marine Health">Marine Health</SelectItem>
                      <SelectItem value="Enforcement">Enforcement</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Enter location"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority || "medium"}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Provide detailed description of your observation or incident"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || "draft"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update Report" : "Save Report"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// MyReports Component
const MyReports = ({
  reports,
  searchQuery,
  onSearchChange,
  onNewReport,
  onViewReport,
  onEditReport,
  onDeleteReport,
}) => {
  const [filterStatus, setFilterStatus] = useState("all");

  const stats = [
    {
      title: "Reports Submitted",
      value: reports.length.toString(),
      icon: FileText,
      trend: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Photos Uploaded",
      value: reports.filter((r) =>
        r.attachments?.some((a) => a.includes(".jpg") || a.includes(".png"))
      ).length.toString(),
      icon: Camera,
      trend: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Voice Records",
      value: reports.filter((r) =>
        r.attachments?.some((a) => a.includes(".mp3") || a.includes(".wav"))
      ).length.toString(),
      icon: Mic,
      trend: "+15%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Impact Score",
      value: "892",
      icon: TrendingUp,
      trend: "+23%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">My Reports</h1>
            <p className="text-muted-foreground">Manage and track your environmental reports</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onNewReport}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.trend} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Reports
            <span className="text-sm font-normal text-muted-foreground">
              {filteredReports.length} of {reports.length} reports
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first report."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <report.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">{report.title}</h3>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace("-", " ")}
                        </Badge>
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <span>{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onViewReport(report)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditReport(report)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewReport(report)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditReport(report)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Report
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDeleteReport(report.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ReportDetail = ({ report, onBack, onEdit }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    if (report.audioData) {
      const audio = new Audio(report.audioData);
      audio.onended = () => setIsPlayingAudio(false);
      audio.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Reports
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">{report.title}</h1>
              <div className="flex items-center gap-3">
                <Badge className={report.status === 'published' ? 'bg-green-100 text-green-800' : 
                                 report.status === 'under-review' ? 'bg-yellow-100 text-yellow-800' : 
                                 'bg-gray-100 text-gray-800'}>
                  {report.status.replace('-', ' ')}
                </Badge>
                <Badge className={report.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                 report.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                                 'bg-gray-100 text-gray-800'}>
                  {report.priority} priority
                </Badge>
                <span className="text-sm text-muted-foreground">{report.type}</span>
              </div>
            </div>
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{report.description}</p>
              </CardContent>
            </Card>

            {/* Cloudinary Content Previews */}
            {(report.cloudinaryUrls || report.audioData) && (
              <Card className="bg-white mb-6">
                <CardHeader>
                  <CardTitle>Media Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Voice Recording Preview */}
                    {report.audioData && report.type === 'Voice Report' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mic className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Voice Recording</span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <audio 
                            controls 
                            className="w-full"
                            src={report.audioData}
                          >
                            Your browser does not support the audio element.
                          </audio>
                          <p className="text-sm text-muted-foreground mt-2">
                            Click play to listen to the voice report
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Photo Previews */}
                    {report.cloudinaryUrls && report.type === 'Wildlife' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Camera className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Photo Documentation</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {report.cloudinaryUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => window.open(url, '_blank')}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click on any photo to view in full size
                        </p>
                      </div>
                    )}

                    {/* Video Previews */}
                    {report.cloudinaryUrls && report.type === 'Research' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Video Documentation</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {report.cloudinaryUrls.map((url, index) => (
                            <div key={index} className="space-y-2">
                              <video
                                controls
                                className="w-full h-48 object-cover rounded-lg border"
                                src={url}
                              >
                                Your browser does not support the video element.
                              </video>
                              <p className="text-xs text-muted-foreground text-center">
                                Video {index + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Use the video controls to play, pause, and adjust volume
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legacy Attachments Display */}
            {report.attachments && report.attachments.length > 0 && !report.cloudinaryUrls && !report.audioData && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        {attachment.includes('.wav') || attachment.includes('.mp3') ? (
                          <Mic className="h-5 w-5 text-purple-600" />
                        ) : (
                          <FileImage className="h-5 w-5 text-blue-600" />
                        )}
                        <span className="flex-1">{attachment}</span>
                        {(attachment.includes('.wav') || attachment.includes('.mp3')) && report.audioData ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handlePlayAudio}
                            disabled={isPlayingAudio}
                          >
                            {isPlayingAudio ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{report.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last updated</p>
                    <p className="font-medium">{report.updatedAt ? new Date(report.updatedAt).toLocaleDateString() : 'Just now'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {(report.coordinates || report.locationData) && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Coordinates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latitude</span>
                      <span className="font-medium">
                        {report.coordinates?.lat || report.locationData?.latitude || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Longitude</span>
                      <span className="font-medium">
                        {report.coordinates?.lng || report.locationData?.longitude || 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyReports, ReportDetail };


// Main App Component
export function WebCitizenDashboard() {
  const [state, setState] = useState({
    currentPage: 'dashboard',
    reports: initialReports,
    globalSearchQuery: '',
    selectedReport: null,
    isCreatingReport: false,
    isEditingReport: false,
    newReport: {},
    activeQuickAction: null,
    isRecording: false,
    recordingTime: 0,
    selectedFiles: [],
    uploadProgress: 0,
    recordedAudio: null,
    isPlaying: false,
    mediaRecorder: null,
    audioChunks: [],
    currentLocation: null,
    isGettingLocation: false
  });


  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const recordingInterval = useRef(null);

  // Geolocation functions
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      setState(prev => ({ ...prev, isGettingLocation: true }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          
          setState(prev => ({ 
            ...prev, 
            currentLocation: location,
            isGettingLocation: false 
          }));
          
          resolve(location);
        },
        (error) => {
          setState(prev => ({ ...prev, isGettingLocation: false }));
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const requestLocationPermission = async () => {
    try {
      toast.loading('Getting your location...');
      const location = await getCurrentLocation();
      toast.dismiss();
      toast.success(`Location captured: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`);
      return location;
    } catch (error) {
      toast.dismiss();
      let errorMessage = 'Failed to get location.';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out. Please try again.';
          break;
        default:
          errorMessage = 'An unknown error occurred while getting location.';
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  // Navigation handlers
  const handleNavigation = (page) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      selectedReport: null,
      isCreatingReport: false,
      isEditingReport: false,
      activeQuickAction: null, 
      isRecording: false,      
      recordingTime: 0,      
      selectedFiles: [],     
      uploadProgress: 0 
    }));
  };

  const handleQuickAction = (action) => {
    setState(prev => ({
      ...prev,
      activeQuickAction: action,
      recordingTime: 0,
      selectedFiles: [],
      uploadProgress: 0,
      isRecording: false
    }));

    switch (action) {
      case 'voice':
        toast.success('Voice recording interface opened');
        break;
      case 'photo':
        toast.success('Photo upload interface opened');
        break;
      case 'file':
        toast.success('Video upload interface opened');
        break;
      default:
        break;
    }
  };

  // Voice Recording Handlers
  const handleStartRecording = async () => {
    try {
      // Request location permission first
      await requestLocationPermission();
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setState(prev => ({ 
          ...prev, 
          recordedAudio: audioUrl, 
          audioChunks: audioChunks,
          mediaRecorder: null 
        }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        recordingTime: 0, 
        mediaRecorder: mediaRecorder,
        audioChunks: audioChunks
      }));
      
      recordingInterval.current = setInterval(() => {
        setState(prev => ({ ...prev, recordingTime: prev.recordingTime + 1 }));
      }, 1000);
      
      toast.success('Recording started with location captured');
    } catch (error) {
      console.error('Error starting recording:', error);
      if (error.message.includes('Location')) {
        toast.error('Location permission required to start recording.');
      } else {
        toast.error('Could not access microphone. Please check permissions.');
      }
    }
  };

  const handleStopRecording = () => {
    if (state.mediaRecorder && state.mediaRecorder.state === 'recording') {
      state.mediaRecorder.stop();
    }
    setState(prev => ({ ...prev, isRecording: false }));
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
    toast.success('Recording stopped');
  };

  const handlePlayRecording = () => {
    if (state.recordedAudio) {
      const audio = new Audio(state.recordedAudio);
      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      };
      audio.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const handlePauseRecording = () => {
    // For simplicity, we'll just stop the audio
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleSaveRecording = async () => {
    try {
      // Show loading toast
      toast.loading('Uploading recording to Cloudinary...');
      
      console.log("3603 done");
      // Convert blob URL back to blob
      const response = await fetch(state.recordedAudio);
      const audioBlob = await response.blob();

      console.log("3608 done");

      
             // Upload to Cloudinary using utility function
       const fileName = `voice_recording_${Date.now()}.mp3`;
       const uploadResult = await uploadToCloudinary(audioBlob, fileName);
       const cloudinaryUrl = uploadResult.secure_url;

       console.log(user);
      //  console.log(transcribeAudio(cloudinaryUrl));

       axios
         .post(`${backend_url}/api/citizen/voice-alert`, {
           user: user.id,
           audioUrl: cloudinaryUrl,
           transcript: "",
           location: {
            lat: state.currentLocation.latitude,
            lng: state.currentLocation.longitude,
           },
         })
         .then((res) => {
           if (res.data.message === "Voice alert created") {
             toast.success("Voice alert created successfully");
           } else {
             toast.error("Failed to create voice alert");
           }
         })
         .catch((err) => {
           toast.error("Failed to create voice alert");
           console.error(err);
         });
       
       // Store in localStorage
       const storedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '[]');
       const newRecording = {
         id: Date.now(),
         url: cloudinaryUrl,
         title: `Voice Report - ${new Date().toLocaleDateString()}`,
         duration: state.recordingTime,
         uploadedAt: new Date().toISOString(),
         publicId: uploadResult.public_id,
         locationData: state.currentLocation
       };
      storedRecordings.push(newRecording);
      localStorage.setItem('voiceRecordings', JSON.stringify(storedRecordings));
      
             // Create new report with Cloudinary URL and location data
       const newReport = {
         id: Math.max(...state.reports.map(r => r.id)) + 1,
         title: `Voice Report - ${new Date().toLocaleDateString()}`,
         type: 'Voice Report',
         location: state.currentLocation ? `Lat: ${state.currentLocation.latitude.toFixed(6)}, Lng: ${state.currentLocation.longitude.toFixed(6)}` : 'Location not available',
         date: 'Just now',
         status: 'draft',
         priority: 'medium',
         icon: Mic,
         description: `Voice recording captured (${Math.floor(state.recordingTime / 60)}:${(state.recordingTime % 60).toString().padStart(2, '0')})`,
         createdBy: 'Maria Santos',
         updatedAt: new Date().toISOString(),
         coordinates: state.currentLocation ? { lat: state.currentLocation.latitude, lng: state.currentLocation.longitude } : { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
         attachments: [`voice_recording_${Date.now()}.wav`],
         audioData: cloudinaryUrl, // Store the Cloudinary URL for playback
         cloudinaryPublicId: uploadResult.public_id,
         locationData: state.currentLocation // Store the full location data
       };

      setState(prev => ({
        ...prev,
        reports: [newReport, ...prev.reports],
        activeQuickAction: null,
        recordingTime: 0,
        recordedAudio: null,
        isPlaying: false,
        currentPage: 'reports'
      }));
      
      toast.dismiss();
      toast.success('Voice report uploaded to Cloudinary and saved successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error('Failed to upload recording. Please try again.');
    }
  };

  // Photo Upload Handlers
  const handleFileSelect = (files) => {
    setState(prev => ({ ...prev, selectedFiles: files }));
  };

  const handlePhotoUpload = async () => {
    try {
      setState(prev => ({ ...prev, uploadProgress: 0 }));
      
      // Show loading toast
      toast.loading('Uploading photos to Cloudinary...');
      
      const uploadedUrls = [];
      const uploadedPublicIds = [];
      
      // Upload each file to Cloudinary
      for (let i = 0; i < state.selectedFiles.length; i++) {
        const file = state.selectedFiles[i];
        const fileName = `photo_${Date.now()}_${i}.${file.name.split('.').pop()}`;
        
        // Update progress
        const progress = Math.round(((i + 1) / state.selectedFiles.length) * 100);
        setState(prev => ({ ...prev, uploadProgress: progress }));
        
        // Upload to Cloudinary
        var uploadResult = await uploadToCloudinary(file, fileName);
        uploadedUrls.push(uploadResult.secure_url);
        uploadedPublicIds.push(uploadResult.public_id);
      }
      
      axios
         .post(`${backend_url}/api/citizen/photo`, {
          user: user.id,
          type: "image",
           url: uploadResult.secure_url,
           location: {
            lat: state.currentLocation.latitude,
            lng: state.currentLocation.longitude,
           },
         })
         .then((res) => {
           if (res.data.message === "Upload created") {
             toast.success("Voice alert created successfully");
           } else {
             toast.error("Failed to create photo alert");
           }
         })
         .catch((err) => {
           toast.error("Failed to create photo alert");
           console.error(err);
         });
       
      // Store in localStorage
      const storedPhotos = JSON.parse(localStorage.getItem('photoUploads') || '[]');
      const newPhotoUpload = {
        id: Date.now(),
        urls: uploadedUrls,
        publicIds: uploadedPublicIds,
        title: `Photo Report - ${new Date().toLocaleDateString()}`,
        fileCount: state.selectedFiles.length,
        uploadedAt: new Date().toISOString(),
        locationData: state.currentLocation
      };
      storedPhotos.push(newPhotoUpload);
      localStorage.setItem('photoUploads', JSON.stringify(storedPhotos));
      
      // Create new report with Cloudinary URLs and location data
      const newReport = {
        id: Math.max(...state.reports.map(r => r.id)) + 1,
        title: `Photo Report - ${new Date().toLocaleDateString()}`,
        type: 'Wildlife',
        location: state.currentLocation ? `Lat: ${state.currentLocation.latitude.toFixed(6)}, Lng: ${state.currentLocation.longitude.toFixed(6)}` : 'Location not available',
        date: 'Just now',
        status: 'draft',
        priority: 'medium',
        icon: Camera,
        description: `Photo documentation with ${state.selectedFiles.length} images uploaded`,
        createdBy: 'Maria Santos',
        updatedAt: new Date().toISOString(),
        coordinates: state.currentLocation ? { lat: state.currentLocation.latitude, lng: state.currentLocation.longitude } : { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
        attachments: state.selectedFiles.map(file => file.name),
        cloudinaryUrls: uploadedUrls,
        cloudinaryPublicIds: uploadedPublicIds,
        locationData: state.currentLocation // Store the full location data
      };

      setState(prev => ({
        ...prev,
        reports: [newReport, ...prev.reports],
        activeQuickAction: null,
        selectedFiles: [],
        uploadProgress: 0,
        currentPage: 'reports'
      }));
      
      toast.dismiss();
      toast.success('Photos uploaded to Cloudinary successfully!');
      
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.dismiss();
      toast.error('Failed to upload photos. Please try again.');
      setState(prev => ({ ...prev, uploadProgress: 0 }));
    }
  };

  // Video Upload Handlers
  const handleFileUpload = async () => {
    try {
      // Show loading toast
      toast.loading('Uploading videos to Cloudinary...');
      
      const uploadedUrls = [];
      const uploadedPublicIds = [];
      
      // Upload each video to Cloudinary
      for (let i = 0; i < state.selectedFiles.length; i++) {
        const file = state.selectedFiles[i];
        const fileName = `video_${Date.now()}_${i}.${file.name.split('.').pop()}`;
        
        // Upload to Cloudinary
        var uploadResult = await uploadToCloudinary(file, fileName);
        uploadedUrls.push(uploadResult.secure_url);
        uploadedPublicIds.push(uploadResult.public_id);
      }

      axios
         .post(`${backend_url}/api/citizen/video`, {
          user: user.id,
          type: "video",
           url: uploadResult.secure_url,
           location: {
            lat: state.currentLocation.latitude,
            lng: state.currentLocation.longitude,
           },
         })
         .then((res) => {
           if (res.data.message === "Upload created") {
             toast.success("Voice alert created successfully");
           } else {
             toast.error("Failed to create video alert");
           }
         })
         .catch((err) => {
           toast.error("Failed to create video alert");
           console.error(err);
         });
      
      // Store in localStorage
      const storedFiles = JSON.parse(localStorage.getItem('fileUploads') || '[]');
      const newFileUpload = {
        id: Date.now(),
        urls: uploadedUrls,
        publicIds: uploadedPublicIds,
        title: `Video Report - ${new Date().toLocaleDateString()}`,
        fileCount: state.selectedFiles.length,
        uploadedAt: new Date().toISOString(),
        locationData: state.currentLocation
      };
      storedFiles.push(newFileUpload);
      localStorage.setItem('fileUploads', JSON.stringify(storedFiles));
      
      // Create new report with Cloudinary URLs and location data
      const newReport = {
        id: Math.max(...state.reports.map(r => r.id)) + 1,
        title: `Video Report - ${new Date().toLocaleDateString()}`,
        type: 'Research',
        location: state.currentLocation ? `Lat: ${state.currentLocation.latitude.toFixed(6)}, Lng: ${state.currentLocation.longitude.toFixed(6)}` : 'Location not available',
        date: 'Just now',
        status: 'draft',
        priority: 'medium',
        icon: Upload,
        description: `Video documentation with ${state.selectedFiles.length} videos uploaded`,
        createdBy: 'Maria Santos',
        updatedAt: new Date().toISOString(),
        coordinates: state.currentLocation ? { lat: state.currentLocation.latitude, lng: state.currentLocation.longitude } : { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
        attachments: state.selectedFiles.map(file => file.name),
        cloudinaryUrls: uploadedUrls,
        cloudinaryPublicIds: uploadedPublicIds,
        locationData: state.currentLocation // Store the full location data
      };

      setState(prev => ({
        ...prev,
        reports: [newReport, ...prev.reports],
        activeQuickAction: null,
        selectedFiles: [],
        currentPage: 'reports'
      }));
      
      toast.dismiss();
      toast.success('Videos uploaded to Cloudinary successfully!');
      
    } catch (error) {
      console.error('Video upload error:', error);
      toast.dismiss();
      toast.error('Failed to upload videos. Please try again.');
    }
  };

  const handleQuickActionCancel = () => {
    // Stop recording if it's in progress
    if (state.mediaRecorder && state.mediaRecorder.state === 'recording') {
      state.mediaRecorder.stop();
    }
    
    // Clean up audio URL if it exists
    if (state.recordedAudio) {
      URL.revokeObjectURL(state.recordedAudio);
    }
    
    setState(prev => ({
      ...prev,
      activeQuickAction: null,
      isRecording: false,
      recordingTime: 0,
      selectedFiles: [],
      uploadProgress: 0,
      recordedAudio: null,
      isPlaying: false,
      mediaRecorder: null,
      audioChunks: []
    }));
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
  };

  const handleGlobalSearch = (query) => {
    setState(prev => ({ ...prev, globalSearchQuery: query }));
    if (query && state.currentPage !== 'reports') {
      setState(prev => ({ ...prev, currentPage: 'reports' }));
    }
    setReportSearchQuery(query);
  };

  const handleNewReport = () => {
    setState(prev => ({
      ...prev,
      isCreatingReport: true,
      isEditingReport: false,
      newReport: {
        title: '',
        description: '',
        type: '',
        location: '',
        priority: 'medium',
        status: 'draft',
        createdBy: 'Maria Santos',
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const handleSaveReport = (reportData) => {
    if (state.isEditingReport && state.selectedReport) {
      const updatedReports = state.reports.map(report =>
        report.id === state.selectedReport.id
          ? { ...report, ...reportData, updatedAt: new Date().toISOString() }
          : report
      );
      setState(prev => ({
        ...prev,
        reports: updatedReports,
        isEditingReport: false,
        selectedReport: null,
        currentPage: 'reports'
      }));
      toast.success('Report updated successfully!');
    } else {
      const newReport = {
        id: Math.max(...state.reports.map(r => r.id)) + 1,
        title: reportData.title,
        type: reportData.type,
        location: reportData.location,
        date: 'Just now',
        status: reportData.status || 'draft',
        priority: reportData.priority || 'medium',
        icon: FileText,
        description: reportData.description,
        createdBy: 'Maria Santos',
        updatedAt: new Date().toISOString(),
        coordinates: { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 }
      };
      setState(prev => ({
        ...prev,
        reports: [newReport, ...prev.reports],
        isCreatingReport: false,
        currentPage: 'reports'
      }));
      toast.success('Report created successfully!');
    }
  };

  const handleViewReport = (report) => {
    setState(prev => ({
      ...prev,
      selectedReport: report,
      isCreatingReport: false,
      isEditingReport: false
    }));
  };

  const handleEditReport = (report) => {
    setState(prev => ({
      ...prev,
      selectedReport: report,
      isCreatingReport: false,
      isEditingReport: true,
      newReport: report
    }));
  };

  const handleDeleteReport = (reportId) => {
    if (confirm('Are you sure you want to delete this report?')) {
      const reportToDelete = state.reports.find(report => report.id === reportId);
      
      // Remove from localStorage based on report type
      if (reportToDelete) {
        try {
          // Handle voice recordings
          if (reportToDelete.cloudinaryPublicId && reportToDelete.type === 'Voice Report') {
            const storedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '[]');
            const updatedRecordings = storedRecordings.filter(recording => recording.id !== reportId);
            localStorage.setItem('voiceRecordings', JSON.stringify(updatedRecordings));
            console.log('Would delete from Cloudinary:', reportToDelete.cloudinaryPublicId);
          }
          
          // Handle photo uploads
          if (reportToDelete.cloudinaryPublicIds && reportToDelete.type === 'Wildlife') {
            const storedPhotos = JSON.parse(localStorage.getItem('photoUploads') || '[]');
            const updatedPhotos = storedPhotos.filter(photo => photo.id !== reportId);
            localStorage.setItem('photoUploads', JSON.stringify(updatedPhotos));
            console.log('Would delete photos from Cloudinary:', reportToDelete.cloudinaryPublicIds);
          }
          
          // Handle file uploads
          if (reportToDelete.cloudinaryPublicIds && reportToDelete.type === 'Research') {
            const storedFiles = JSON.parse(localStorage.getItem('fileUploads') || '[]');
            const updatedFiles = storedFiles.filter(file => file.id !== reportId);
            localStorage.setItem('fileUploads', JSON.stringify(updatedFiles));
            console.log('Would delete files from Cloudinary:', reportToDelete.cloudinaryPublicIds);
          }
        } catch (error) {
          console.error('Error removing from localStorage:', error);
        }
      }
      
      const updatedReports = state.reports.filter(report => report.id !== reportId);
      setState(prev => ({ ...prev, reports: updatedReports }));
      toast.success('Report deleted successfully!');
    }
  };

  const handleCancel = () => {
    setState(prev => ({
      ...prev,
      isCreatingReport: false,
      isEditingReport: false,
      selectedReport: null,
      newReport: {},
      currentPage: 'reports'
    }));
  };

    useEffect(() => {
    // Load existing uploads from localStorage
    const loadStoredUploads = () => {
      try {
        // Load voice recordings
        const storedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '[]');
        if (storedRecordings.length > 0) {
          const existingReportIds = state.reports.map(r => r.id);
          const newRecordings = storedRecordings.filter(recording => 
            !existingReportIds.includes(recording.id)
          );
          
          if (newRecordings.length > 0) {
            const newReports = newRecordings.map(recording => ({
              id: recording.id,
              title: recording.title,
              type: 'Voice Report',
              location: 'Current Location',
              date: new Date(recording.uploadedAt).toLocaleDateString(),
              status: 'published',
              priority: 'medium',
              icon: Mic,
              description: `Voice recording (${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')})`,
              createdBy: 'Maria Santos',
              updatedAt: recording.uploadedAt,
              coordinates: { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
              attachments: [`voice_recording_${recording.id}.wav`],
              audioData: recording.url,
              cloudinaryPublicId: recording.publicId
            }));
            
            setState(prev => ({
              ...prev,
              reports: [...newReports, ...prev.reports]
            }));
          }
        }
        
        // Load photo uploads
        const storedPhotos = JSON.parse(localStorage.getItem('photoUploads') || '[]');
        if (storedPhotos.length > 0) {
          const existingReportIds = state.reports.map(r => r.id);
          const newPhotos = storedPhotos.filter(photo => 
            !existingReportIds.includes(photo.id)
          );
          
          if (newPhotos.length > 0) {
            const newReports = newPhotos.map(photo => ({
              id: photo.id,
              title: photo.title,
              type: 'Wildlife',
              location: 'Current Location',
              date: new Date(photo.uploadedAt).toLocaleDateString(),
              status: 'published',
              priority: 'medium',
              icon: Camera,
              description: `Photo documentation with ${photo.fileCount} images`,
              createdBy: 'Maria Santos',
              updatedAt: photo.uploadedAt,
              coordinates: { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
              attachments: photo.urls.map((_, index) => `photo_${photo.id}_${index}.jpg`),
              cloudinaryUrls: photo.urls,
              cloudinaryPublicIds: photo.publicIds
            }));
            
            setState(prev => ({
              ...prev,
              reports: [...newReports, ...prev.reports]
            }));
          }
        }
        
        // Load file uploads
        const storedFiles = JSON.parse(localStorage.getItem('fileUploads') || '[]');
        if (storedFiles.length > 0) {
          const existingReportIds = state.reports.map(r => r.id);
          const newFiles = storedFiles.filter(file => 
            !existingReportIds.includes(file.id)
          );
          
          if (newFiles.length > 0) {
            const newReports = newFiles.map(file => ({
              id: file.id,
              title: file.title,
              type: 'Research',
              location: 'Current Location',
              date: new Date(file.uploadedAt).toLocaleDateString(),
              status: 'published',
              priority: 'medium',
              icon: Upload,
              description: `Video documentation with ${file.fileCount} videos`,
              createdBy: 'Maria Santos',
              updatedAt: file.uploadedAt,
              coordinates: { lat: 34.0522 + Math.random() * 0.1, lng: -118.2437 + Math.random() * 0.1 },
              attachments: file.urls.map((_, index) => `video_${file.id}_${index}.mp4`),
              cloudinaryUrls: file.urls,
              cloudinaryPublicIds: file.publicIds
            }));
            
            setState(prev => ({
              ...prev,
              reports: [...newReports, ...prev.reports]
            }));
          }
        }
      } catch (error) {
        console.error('Error loading stored uploads:', error);
      }
    };
    
    loadStoredUploads();
    
    return () => {
      if (recordingInterval.current) clearInterval(recordingInterval.current);
    };
  }, []);

  const handleBackToReports = () => {
    setState(prev => ({
      ...prev,
      selectedReport: null,
      isCreatingReport: false,
      isEditingReport: false
    }));
  };

  const filteredReports = state.reports.filter(report => {
    if (!state.globalSearchQuery) return true;
    const query = state.globalSearchQuery.toLowerCase();
    return report.title.toLowerCase().includes(query) ||
           report.type.toLowerCase().includes(query) ||
           report.description.toLowerCase().includes(query) ||
           report.location.toLowerCase().includes(query);
  });

  const renderCurrentPage = () => {
    if (state.activeQuickAction) {
      switch (state.activeQuickAction) {
        case 'voice':
          return (
            <VoiceRecorder
              isRecording={state.isRecording}
              recordingTime={state.recordingTime}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onSaveRecording={handleSaveRecording}
              onCancel={handleQuickActionCancel}
              recordedAudio={state.recordedAudio}
              isPlaying={state.isPlaying}
              onPlayRecording={handlePlayRecording}
              onPauseRecording={handlePauseRecording}
            />
          );
        case 'photo':
          return (
            <PhotoUpload
              selectedFiles={state.selectedFiles}
              uploadProgress={state.uploadProgress}
              onFileSelect={handleFileSelect}
              onUpload={handlePhotoUpload}
              onCancel={handleQuickActionCancel}
              onRequestLocation={requestLocationPermission}
            />
          );
        case 'file':
          return (
            <FileUpload
              selectedFiles={state.selectedFiles}
              onFileSelect={handleFileSelect}
              onUpload={handleFileUpload}
              onCancel={handleQuickActionCancel}
              onRequestLocation={requestLocationPermission}
            />
          );
        default:
          return null;
      }
    }

    if (state.isCreatingReport || state.isEditingReport) {
      return (
        <ReportForm
          report={state.newReport}
          onSave={handleSaveReport}
          onCancel={handleCancel}
          isEditing={state.isEditingReport}
        />
      );
    }

    if (state.selectedReport) {
      return (
        <ReportDetail
          report={state.selectedReport}
          onBack={handleBackToReports}
          onEdit={() => handleEditReport(state.selectedReport)}
        />
      );
    }

    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard reports={filteredReports} onAddReport={handleNewReport} onViewReport={handleViewReport} />;
      case 'map':
        return <MapView reports={filteredReports} onAddReport={handleNewReport} />;
      case 'reports':
        return (
          <MyReports
            reports={filteredReports}
            searchQuery={reportSearchQuery}
            onSearchChange={setReportSearchQuery}
            onNewReport={handleNewReport}
            onViewReport={handleViewReport}
            onEditReport={handleEditReport}
            onDeleteReport={handleDeleteReport}
          />
        );
      case 'analytics':
        return <Analytics reports={filteredReports} />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard reports={filteredReports} onAddReport={handleNewReport} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeItem={state.currentPage} 
        onNavigate={handleNavigation}
        onQuickAction={handleQuickAction}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          globalSearchQuery={state.globalSearchQuery}
          onGlobalSearch={handleGlobalSearch}
          currentPage={state.currentPage}
          activeQuickAction={state.activeQuickAction}
        />
        
        {/* Location Status Indicator */}
        {state.isGettingLocation && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
              <span className="text-sm font-medium">Getting your location...</span>
            </div>
          </div>
        )}
        
        {state.currentLocation && !state.isGettingLocation && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">
                Location captured: {state.currentLocation.latitude.toFixed(6)}, {state.currentLocation.longitude.toFixed(6)}
              </span>
            </div>
          </div>
        )}
        
        {renderCurrentPage()}
      </div>
    </div>
  );
}



