import React, { useState } from 'react';
import { Users, Phone, MapPin, Clock, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([
    {
      id: 'alpha-1',
      name: 'Alpha Team 1',
      leader: 'Captain Sarah Chen',
      members: 4,
      status: 'Available',
      location: 'Station 1 - North Bay',
      specialization: 'Water Rescue',
      lastDeployment: '2024-12-27 14:30',
      contact: '+1-415-555-0101',
    },
    {
      id: 'alpha-2',
      name: 'Alpha Team 2', 
      leader: 'Lieutenant Mike Rodriguez',
      members: 3,
      status: 'En Route',
      location: 'Pier 39 Marina',
      specialization: 'Medical Emergency',
      lastDeployment: '2024-12-28 13:15',
      contact: '+1-415-555-0102',
    },
    {
      id: 'beta-1',
      name: 'Beta Team 1',
      leader: 'Sergeant Lisa Wong',
      members: 5,
      status: 'On Scene',
      location: 'Golden Gate Bridge',
      specialization: 'High Angle Rescue',
      lastDeployment: '2024-12-28 12:45',
      contact: '+1-415-555-0103',
    },
    {
      id: 'marine-3',
      name: 'Marine Unit 3',
      leader: 'Captain John Harrison',
      members: 3,
      status: 'Maintenance',
      location: 'Marina Station',
      specialization: 'Marine Operations',
      lastDeployment: '2024-12-26 16:20',
      contact: '+1-415-555-0104',
    },
  ]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'En Route': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'On Scene': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Maintenance': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    }
  };

  const handleDelete = (id) => {
  setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
};


  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage rescue teams and personnel</p>
        </div>
        <Dialog>
  <DialogTrigger asChild>
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Add New Team
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Team</DialogTitle>
    </DialogHeader>

    {/* Form starts here */}
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTeam = {
          id: `${formData.get("team-name").toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
          name: formData.get("team-name"),
          leader: formData.get("team-leader"),
          specialization: formData.get("specialization"),
          members: parseInt(formData.get("members"), 10),
          status: "Available",
          location: "New Station", // default location placeholder
          lastDeployment: new Date().toISOString().slice(0, 16).replace("T", " "),
          contact: "+1-000-000-0000",
        };

        setTeams((prevTeams) => [...prevTeams, newTeam]);
        e.target.reset(); // reset form after submit
      }}
    >
      <div>
        <Label htmlFor="team-name">Team Name</Label>
        <Input id="team-name" name="team-name" placeholder="Enter team name" required />
      </div>
      <div>
        <Label htmlFor="team-leader">Team Leader</Label>
        <Input id="team-leader" name="team-leader" placeholder="Enter team leader name" required />
      </div>
      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <select
          id="specialization"
          name="specialization"
          className="w-full border rounded-md p-2"
          required
        >
          <option value="">Select specialization</option>
          <option value="Water Rescue">Water Rescue</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="High Angle Rescue">High Angle Rescue</option>
          <option value="Marine Operations">Marine Operations</option>
        </select>
      </div>
      <div>
        <Label htmlFor="members">Number of Members</Label>
        <Input
          id="members"
          name="members"
          type="number"
          min="1"
          placeholder="Enter number of members"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Create Team
      </Button>
    </form>
    {/* Form ends here */}
  </DialogContent>
</Dialog>

      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search teams, leaders, or specializations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="deployed">Deployed</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <Badge className={getStatusColor(team.status)}>
                  {team.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{team.leader}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{team.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Last: {team.lastDeployment}</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Members</span>
                    <span className="text-sm text-gray-900">{team.members}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Specialization</span>
                    <Badge variant="outline" className="text-xs">
                      {team.specialization}
                    </Badge>
                  </div>
                </div>
                <div className="pt-3 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
  variant="outline" 
  size="sm" 
  onClick={() => handleDelete(team.id)}
>
  <Trash2 className="w-3 h-3" />
</Button>

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Teams</p>
                <p className="text-2xl font-semibold text-gray-900">{teams.length}</p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-semibold text-green-600">
                  {teams.filter(t => t.status === 'Available').length}
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
                <p className="text-sm text-gray-600">Deployed</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {teams.filter(t => t.status === 'En Route' || t.status === 'On Scene').length}
                </p>
              </div>
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Personnel</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {teams.reduce((sum, team) => sum + team.members, 0)}
                </p>
              </div>
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}