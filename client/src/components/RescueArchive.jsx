import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, Clock, FileText, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';

export function RescueArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRescue, setSelectedRescue] = useState(null);

  const archiveData = [
    {
      id: 'R-2024-001',
      date: '2024-12-28',
      time: '14:30',
      location: 'Golden Gate Bridge Area',
      type: 'Water Rescue',
      status: 'Completed',
      priority: 'High',
      team: 'Marine Patrol Unit 3',
      duration: '45 minutes',
      rescued: 2,
      weather: 'Rough seas, 15 knot winds',
      description: 'Two swimmers caught in strong current near Golden Gate Bridge. Successfully rescued by Marine Unit 3 with helicopter support.',
      outcome: 'Both individuals rescued safely, minor hypothermia treated on scene',
      reportedBy: 'Coast Guard Station',
      coordinates: '37.8199° N, 122.4783° W',
    },
    {
      id: 'R-2024-002',
      date: '2024-12-27',
      time: '16:45',
      location: 'Pier 39 Marina',
      type: 'Medical Emergency',
      status: 'Completed',
      priority: 'Medium',
      team: 'Alpha Team 2',
      duration: '25 minutes',
      rescued: 1,
      weather: 'Clear, calm conditions',
      description: 'Elderly tourist collapsed on dock with chest pains. Medical emergency response.',
      outcome: 'Patient stabilized and transported to UCSF Medical Center',
      reportedBy: 'Marina Security',
      coordinates: '37.8080° N, 122.4177° W',
    },
    {
      id: 'R-2024-003',
      date: '2024-12-26',
      time: '11:20',
      location: 'Alcatraz Waters',
      type: 'Boat Assistance',
      status: 'Completed',
      priority: 'Low',
      team: 'Beta Team 1',
      duration: '90 minutes',
      rescued: 4,
      weather: 'Foggy, light winds',
      description: 'Recreational boat with engine failure drifting toward rocks near Alcatraz Island.',
      outcome: 'Boat towed to safe harbor, all passengers unharmed',
      reportedBy: 'Vessel Captain',
      coordinates: '37.8270° N, 122.4230° W',
    },
    {
      id: 'R-2024-004',
      date: '2024-12-25',
      time: '09:15',
      location: 'Baker Beach',
      type: 'Search & Rescue',
      status: 'Completed',
      priority: 'High',
      team: 'Alpha Team 1',
      duration: '120 minutes',
      rescued: 1,
      weather: 'Overcast, moderate waves',
      description: 'Missing swimmer reported by family. Last seen near Baker Beach.',
      outcome: 'Swimmer found conscious but exhausted, transported to hospital',
      reportedBy: 'Family Member',
      coordinates: '37.7937° N, 122.4844° W',
    },
  ];

  const filteredData = archiveData.filter(rescue => {
    const matchesSearch = 
      rescue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rescue.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rescue.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rescue.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || rescue.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Rescue Archive</h1>
          <p className="text-gray-600">Search and view historical rescue operations</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Archive
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Operations</p>
                <p className="text-2xl font-semibold text-gray-900">{archiveData.length}</p>
              </div>
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">People Rescued</p>
                <p className="text-2xl font-semibold text-green-600">
                  {archiveData.reduce((sum, rescue) => sum + rescue.rescued, 0)}
                </p>
              </div>
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-green-600">100%</p>
              </div>
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-semibold text-blue-600">70 min</p>
              </div>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by location, type, team, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="transferred">Transferred</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="water-rescue">Water Rescue</SelectItem>
            <SelectItem value="medical">Medical Emergency</SelectItem>
            <SelectItem value="boat-assistance">Boat Assistance</SelectItem>
            <SelectItem value="search-rescue">Search & Rescue</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </Button>
      </div>

      {/* Archive Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((rescue) => (
                  <tr key={rescue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-blue-600">{rescue.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{rescue.date}</div>
                        <div className="text-sm text-gray-500">{rescue.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{rescue.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{rescue.type}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rescue.team}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getPriorityColor(rescue.priority)}>
                        {rescue.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {rescue.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRescue(rescue)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Rescue Operation Details - {rescue?.id}</DialogTitle>
                          </DialogHeader>
                          {rescue && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><span className="text-gray-600">Date:</span> {rescue.date} at {rescue.time}</div>
                                    <div><span className="text-gray-600">Location:</span> {rescue.location}</div>
                                    <div><span className="text-gray-600">Type:</span> {rescue.type}</div>
                                    <div><span className="text-gray-600">Duration:</span> {rescue.duration}</div>
                                    <div><span className="text-gray-600">Coordinates:</span> {rescue.coordinates}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Response Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><span className="text-gray-600">Team:</span> {rescue.team}</div>
                                    <div><span className="text-gray-600">Priority:</span> 
                                      <Badge className={getPriorityColor(rescue.priority) + ' ml-2'}>
                                        {rescue.priority}
                                      </Badge>
                                    </div>
                                    <div><span className="text-gray-600">People Rescued:</span> {rescue.rescued}</div>
                                    <div><span className="text-gray-600">Reported By:</span> {rescue.reportedBy}</div>
                                    <div><span className="text-gray-600">Weather:</span> {rescue.weather}</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{rescue.description}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Outcome</h4>
                                <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">{rescue.outcome}</p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Report
                                </Button>
                                <Button variant="outline">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Generate Summary
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}