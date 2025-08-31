import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  AlertTriangle, MapPin, Clock, Navigation, Megaphone, Camera, 
  FileText, Upload, Save, User, CheckCircle, Shield,
  Phone, LifeBuoy, Target
} from 'lucide-react';
import { toast } from 'sonner';

export function RescueDashboard() {
  const [selectedZone, setSelectedZone] = useState('zone-a');
  const [alertMessage, setAlertMessage] = useState('');
  const [rescueReport, setRescueReport] = useState({
    userName: '',
    location: '',
    date: '',
    time: '',
    notes: ''
  });

  const emergencyLocation = {
    lat: 37.7749,
    lng: -122.4194,
    address: "Golden Gate Bridge Area",
    eta: "8 minutes",
    reportedBy: "Marine Patrol Unit 3"
  };

  const rescueLog = [
    {
      id: 1,
      date: '2024-12-28',
      user: 'Sarah Mitchell',
      location: 'Pier 39',
      status: 'completed',
      time: '14:30',
      isRecent: true
    },
    {
      id: 2,
      date: '2024-12-28',
      user: 'John Davidson',
      location: 'Alcatraz Waters',
      status: 'in-progress',
      time: '12:15',
      isRecent: false
    },
    {
      id: 3,
      date: '2024-12-27',
      user: 'Maria Santos',
      location: 'Baker Beach',
      status: 'completed',
      time: '16:45',
      isRecent: false
    },
    {
      id: 4,
      date: '2024-12-27',
      user: 'Robert Chen',
      location: 'Crissy Field',
      status: 'completed',
      time: '09:20',
      isRecent: false
    }
  ];

  const safeZones = [
    { id: 'zone-a', name: 'Zone A - North Beach', population: 1250 },
    { id: 'zone-b', name: 'Zone B - Marina District', population: 890 },
    { id: 'zone-c', name: "Zone C - Fisherman's Wharf", population: 2100 },
    { id: 'zone-d', name: 'Zone D - Embarcadero', population: 1650 }
  ];

  const handleSendAlert = () => {
    if (!alertMessage.trim()) {
      toast.error('Please enter an alert message');
      return;
    }
    const zone = safeZones.find(z => z.id === selectedZone);
    toast.success(`Alert sent to ${zone?.name} (${zone?.population} citizens)`);
    setAlertMessage('');
  };

  const handleSaveReport = () => {
    if (!rescueReport.userName || !rescueReport.location) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('Rescue report saved and sent to authorities');
    setRescueReport({
      userName: '',
      location: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleDeployTeam = () => {
    toast.success('Rescue team Alpha-1 deployed to emergency location');
  };

  const handleGenerateReport = () => {
    toast.success('Comprehensive rescue report generated');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'in-progress': return <Clock className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <LifeBuoy className="w-6 h-6" />
          <span className="font-medium">Coastal Rescue Control</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-800 text-white border-0">
            Rescue Operations
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      {/* ...rest of your JSX remains unchanged... */}
            <div className="p-4 space-y-4">
              {/* User Emergency Location Card */}
              <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-medium">Emergency Location</h3>
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                
                {/* Map Preview */}
                <div className="h-32 bg-gradient-to-br from-blue-200 to-green-200 rounded-xl relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="bg-white/90 text-blue-900 border-0 rounded-full">
                      Live Emergency
                    </Badge>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute center-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <LifeBuoy className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">ETA: {emergencyLocation.eta}</span>
                      </div>
                      <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white border-0 rounded-full text-xs">
                        <Navigation className="w-3 h-3 mr-1" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
      
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="text-sm font-medium">{emergencyLocation.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reported by:</span>
                    <span className="text-sm font-medium">{emergencyLocation.reportedBy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time:</span>
                    <Badge className="bg-blue-100 text-blue-700 border-0 rounded-full">
                      {emergencyLocation.eta}
                    </Badge>
                  </div>
                </div>
              </Card>
      
              {/* Safe Zone Broadcast Card */}
              <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-medium">Safe Zone Alerts</h3>
                  <Megaphone className="w-5 h-5 text-blue-600" />
                </div>
      
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="zone-select" className="text-sm text-gray-600 mb-2 block">
                      Select Zone
                    </Label>
                    <select 
                      id="zone-select"
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-xl bg-gray-50 text-sm"
                    >
                      {safeZones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name} ({zone.population} citizens)
                        </option>
                      ))}
                    </select>
                  </div>
      
                  <div>
                    <Label htmlFor="alert-message" className="text-sm text-gray-600 mb-2 block">
                      Alert Message
                    </Label>
                    <Textarea
                      id="alert-message"
                      placeholder="Enter emergency alert message..."
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      className="w-full p-3 border-0 bg-gray-50 rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
      
                  <Button 
                    onClick={handleSendAlert}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md"
                  >
                    <Target className="w-4 h-4" />
                    Send Alert to Zone
                  </Button>
                </div>
              </Card>
      
              {/* Rescue Report Card */}
              <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-medium">Rescue Report</h3>
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
      
                <div className="space-y-4">
                  {/* Photo Upload */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload rescue photo</p>
                    <Button variant="outline" size="sm" className="border-gray-300 rounded-full">
                      Choose File
                    </Button>
                  </div>
      
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="user-name" className="text-sm text-gray-600 mb-1 block">
                        User Name *
                      </Label>
                      <Input
                        id="user-name"
                        placeholder="Rescued person's name"
                        value={rescueReport.userName}
                        onChange={(e) => setRescueReport({...rescueReport, userName: e.target.value})}
                        className="border-0 bg-gray-50 rounded-xl"
                      />
                    </div>
      
                    <div>
                      <Label htmlFor="location" className="text-sm text-gray-600 mb-1 block">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        placeholder="Rescue location"
                        value={rescueReport.location}
                        onChange={(e) => setRescueReport({...rescueReport, location: e.target.value})}
                        className="border-0 bg-gray-50 rounded-xl"
                      />
                    </div>
      
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="date" className="text-sm text-gray-600 mb-1 block">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={rescueReport.date}
                          onChange={(e) => setRescueReport({...rescueReport, date: e.target.value})}
                          className="border-0 bg-gray-50 rounded-xl"
                        />
                      </div>
      
                      <div>
                        <Label htmlFor="time" className="text-sm text-gray-600 mb-1 block">
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={rescueReport.time}
                          onChange={(e) => setRescueReport({...rescueReport, time: e.target.value})}
                          className="border-0 bg-gray-50 rounded-xl"
                        />
                      </div>
                    </div>
      
                    <div>
                      <Label htmlFor="notes" className="text-sm text-gray-600 mb-1 block">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional details about the rescue..."
                        value={rescueReport.notes}
                        onChange={(e) => setRescueReport({...rescueReport, notes: e.target.value})}
                        className="border-0 bg-gray-50 rounded-xl resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
      
                  <Button 
                    onClick={handleSaveReport}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Record & Send to Authority
                  </Button>
                </div>
              </Card>
      
              {/* Rescue Log Card */}
              <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-medium">Rescue Log</h3>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
      
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {rescueLog.map((rescue) => (
                      <div 
                        key={rescue.id} 
                        className={`p-3 rounded-xl border ${
                          rescue.isRecent 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">{rescue.user}</span>
                          </div>
                          <Badge 
                            className={`text-xs rounded-full border-0 ${getStatusColor(rescue.status)} flex items-center gap-1`}
                          >
                            {getStatusIcon(rescue.status)}
                            {rescue.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span>{rescue.location}</span>
                            <span>{rescue.date}</span>
                          </div>
                          <span>{rescue.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
      
              {/* Bottom Actions */}
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={handleDeployTeam}
                  className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md"
                >
                  <Shield className="w-5 h-5" />
                  Deploy Team
                </Button>
                <Button 
                  onClick={handleGenerateReport}
                  className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md"
                >
                  <FileText className="w-5 h-5" />
                  Generate Rescue Report
                </Button>
              </div>
            </div>
    </div>
  );
}
