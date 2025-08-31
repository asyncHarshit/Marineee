import React, { useState } from 'react';
import { Search, Bell, Settings, Satellite, Navigation, Eye, MapPin, Clock, Users as UsersIcon, Activity, Users, FileText, Archive } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { RescueLog } from './RescueLog';
import { EmergnecyMapView } from './LiveEmergencyMap';

export function Dashboard() {
  const [selectedZone, setSelectedZone] = useState('zone-a');
  const [alertMessage, setAlertMessage] = useState('');

  const stats = [
    { title: 'Active Emergencies', value: '1', icon: Activity, color: 'text-blue-600' },
    { title: 'Teams Deployed', value: '3', icon: UsersIcon, color: 'text-green-600' },
    { title: 'Today\'s Rescues', value: '7', icon: MapPin, color: 'text-purple-600' },
    { title: 'Average Response', value: '12 min', icon: Clock, color: 'text-blue-600' },
  ];

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Coastal Rescue Control</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Rescue Operations Team
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search rescues, teams..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      </div>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Map View */}
          <EmergnecyMapView/>

          {/* Rescue Log */}
          <RescueLog />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        {/* Safe Zone Alerts */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Safe Zone Alerts</h3>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="mb-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zone-a">Zone A - North Beach (1/25)</SelectItem>
              <SelectItem value="zone-b">Zone B - South Bay (0/20)</SelectItem>
              <SelectItem value="zone-c">Zone C - Marina (2/30)</SelectItem>
            </SelectContent>
          </Select>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Message
            </label>
            <Textarea
              placeholder="Enter emergency alert..."
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              className="mb-3"
            />
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            <MapPin className="w-4 h-4 mr-2" />
            Send Alert to Zone
          </Button>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View All Teams
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Emergency Map
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              View Archive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}