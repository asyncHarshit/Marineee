import React  from 'react';
import { MapPin, Satellite, Navigation, Eye, Radio, AlertTriangle, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { EmergnecyMapView } from './LiveEmergencyMap';

export function EmergencyMap() {
  // const [mapView, setMapView] = useState('satellite');
  
  // const activeEmergencies = [
  //   {
  //     id: 1,
  //     location: 'Golden Gate Bridge Area',
  //     priority: 'High',
  //     type: 'Water Rescue',
  //     coordinates: { x: 65, y: 45 },
  //     team: 'Marine Patrol Unit 3',
  //     eta: '4 minutes',
  //     responders: 3,
  //   },
  //   {
  //     id: 2,
  //     location: 'Pier 39 Marina',
  //     priority: 'Medium',
  //     type: 'Medical Emergency',
  //     coordinates: { x: 40, y: 60 },
  //     team: 'Alpha-2',
  //     eta: '8 minutes',
  //     responders: 2,
  //   },
  // ];

  const teams = [
    { id: 'alpha-1', name: 'Alpha-1', status: 'Available', location: 'Station 1' },
    { id: 'alpha-2', name: 'Alpha-2', status: 'En Route', location: 'Pier 39' },
    { id: 'beta-1', name: 'Beta-1', status: 'On Scene', location: 'Golden Gate' },
    { id: 'marine-3', name: 'Marine-3', status: 'Available', location: 'Marina' },
  ];

  return (
    <div className="flex h-full">
      {/* Map View */}
      <EmergnecyMapView/>

      {/* Right Sidebar - Team Status */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Team Status</h3>
        
        <div className="space-y-4 mb-6">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{team.name}</h4>
                  <Badge 
                    variant={team.status === 'Available' ? 'default' : 
                            team.status === 'En Route' ? 'secondary' : 'destructive'}
                    className={
                      team.status === 'Available' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                      team.status === 'En Route' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                      'bg-red-100 text-red-700 hover:bg-red-100'
                    }
                  >
                    {team.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{team.location}</p>
                <div className="mt-2 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Radio className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    Locate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Stats */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Current Statistics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">Active Emergencies</span>
              </div>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Teams Deployed</span>
              </div>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Avg Response Time</span>
              </div>
              <span className="font-semibold text-gray-900">12 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}