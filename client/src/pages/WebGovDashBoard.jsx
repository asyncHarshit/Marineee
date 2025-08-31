import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/seperator';
import { Progress } from '../components/ui/progress';
import { CommandMapCard } from '@/components/CommandMap';
import { 
  Building, AlertCircle, CheckCircle, Globe, FileText, Users, 
  MapPin, TrendingUp, Clock, Shield, Radio, Wifi, WifiOff,
  Eye, ThumbsUp, ThumbsDown, Bell, Activity, Search, Settings,
  User, Home, BarChart3, MessageCircle, Archive, Layers,
  Target, Share2, Database, Flame, Signal, Monitor, Map,
  Video,
  Bot
} from 'lucide-react';
import { toast } from 'sonner';
import { EmergencyNotification } from '@/components/InputNotification';

import {UnifiedCommandMap }from '../components/Unified_CommandMap';
const apiKey = import.meta.env.VITE_VAPI_API_KEY;
const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

import VideoCall from '@/components/VideoCall';

import VoiceTextAI from '@/components/AI_Bot';

export function WebGovernmentDashboard() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapMode, setMapMode] = useState('hotspots');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const reportsForValidation = [
    { id: 1, title: "Oil Spill Report - Bay Area", location: "Coastal Zone B", reporter: "Maria Santos", priority: "high", time: "2 hours ago", status: "pending", description: "Large oil spill detected near marine sanctuary" },
    { id: 2, title: "Illegal Fishing Activity", location: "Protected Waters", reporter: "John Davis", priority: "medium", time: "4 hours ago", status: "pending", description: "Commercial fishing vessel in restricted area" },
    { id: 3, title: "Marine Life Disturbance", location: "Sanctuary Zone", reporter: "Lisa Chen", priority: "low", time: "1 day ago", status: "reviewing", description: "Unusual whale behavior observed" },
    { id: 4, title: "Water Quality Violation", location: "Industrial Harbor", reporter: "Mike Johnson", priority: "high", time: "6 hours ago", status: "pending", description: "Elevated pollution levels detected" }
  ];

  const alerts = [
    { id: 1, type: "emergency", title: "Coastal Erosion Alert", location: "North Shore", time: "15 min ago", description: "Critical erosion threatening infrastructure" },
    { id: 2, type: "warning", title: "High Tide Warning", location: "Harbor District", time: "1 hour ago", description: "Unusually high tides expected" },
    { id: 3, type: "info", title: "Maintenance Complete", location: "Monitoring Station 3", time: "3 hours ago", description: "System maintenance completed successfully" },
    { id: 4, type: "warning", title: "Weather Advisory", location: "All Coastal Areas", time: "4 hours ago", description: "Strong winds and rough seas expected" }
  ];

  const rescueTeamData = [
    { id: 1, team: "Alpha Team", status: "active", location: "Northern Patrol", lastSync: "2 min ago", personnel: 8, equipment: "Fully Equipped" },
    { id: 2, team: "Beta Team", status: "standby", location: "Harbor Base", lastSync: "5 min ago", personnel: 6, equipment: "Standard" },
    { id: 3, team: "Gamma Team", status: "offline", location: "Southern Sector", lastSync: "2 hours ago", personnel: 7, equipment: "Limited Comms" }
  ];

  const credibilityHotspots = [
    { id: 1, location: "Coral Bay", coordinates: { lat: 25.7617, lng: -80.1918 }, credibilityScore: 94, reportCount: 23, verifiedReports: 18, type: "pollution", severity: "high", socialMentions: 147, description: "Multiple verified reports of oil discharge", lastUpdated: "5 min ago" },
    { id: 2, location: "Marine Sanctuary North", coordinates: { lat: 25.8617, lng: -80.2918 }, credibilityScore: 87, reportCount: 15, verifiedReports: 12, type: "wildlife", severity: "medium", socialMentions: 89, description: "Unusual marine life behavior patterns", lastUpdated: "12 min ago" },
    { id: 3, location: "Fishing Zone Alpha", coordinates: { lat: 25.6617, lng: -80.0918 }, credibilityScore: 78, reportCount: 31, verifiedReports: 19, type: "illegal_fishing", severity: "high", socialMentions: 203, description: "Unauthorized commercial fishing activities", lastUpdated: "18 min ago" },
    { id: 4, location: "Coastal Protection Zone", coordinates: { lat: 25.9617, lng: -80.3918 }, credibilityScore: 72, reportCount: 8, verifiedReports: 6, type: "erosion", severity: "low", socialMentions: 34, description: "Accelerated coastal erosion observed", lastUpdated: "1 hour ago" }
  ];

  const socialMediaTrends = [
    { platform: "Twitter", mentions: 847, trend: "+23%", sentiment: "negative", keywords: ["oil spill", "marine life", "coral damage"] },
    { platform: "Instagram", mentions: 432, trend: "+12%", sentiment: "concerned", keywords: ["beach cleanup", "conservation", "protect ocean"] },
    { platform: "Facebook", mentions: 298, trend: "-5%", sentiment: "mixed", keywords: ["fishing ban", "marine park", "government action"] }
  ];

  const realtimeData = [
    { name: 'Water Quality', value: 94, color: 'bg-blue-500' },
    { name: 'Compliance Rate', value: 87, color: 'bg-green-500' },
    { name: 'Protected Areas', value: 76, color: 'bg-purple-500' },
    { name: 'Active Monitoring', value: 92, color: 'bg-orange-500' }
  ];

  const handleValidateReport = (reportId, action) => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    toast.success(`Report ${actionText} successfully`);
  };

  const handleSyncRescueData = () => {
    setSyncStatus('syncing');
    toast.info('Syncing rescue team data...');
    
    setTimeout(() => {
      setSyncStatus('synced');
      toast.success('Rescue team data synchronized');
    }, 2000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'emergency': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTeamStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCredibilityColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-yellow-300 bg-yellow-50';
      case 'low': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300`}>
        {/* Header */}
        <div className="bg-blue-900 text-white p-4">
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Building className="w-8 h-8 flex-shrink-0" />
            <span className={`font-medium text-lg transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              INCOIS Portal
            </span>
          </div>
          <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Shield className="w-4 h-4" />
            <span>Unified Command</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <NavItem
              icon={<Home className="w-4 h-4" />}
              label="Dashboard"
              active={selectedNav === "Dashboard"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("Dashboard")}
            />
            <NavItem
              icon={<Map className="w-4 h-4" />}
              label="Command Map"
              active={selectedNav === "Command Map"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("Command Map")}
            />
            <NavItem
              icon={<Target className="w-4 h-4" />}
              label="Hotspot Analysis"
              active={selectedNav === "Hotspot Analysis"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("Hotspot Analysis")}
            />
            <NavItem
              icon={<Share2 className="w-4 h-4" />}
              label="Social Media"
              active={selectedNav === "Social Media"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("Social Media")}
            />
            <NavItem
              icon={<Bot className="w-4 h-4" />}
              label="AI Analytics"
              active={selectedNav === "AI Analytics"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("AI Analytics")}
            />
            <NavItem
              icon={<Video className="w-4 h-4" />}
              label="Video Meeting"
              active={selectedNav === "Video Meeting"}
              open={sidebarOpen}
              onClick={() => setSelectedNav("Video Meeting")}
            />
          </nav>
          {sidebarOpen && (
            <>
              <Separator className="my-4" />
              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 mb-2">Quick Actions</p>
                <Button 
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white justify-start"
                  onClick={() => setShowNotification(true)}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Emergency Alert
                </Button>
                {showNotification && <EmergencyNotification/>}
                
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Connection Status */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center gap-2 text-sm ${!sidebarOpen && 'justify-center'}`}>
            {!isOnline ? (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                {sidebarOpen && <span className="text-red-600">Offline</span>}
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                {sidebarOpen && <span className="text-green-600">INCOIS Network</span>}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}

<div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">

          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-gray-800">
              {selectedNav === "Dashboard" ? "Unified Command Dashboard" : selectedNav}
            </h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 rounded-full">
              INCOIS • Disaster Management
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search reports, incidents..." 
                className="pl-9 w-64 border-0 bg-gray-50 rounded-full"
              />
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedNav === "Dashboard" && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content - Left Side */}
              <div className="xl:col-span-3 space-y-6">
                {/* Real-time Data Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {realtimeData.map((data, index) => (
                    <Card key={index} className="p-4 bg-white border-0 rounded-2xl shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-600">{data.name}</h4>
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-medium text-gray-800 mb-2">{data.value}%</p>
                      <Progress value={data.value} className="h-2" />
                    </Card>
                  ))}
                </div>

                {/* Unified Command Map */}
                <UnifiedCommandMap
                        credibilityHotspots={credibilityHotspots}
                        socialMediaTrends={socialMediaTrends}
                      />

                {/* Reports Validation */}
                <Card className="p-6 bg-white border-0 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-800">Reports Validation Queue</h3>
                    <Badge variant="outline" className="border-blue-200 text-blue-700 rounded-full">
                      {reportsForValidation.length} Pending Review
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {reportsForValidation.map((report) => (
                      <div key={report.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`}></div>
                              <h4 className="font-medium text-gray-800">{report.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{report.location}</span>
                              <span>By {report.reporter}</span>
                              <span>{report.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 rounded-full"
                            onClick={() => handleValidateReport(report.id, 'approve')}
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-red-200 text-red-700 hover:bg-red-50 rounded-full"
                            onClick={() => handleValidateReport(report.id, 'reject')}
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-blue-600 hover:bg-blue-50 rounded-full"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar - Only show on Dashboard */}
              <div className="space-y-6">
                {/* Alerts Feed */}
                <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">Live Alerts</h3>
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div key={alert.id} className={`p-3 border rounded-xl ${getAlertColor(alert.type)}`}>
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-800">{alert.title}</h4>
                            <span className="text-xs text-gray-400">{alert.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{alert.description}</p>
                          <p className="text-xs text-gray-500">{alert.location}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>

                {/* Coastal Rescue Teams */}
                <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">Rescue Teams</h3>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full"
                      onClick={handleSyncRescueData}
                      disabled={syncStatus === 'syncing'}
                    >
                      <Radio className="w-3 h-3 mr-1" />
                      {syncStatus === 'syncing' ? 'Syncing...' : 'Sync All'}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {rescueTeamData.map((team) => (
                      <div key={team.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getTeamStatusColor(team.status)}`}></div>
                            <h4 className="font-medium text-gray-800">{team.team}</h4>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs rounded-full border-0 ${
                              team.status === 'active' ? 'bg-green-100 text-green-700' :
                              team.status === 'standby' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            {team.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>{team.location}</p>
                          <p>{team.personnel} Personnel • {team.equipment}</p>
                          <p className="text-gray-400">Last sync: {team.lastSync}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Policy Status */}
                <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                  <h3 className="font-medium text-gray-800 mb-4">Policy Status</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Coastal Protection</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-xs text-green-600 mt-1">Active & Enforced</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Fishing Regulations</span>
                        <Clock className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-xs text-yellow-600 mt-1">Under Review</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Sanctuary Expansion</span>
                        <Globe className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-xs text-blue-600 mt-1">In Progress</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {selectedNav === "Command Map" && (
            <div className="space-y-6">
              <Card className="h-[600px] bg-gradient-to-br from-blue-200 to-blue-400 border-0 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-white/90 text-blue-900 border-0 rounded-full">
                      Interactive Command Map - Full View
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={mapMode === "reports" ? "default" : "secondary"}
                        className={`border-0 rounded-full ${
                          mapMode === "reports"
                            ? "bg-blue-900 text-white"
                            : "bg-white/90 text-blue-900"
                        }`}
                        onClick={() => setMapMode("reports")}
                      >
                        Citizen Reports
                      </Button>
                      <Button
                        size="sm"
                        variant={mapMode === "social" ? "default" : "secondary"}
                        className={`border-0 rounded-full ${
                          mapMode === "social"
                            ? "bg-blue-900 text-white"
                            : "bg-white/90 text-blue-900"
                        }`}
                        onClick={() => setMapMode("social")}
                      >
                        Social Trends
                      </Button>
                      <Button
                        size="sm"
                        variant={mapMode === "hotspots" ? "default" : "secondary"}
                        className={`border-0 rounded-full ${
                          mapMode === "hotspots"
                            ? "bg-blue-900 text-white"
                            : "bg-white/90 text-blue-900"
                        }`}
                        onClick={() => setMapMode("hotspots")}
                      >
                        Credibility Hotspots
                      </Button>
                    </div>
                  </div>
                </div>

                <CommandMapCard />
              </Card>
            </div>
          )}


          {selectedNav === "Hotspot Analysis" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {credibilityHotspots.map((hotspot) => (
                  <Card key={hotspot.id} className={`p-6 border-2 rounded-2xl ${getSeverityColor(hotspot.severity)}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getCredibilityColor(hotspot.credibilityScore)}`}></div>
                        <h3 className="text-lg font-medium">{hotspot.location}</h3>
                      </div>
                      <Badge variant="outline" className={`rounded-full ${
                        hotspot.severity === 'high' ? 'border-red-400 text-red-700' :
                        hotspot.severity === 'medium' ? 'border-yellow-400 text-yellow-700' :
                        'border-green-400 text-green-700'
                      }`}>
                        {hotspot.severity} priority
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{hotspot.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Credibility Score</p>
                        <p className="text-xl font-bold text-gray-800">{hotspot.credibilityScore}%</p>
                      </div>
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Total Reports</p>
                        <p className="text-xl font-bold text-gray-800">{hotspot.reportCount}</p>
                      </div>
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Verified</p>
                        <p className="text-xl font-bold text-green-600">{hotspot.verifiedReports}</p>
                      </div>
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Social Mentions</p>
                        <p className="text-xl font-bold text-blue-600">{hotspot.socialMentions}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Last updated: {hotspot.lastUpdated}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                        Deploy Team
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedNav === "Social Media" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialMediaTrends.map((trend, index) => (
                  <Card key={index} className="p-6 bg-white border-0 rounded-2xl shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800">{trend.platform}</h3>
                      <Badge variant={trend.sentiment === 'negative' ? 'destructive' : trend.sentiment === 'concerned' ? 'secondary' : 'default'} className="rounded-full">
                        {trend.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-800">{trend.mentions}</span>
                      <span className={`text-sm font-medium ${trend.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.trend}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 mb-2">Top Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {trend.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs rounded-full">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 bg-white border-0 rounded-2xl shadow-md">
                <h3 className="text-lg font-medium mb-4">Social Media Intelligence Feed</h3>
                <div className="space-y-4">
                  {[
                    { platform: "Twitter", content: "Major oil spill reported near Coral Bay - multiple witnesses", time: "2 min ago", verified: true },
                    { platform: "Instagram", content: "Dead fish washing up on North Shore beach", time: "15 min ago", verified: false },
                    { platform: "Facebook", content: "Fishing boats ignoring sanctuary boundaries again", time: "1 hour ago", verified: true },
                    { platform: "Twitter", content: "Unusual whale behavior spotted by tour group", time: "2 hours ago", verified: false }
                  ].map((post, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-2 ${post.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{post.platform}</span>
                          <span className="text-xs text-gray-500">{post.time}</span>
                          {post.verified && <Badge variant="secondary" className="text-xs rounded-full">Verified</Badge>}
                        </div>
                        <p className="text-sm text-gray-700">{post.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}



          {
            selectedNav === "AI Analytics" && (
              <VoiceTextAI apiKey={apiKey} assistantId={assistantId} geminiApiKey={geminiApiKey} />
            )
          }

          {selectedNav === "Video Meeting" && (
          <VideoCall 
            callId="meeting-room-123"
          />
        )}

        </div>
      </div>
      
    </div>
  );
}

const NavItem = ({ icon, label, active = false, open = true, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap overflow-hidden ${
      active ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100 text-gray-600"
    }`}
  >
    {icon}
    <span
      className={`transition-all duration-300 ${
        open ? "opacity-100 ml-2" : "opacity-0 ml-[-999px]"
      }`}
    >
      {label}
    </span>
  </div>
);
