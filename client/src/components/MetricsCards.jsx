import React from 'react';
import { TrendingUp, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {useEffect , useState} from 'react';
const cities = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
];

export function MetricsCards() {
   const [aqi, setAqi] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Current Location");

  // Fetch AQI from OpenWeatherMap API
  const fetchAQI = async (lat, lon) => {
    const api = import.meta.env.VITE_APP_OPENWEATHER_API_KEY
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`
      );
      const data = await res.json();
      if (data?.list?.length > 0) {
        setAqi(data.list[0].main.aqi);
      }
    } catch (error) {
      console.error("Failed to fetch AQI:", error);
    }
  };

  // Fetch AQI for current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchAQI(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // fallback to Delhi
          fetchAQI(28.6139, 77.2090);
        }
      );
    }
  }, []);

  const metrics = [
    {
      title: "Air Quality",
      value: aqi ? `AQI: ${aqi}` : "Loading...",
      change: selectedCity,
      changeType: "neutral",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      tooltip:
        "City-wise breakdown of air quality index (AQI) data. Provides insights into pollution levels, trends, and variations across different regions for targeted environmental monitoring.",
    },
    {
      title: 'Locations',
      value: '342',
      change: 'Current Sites',
      changeType: 'neutral',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      tooltip:
        'Active monitoring locations worldwide. Includes coastal areas, forests, urban centers, and critical infrastructure sites.',
    },
    {
      title: 'Validation Rate',
      value: '87%',
      change: 'Quality Assured',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      tooltip:
        'Data accuracy validation rate using machine learning algorithms and manual verification processes. Target: 90%+',
    },
  ];

  return (
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            {metric.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">
                            {metric.value}
                          </p>
                          <p
                            className={`text-sm ${
                              metric.changeType === "positive"
                                ? "text-green-600"
                                : metric.changeType === "negative"
                                ? "text-red-600"
                                : "text-gray-500"
                            }`}
                          >
                            {metric.change}
                          </p>

                          {/* Dropdown for Air Quality only */}
                          {metric.title === "Air Quality" && (
                            <select
                              value={selectedCity}
                              onChange={(e) => {
                                const city = cities.find(
                                  (c) => c.name === e.target.value
                                );
                                if (city) {
                                  fetchAQI(city.lat, city.lon);
                                  setSelectedCity(city.name);
                                }
                              }}
                              className="mt-2 border rounded-lg px-2 py-1 text-sm"
                            >
                              <option>Current Location</option>
                              {cities.map((c) => (
                                <option key={c.name}>{c.name}</option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div
                          className={`w-14 h-14 rounded-xl ${metric.bgColor} flex items-center justify-center shadow-sm`}
                        >
                          <Icon className={`w-7 h-7 ${metric.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    );
}

