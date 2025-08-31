import React, { useState } from 'react';
import { Shield, Radio, Map, Users, AlertTriangle, FileText, Archive, Send, AlertCircle, FileBarChart } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner';



export function Sidebar({ activeView, setActiveView }) {
  const [deployTeamOpen, setDeployTeamOpen] = useState(false);
  const [sendAlertOpen, setSendAlertOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);

  const navigationItems = [
    { id: 'control-center', label: 'Control Center', icon: Shield },
    { id: 'emergency-map', label: 'Emergency Map', icon: Map },
    { id: 'team-management', label: 'Team Management', icon: Users },
    { id: 'alert-system', label: 'Alert System', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'rescue-archive', label: 'Rescue Archive', icon: Archive },
  ];

  const emergencyActions = [
    { id: 'deploy-team', label: 'Deploy Team', icon: Users, color: 'bg-blue-600', action: () => setDeployTeamOpen(true) },
    { id: 'send-alert', label: 'Send Alert', icon: Send, color: 'bg-red-600', action: () => setSendAlertOpen(true) },
    { id: 'generate-report', label: 'Generate Report', icon: FileBarChart, color: 'bg-gray-600', action: () => setGenerateReportOpen(true) },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Rescue Control</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Emergency Actions */}
        <div className="mt-8">
          <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Emergency Actions
          </h3>
          <div className="space-y-2">
            {emergencyActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  onClick={action.action}
                  className={`w-full justify-start ${action.color} hover:opacity-90 text-white`}
                  size="sm"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deploy Team Dialog */}
      <Dialog open={deployTeamOpen} onOpenChange={setDeployTeamOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy Emergency Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergency-location">Emergency Location</Label>
              <Input id="emergency-location" placeholder="Enter location coordinates or address" />
            </div>
            <div>
              <Label htmlFor="team-select">Select Team</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose available team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alpha-1">Alpha Team 1 - Available</SelectItem>
                  <SelectItem value="beta-1">Beta Team 1 - Available</SelectItem>
                  <SelectItem value="marine-4">Marine Unit 4 - Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="emergency-type">Emergency Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water-rescue">Water Rescue</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="fire">Fire Emergency</SelectItem>
                  <SelectItem value="search-rescue">Search & Rescue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Life Threatening</SelectItem>
                  <SelectItem value="medium">Medium - Urgent</SelectItem>
                  <SelectItem value="low">Low - Non-urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional information..." />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                toast.success("Team deployed successfully!", {
                  description: "Emergency response team is en route to location."
                });
                setDeployTeamOpen(false);
              }}
            >
              Deploy Team Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Alert Dialog */}
      <Dialog open={sendAlertOpen} onOpenChange={setSendAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Emergency Alert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="alert-type">Alert Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Alert</SelectItem>
                  <SelectItem value="weather">Weather Warning</SelectItem>
                  <SelectItem value="evacuation">Evacuation Notice</SelectItem>
                  <SelectItem value="all-clear">All Clear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alert-zone">Target Zone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zone-a">Zone A - North Beach</SelectItem>
                  <SelectItem value="zone-b">Zone B - South Bay</SelectItem>
                  <SelectItem value="zone-c">Zone C - Marina</SelectItem>
                  <SelectItem value="all-zones">All Zones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alert-message">Alert Message</Label>
              <Textarea 
                id="alert-message" 
                placeholder="Enter emergency alert message..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="alert-priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => {
                toast.success("Emergency alert sent!", {
                  description: "Alert has been broadcast to all teams and zones."
                });
                setSendAlertOpen(false);
              }}
            >
              Send Alert Immediately
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={generateReportOpen} onOpenChange={setGenerateReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Emergency Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incident">Incident Report</SelectItem>
                  <SelectItem value="operational">Operational Summary</SelectItem>
                  <SelectItem value="performance">Performance Analysis</SelectItem>
                  <SelectItem value="maintenance">Equipment Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="include-teams">Include Teams</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="alpha">Alpha Teams Only</SelectItem>
                  <SelectItem value="beta">Beta Teams Only</SelectItem>
                  <SelectItem value="marine">Marine Units Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="report-format">Report Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full bg-gray-600 hover:bg-gray-700"
              onClick={() => {
                toast.success("Report generated successfully!", {
                  description: "Emergency report is ready for download."
                });
                setGenerateReportOpen(false);
              }}
            >
              Generate Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}