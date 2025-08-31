import React, { useState } from "react";
import { Globe, Satellite, Layers, Play, Pause, Download, Settings } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import {HeatmapWithSlider } from "./PredictiveAnalMap";
import { HazardHeatmap } from "./TemporalAnalysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SeverityHeatmap from "./Severity";
import SpatialHeatMap from "./SpatialAnalysis";

// ------------------ Data --------------------
const hazardFrequency = [
  { name: "Cyclone", value: 12 },
  { name: "Hurricane", value: 7 },
  { name: "Tsunami", value: 3 },
  { name: "Typhoon", value: 1 },
];

const oceanRisk = [
  { name: "Bay of Bengal", value: 10 },
  { name: "Atlantic Ocean", value: 7 },
  { name: "Indian Ocean", value: 3 },
  { name: "Pacific Ocean", value: 2 },
  { name: "Arabian Sea", value: 1 },
];

const seasonalPatterns = [
  { name: "January", value: 0 },
  { name: "February", value: 1 },
  { name: "March", value: 1 },
  { name: "April", value: 1 },
  { name: "May", value: 5 },
  { name: "June", value: 0 },
  { name: "July", value: 0 },
  { name: "August", value: 3 },
  { name: "September", value: 2 },
  { name: "October", value: 4 },
  { name: "November", value: 2 },
  { name: "December", value: 4 },
];

const countryAnalysis = [
  { name: "India", value: 10 },
  { name: "USA", value: 5 },
  { name: "Bangladesh", value: 1 },
  { name: "Honduras", value: 1 },
  { name: "Indonesia", value: 1 },
  { name: "Myanmar", value: 1 },
  { name: "Japan", value: 1 },
  { name: "Philippines", value: 1 },
  { name: "Nicaragua", value: 1 },
  { name: "Mozambique", value: 1 },
];

const analysisTypes = [
  { id: 'hazard-frequency', name: 'Hazard Frequency', description: 'Track how often each type of hazard occurs in different regions or oceans' },
  { id: 'spatial-distribution', name: 'Spatial Distribution', description: 'Visualize the geographic locations of hazards on a map' },
  { id: 'temporal-trends', name: 'Temporal Trends', description: 'Analyze hazard occurrences over years or months to detect trends' },
  { id: 'severity-impact', name: 'Severity / Impact', description: 'Study intensity, damage, and fatalities associated with hazards' },
  { id: 'ocean-risk', name: 'Ocean / Sea Risk', description: 'Determine hazard risk by ocean or sea and identify vulnerable regions' },
  { id: 'seasonal-patterns', name: 'Seasonal Patterns', description: 'Detect seasonal trends and peak months for each hazard type' },
  { id: 'country-analysis', name: 'Country Wise Analysis', description: 'Compare hazard types, regions, or decades to identify patterns' },
  { id: 'predictive-modeling', name: 'Predictive Modeling', description: 'Use historical data to forecast future hazard occurrences' }
];

// ------------------ Main Component --------------------
export  function EarthEngineSection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState("cyclone");
  const [selectedAnalysisType, setSelectedAnalysisType] = useState(null);

  const datasets = [
    { id: "cyclone", name: "Cyclone", resolution: "Bay of Bengal", bands: 0 },
    { id: "hurricane", name: "Hurricane", resolution: "Atlantic Ocean", bands: 0 },
    { id: "tsunami", name: "Tsunami", resolution: "Indian Ocean", bands: 0 },
    { id: "typhoon", name: "Typhoon", resolution: "Pacific Ocean", bands: 0 },
  ];

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    toast.info("Starting Earth Engine analysis...");

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success("Analysis completed successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  // ------------------ Graph Renderer --------------------
  const renderSelectedGraph = () => {
    switch (selectedAnalysisType) {
      case "hazard-frequency":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={hazardFrequency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-25} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#87CEEB" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "ocean-risk":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={oceanRisk}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-25} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#F08080" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "seasonal-patterns":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={seasonalPatterns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "country-analysis":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={countryAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-25} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="purple" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

    // ------------------ Map Renderer --------------------
  const renderSelectedMap = () => {
    switch (selectedAnalysisType) {
      case "spatial-distribution":
        return (
          <div >
            {/* Your real map component */}
            <SpatialHeatMap/>
          </div>
        );
      case "temporal-trends":
        return (
          <div >
             <HazardHeatmap/>
          </div>
        );
      case "severity-impact":
        return (
          <div>
            <SeverityHeatmap/>
          </div>
        );
      case "predictive-modeling":
        return (
          <div>
             <HeatmapWithSlider />
          </div>
        );
      default:
        return (
          <div className="relative h-96 bg-gradient-to-br from-blue-100 via-green-100 to-teal-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-green-300/30 to-teal-300/20"></div>
            <p className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white/70 px-3 py-1 rounded-md">
              🌍 Select an analysis type to view map
            </p>
          </div>
        );
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Google Earth Engine</h1>
            <p className="text-gray-600">Advanced satellite imagery analysis</p>
          </div>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800">
          Connected
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Dataset Selection</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Satellite Dataset</label>
                <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {datasets.map((dataset) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{dataset.name}</span>
                          <span className="text-xs text-gray-500 ml-2">{dataset.resolution}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Analysis Type</label>
                {analysisTypes.map((analysis) => (
                  <div
                    key={analysis.id}
                    className={`border rounded-lg p-3 cursor-pointer hover:bg-gray-50 
                      ${selectedAnalysisType === analysis.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                    onClick={() => setSelectedAnalysisType(analysis.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="analysis"
                        checked={selectedAnalysisType === analysis.id}
                        onChange={() => setSelectedAnalysisType(analysis.id)}
                        className="text-blue-600"
                      />
                      <div>
                        <label className="font-medium text-gray-900 cursor-pointer">{analysis.name}</label>
                        <p className="text-sm text-gray-500">{analysis.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleStartProcessing}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" /> Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" /> Start Analysis
                    </>
                  )}
                </Button>
                {isProcessing && (
                  <div className="mt-3 space-y-2">
                    <Progress value={processingProgress} className="h-2" />
                    <p className="text-xs text-gray-500 text-center">{processingProgress}% complete</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="font-semibold text-gray-900">Earth Engine Map Viewer</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Layers className="w-4 h-4 mr-2" /> Layers
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-blue-100 via-green-100 to-teal-100 rounded-lg overflow-hidden">
                 {renderSelectedMap()}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-green-300/30 to-teal-300/20"></div> */}
              </div>
            </CardContent>
          </Card>

          {/* Graphs based on analysis type */}
          {selectedAnalysisType && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">
                  Analysis Result: {analysisTypes.find((a) => a.id === selectedAnalysisType)?.name}
                </h3>
              </CardHeader>
              <CardContent>{renderSelectedGraph()}</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
