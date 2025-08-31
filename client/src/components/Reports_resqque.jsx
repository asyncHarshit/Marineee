import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, Clock, MapPin, Plus, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

export function Reports() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('all');
  const [rescueReportOpen, setRescueReportOpen] = useState(false);
  const [rescueForm, setRescueForm] = useState({
    userName: '',
    location: '',
    date: '',
    time: '',
    notes: '',
  });

  const reports = [
    {
      id: 1,
      title: 'Monthly Rescue Operations Summary',
      type: 'Operations',
      period: 'December 2024',
      generated: '2024-12-28 10:30',
      size: '2.4 MB',
      status: 'Complete',
    },
    {
      id: 2,
      title: 'Team Performance Analysis',
      type: 'Performance',
      period: 'Q4 2024',
      generated: '2024-12-27 16:45',
      size: '1.8 MB',
      status: 'Complete',
    },
    {
      id: 3,
      title: 'Equipment Maintenance Log',
      type: 'Maintenance',
      period: 'December 2024',
      generated: '2024-12-26 14:20',
      size: '0.9 MB',
      status: 'Complete',
    },
    {
      id: 4,
      title: 'Emergency Response Times',
      type: 'Analytics',
      period: 'Last 7 Days',
      generated: '2024-12-28 09:15',
      size: '1.2 MB',
      status: 'Processing',
    },
  ];

  const stats = {
    totalRescues: 47,
    averageResponseTime: '12.5 min',
    successRate: 98.5,
    teamsDeployed: 15,
  };

  const monthlyData = [
    { month: 'Aug', rescues: 35, responseTime: 14.2 },
    { month: 'Sep', rescues: 42, responseTime: 13.8 },
    { month: 'Oct', rescues: 38, responseTime: 12.9 },
    { month: 'Nov', rescues: 41, responseTime: 12.1 },
    { month: 'Dec', rescues: 47, responseTime: 12.5 },
  ];

  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and view rescue operation reports</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={rescueReportOpen} onOpenChange={setRescueReportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Rescue Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Rescue Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user-name">User Name *</Label>
                  <Input 
                    id="user-name"
                    placeholder="Enter user name"
                    value={rescueForm.userName}
                    onChange={(e) => setRescueForm({...rescueForm, userName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location"
                    placeholder="Enter location" 
                    value={rescueForm.location}
                    onChange={(e) => setRescueForm({...rescueForm, location: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="dd-mm-yyyy"
                    value={rescueForm.date}
                    onChange={(e) => setRescueForm({...rescueForm, date: e.target.value})}
                  />
                  <Input 
                    placeholder="--:--"
                    value={rescueForm.time}
                    onChange={(e) => setRescueForm({...rescueForm, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Enter additional notes..."
                    value={rescueForm.notes}
                    onChange={(e) => setRescueForm({...rescueForm, notes: e.target.value})}
                  />
                </div>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload rescue photo
                </Button>
                <Button variant="outline" className="w-full">Choose File</Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    if (rescueForm.userName && rescueForm.location) {
                      toast.success("Rescue report submitted!", {
                        description: "Report has been saved and processed."
                      });
                      setRescueForm({userName: '', location: '', date: '', time: '', notes: ''});
                      setRescueReportOpen(false);
                    } else {
                      toast.error("Please fill in required fields");
                    }
                  }}
                >
                  Submit Rescue Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rescues</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRescues}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.averageResponseTime}</p>
                <p className="text-sm text-green-600">-0.4 min improvement</p>
              </div>
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.successRate}%</p>
                <Progress value={stats.successRate} className="mt-2" />
              </div>
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Teams Deployed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.teamsDeployed}</p>
                <p className="text-sm text-blue-600">Across all zones</p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Rescue Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 w-8">{data.month}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.rescues / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{data.rescues}</p>
                    <p className="text-xs text-gray-500">{data.responseTime} min avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { team: 'Alpha-1', missions: 12, success: 100 },
                { team: 'Alpha-2', missions: 10, success: 90 },
                { team: 'Beta-1', missions: 15, success: 93 },
                { team: 'Marine-3', missions: 8, success: 100 },
              ].map((team, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{team.team}</p>
                    <p className="text-sm text-gray-600">{team.missions} missions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{team.success}%</p>
                    <Progress value={team.success} className="w-20 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{report.type}</Badge>
                      <span className="text-sm text-gray-500">{report.period}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <Badge 
                      className={report.status === 'Complete' ? 
                        'bg-green-100 text-green-700 hover:bg-green-100' : 
                        'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                      }
                    >
                      {report.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{report.generated}</p>
                  </div>
                  <Button variant="outline" size="sm" disabled={report.status !== 'Complete'}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}