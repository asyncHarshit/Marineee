import React, { useState } from 'react';
import { AlertTriangle, Bell, Send, MapPin, Clock, Users, Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

export function AlertSystem() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Emergency',
      title: 'High Priority Water Rescue',
      message: 'Multiple swimmers in distress near Golden Gate Bridge',
      zones: ['Zone A', 'Zone B'],
      timestamp: '2024-12-28 14:45',
      status: 'Active',
      recipient: 'All Teams',
      priority: 'High',
    },
    {
      id: 2,
      type: 'Weather',
      title: 'Severe Weather Warning',
      message: 'Strong winds and rough seas expected in next 2 hours',
      zones: ['All Zones'],
      timestamp: '2024-12-28 12:30',
      status: 'Active',
      recipient: 'All Personnel',
      priority: 'Medium',
    },
    {
      id: 3,
      type: 'System',
      title: 'Equipment Maintenance',
      message: 'Boat Alpha-2 scheduled for maintenance - out of service until 16:00',
      zones: ['Zone C'],
      timestamp: '2024-12-28 09:15',
      status: 'Resolved',
      recipient: 'Marine Teams',
      priority: 'Low',
    },
  ]);

  const [newAlert, setNewAlert] = useState({
    type: '',
    title: '',
    message: '',
    zones: [],
    recipient: '',
    priority: 'Medium',
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Resolved': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const handleSendAlert = () => {
    const alert = {
      id: alerts.length + 1,
      ...newAlert,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Active',
    };
    setAlerts([alert, ...alerts]);
    setNewAlert({
      type: '',
      title: '',
      message: '',
      zones: [],
      recipient: '',
      priority: 'Medium',
    });
  };

  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Alert System</h1>
          <p className="text-gray-600">Manage emergency alerts and notifications</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alert-type">Alert Type</Label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert({...newAlert, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Weather">Weather</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newAlert.priority} onValueChange={(value) => setNewAlert({...newAlert, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="title">Alert Title</Label>
                <Input
                  id="title"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="Enter alert title"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                  placeholder="Enter alert message"
                  rows={3}
                />
              </div>
              <div>
                <Label>Target Zones</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['Zone A', 'Zone B', 'Zone C', 'Zone D', 'All Zones'].map((zone) => (
                    <div key={zone} className="flex items-center space-x-2">
                      <Checkbox id={zone} />
                      <Label htmlFor={zone} className="text-sm">{zone}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="recipient">Recipients</Label>
                <Select value={newAlert.recipient} onValueChange={(value) => setNewAlert({...newAlert, recipient: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Teams">All Teams</SelectItem>
                    <SelectItem value="All Personnel">All Personnel</SelectItem>
                    <SelectItem value="Marine Teams">Marine Teams</SelectItem>
                    <SelectItem value="Alpha Teams">Alpha Teams</SelectItem>
                    <SelectItem value="Beta Teams">Beta Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendAlert} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-semibold text-red-600">
                  {alerts.filter(a => a.status === 'Active').length}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">{alerts.length}</p>
              </div>
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-semibold text-orange-600">
                  {alerts.filter(a => a.priority === 'High').length}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-semibold text-green-600">
                  {alerts.filter(a => a.status === 'Resolved').length}
                </p>
              </div>
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="weather">Weather</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{alert.title}</h3>
                  <p className="text-gray-600 mb-3">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.zones.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{alert.recipient}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  {alert.status === 'Active' && (
                    <Button variant="outline" size="sm">Resolve</Button>
                  )}
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}