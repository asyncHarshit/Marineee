import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';

import { 
  Building, CheckCircle, Globe, FileText, Users, 
  MapPin, Clock, Radio, Wifi, WifiOff,
  Eye, ThumbsUp, ThumbsDown, Bell, Activity
} from 'lucide-react';
import { toast } from 'sonner';

export function GovernmentDashboard() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');

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
    { id: 1, title: "Oil Spill Report - Bay Area", location: "Coastal Zone B", reporter: "Maria Santos", priority: "high", time: "2 hours ago", status: "pending" },
    { id: 2, title: "Illegal Fishing Activity", location: "Protected Waters", reporter: "John Davis", priority: "medium", time: "4 hours ago", status: "pending" },
    { id: 3, title: "Marine Life Disturbance", location: "Sanctuary Zone", reporter: "Lisa Chen", priority: "low", time: "1 day ago", status: "reviewing" }
  ];

  const alerts = [
    { id: 1, type: "emergency", title: "Coastal Erosion Alert", location: "North Shore", time: "15 min ago" },
    { id: 2, type: "warning", title: "High Tide Warning", location: "Harbor District", time: "1 hour ago" },
    { id: 3, type: "info", title: "Maintenance Complete", location: "Monitoring Station 3", time: "3 hours ago" }
  ];

  const rescueTeamData = [
    { id: 1, team: "Alpha Team", status: "active", location: "Northern Patrol", lastSync: "2 min ago" },
    { id: 2, team: "Beta Team", status: "standby", location: "Harbor Base", lastSync: "5 min ago" },
    { id: 3, team: "Gamma Team", status: "offline", location: "Southern Sector", lastSync: "2 hours ago" }
  ];

  const handleValidateReport = (id, action) => {
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

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
       <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <Building className="w-6 h-6" />
          <span className="font-medium">Gov Portal</span>
        </div>
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <WifiOff className="w-4 h-4 text-red-300" />
          ) : (
            <Wifi className="w-4 h-4 text-green-300" />
          )}
          <Badge variant="secondary" className="bg-blue-800 text-white border-0">
            Official
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Real-time Data Charts */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Real-time Marine Data</h3>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-medium text-blue-600">"API Create krro"</p>
              <p className="text-xs text-gray-500">Air Quality</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium text-green-600">aand bhand ka tola</p>
              <p className="text-xs text-gray-500">Compliance</p>
            </div>
          </div>
          <div className="h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-around p-2">
              <div className="w-4 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
              <div className="w-4 bg-green-500 rounded-t" style={{ height: '80%' }}></div>
              <div className="w-4 bg-blue-600 rounded-t" style={{ height: '45%' }}></div>
              <div className="w-4 bg-green-600 rounded-t" style={{ height: '90%' }}></div>
              <div className="w-4 bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
            </div>
          </div>
        </Card>

        {/* Google Maps HeatMap */}
        <Card className="h-48 bg-gradient-to-br from-blue-200 to-blue-400 border-0 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge className="bg-white/90 text-blue-900 border-0 rounded-full">
              Marine Activity HeatMap
            </Badge>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">47 Protected Areas Active</span>
              </div>
              <Button size="sm" variant="secondary" className="bg-white/90 text-blue-900 border-0 rounded-full text-xs">
                Full Map
              </Button>
            </div>
          </div>
          {/* Heat map overlay */}
          <div className="absolute inset-6 opacity-40">
            <div className="grid grid-cols-6 grid-rows-4 gap-1 h-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm ${
                    i % 3 === 0 ? 'bg-red-400/60' : 
                    i % 3 === 1 ? 'bg-yellow-400/60' : 'bg-green-400/60'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </Card>

        {/* Reports Validation */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Reports Validation</h3>
            <Badge variant="outline" className="border-blue-200 text-blue-700 rounded-full">
              {reportsForValidation.length} Pending
            </Badge>
          </div>
          <div className="space-y-3">
            {reportsForValidation.map((report) => (
              <div key={report.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`}></div>
                      <h4 className="text-sm font-medium text-gray-800">{report.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500">{report.location} • {report.reporter}</p>
                    <p className="text-xs text-gray-400">{report.time}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 rounded-full text-xs"
                    onClick={() => handleValidateReport(report.id, 'approve')}
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-700 hover:bg-red-50 rounded-full text-xs"
                    onClick={() => handleValidateReport(report.id, 'reject')}
                  >
                    <ThumbsDown className="w-3 h-3 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-blue-600 hover:bg-blue-50 rounded-full text-xs"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Feed */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Live Alerts</h3>
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <ScrollArea className="h-40">
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-xl ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{alert.title}</h4>
                      <p className="text-xs text-gray-600">{alert.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Coastal Rescue Team */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Coastal Rescue Teams</h3>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full text-xs"
              onClick={handleSyncRescueData}
              disabled={syncStatus === 'syncing'}
            >
              <Radio className="w-3 h-3 mr-1" />
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync'}
            </Button>
          </div>
          <div className="space-y-3">
            {rescueTeamData.map((team) => (
              <div key={team.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getTeamStatusColor(team.status)}`}></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{team.team}</h4>
                      <p className="text-xs text-gray-500">{team.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{team.lastSync}</p>
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
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Policy Status */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <h3 className="text-gray-800 font-medium mb-4">Marine Policy Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-sm text-gray-700">Coastal Protection Act</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <span className="text-sm text-gray-700">Fishing Regulations</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">Under Review</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-sm text-gray-700">Marine Sanctuary Expansion</span>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600 font-medium">In Progress</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md">
            <FileText className="w-4 h-4" />
            Policy Report
          </Button>
          <Button className="h-12 bg-green-700 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md">
            <Users className="w-4 h-4" />
            Stakeholders
          </Button>
        </div>
      </div>
    </div>
  );

  }
