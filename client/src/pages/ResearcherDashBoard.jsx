import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  BarChart3, Download, Filter, TrendingUp, Database, FileText, 
  CheckCircle, Circle, MapPin, MessageSquare, 
  Users, AlertTriangle, Globe, Eye
} from 'lucide-react';

export default function ResearcherDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          <span className="font-medium">Analyst Hub</span>
        </div>
        <Button variant="ghost" size="sm" className="text-white p-1 h-auto">
          <Download className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Data Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-white border-0 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Data Points</p>
                <p className="text-lg font-medium">15,847</p>
                <p className="text-xs text-green-600">+12% this week</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-3 bg-white border-0 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Locations</p>
                <p className="text-lg font-medium">342</p>
                <p className="text-xs text-blue-600">Coastal areas</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Google Earth Engine Map */}
        <Card className="h-48 bg-gradient-to-br from-blue-200 to-green-300 border-0 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge className="bg-white/90 text-blue-900 border-0 rounded-full">
              Google Earth Engine Map
            </Badge>
            <div className="flex gap-1">
              <Button size="sm" variant="secondary" className="bg-white/90 text-blue-900 border-0 rounded-full text-xs">
                Satellite
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/90 text-green-900 border-0 rounded-full text-xs">
                Gap Dataset
              </Button>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Earth Engine Analysis Active</span>
              </div>
              <Button size="sm" variant="secondary" className="bg-white/90 text-blue-900 border-0 rounded-full text-xs">
                Overlay Layers
              </Button>
            </div>
          </div>
          {/* Map grid overlay */}
          <div className="absolute inset-6 opacity-40">
            <div className="grid grid-cols-6 grid-rows-4 gap-1 h-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm ${
                    i % 3 === 0 ? 'bg-blue-400/60' : 
                    i % 3 === 1 ? 'bg-green-400/60' : 'bg-blue-300/60'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </Card>

        {/* Past Dataset Timeline */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Gap Satellite Imagery</h3>
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant={selectedDateRange === '7d' ? 'default' : 'outline'} 
                className="text-xs rounded-full"
                onClick={() => setSelectedDateRange('7d')}
              >
                7D
              </Button>
              <Button 
                size="sm" 
                variant={selectedDateRange === '30d' ? 'default' : 'outline'} 
                className="text-xs rounded-full"
                onClick={() => setSelectedDateRange('30d')}
              >
                30D
              </Button>
              <Button 
                size="sm" 
                variant={selectedDateRange === '90d' ? 'default' : 'outline'} 
                className="text-xs rounded-full"
                onClick={() => setSelectedDateRange('90d')}
              >
                90D
              </Button>
            </div>
          </div>
          <div className="h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-blue-200 rounded-full relative">
                <div className="absolute left-0 top-0 w-3/4 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                <div className="absolute left-1/4 top-0 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-0.5"></div>
                <div className="absolute left-1/2 top-0 w-2 h-2 bg-green-600 rounded-full transform -translate-y-0.5"></div>
                <div className="absolute left-3/4 top-0 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-0.5"></div>
              </div>
            </div>
            <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500">
              <span>Jan 2024</span>
              <span>Mar 2024</span>
              <span>Jun 2024</span>
              <span>Dec 2024</span>
            </div>
          </div>
        </Card>

        {/* Social Media Insights */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Social Media Insights</h3>
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-xl">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  📰
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Marine sanctuary expansion approved</p>
                  <p className="text-xs text-gray-400">Twitter • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-red-50 rounded-xl">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                  🚨
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Oil spill concerns in coastal waters</p>
                  <p className="text-xs text-gray-400">News Feed • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-green-50 rounded-xl">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  💬
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Community discusses whale migration</p>
                  <p className="text-xs text-gray-400">Forum • 6 hours ago</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Data Validation Workflow */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <h3 className="text-gray-800 font-medium mb-4">Data Validation Workflow</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Data Collected</p>
                <p className="text-xs text-green-600">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Authentic Source Check</p>
                <p className="text-xs text-green-600">Verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <Circle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Cross Verification</p>
                <p className="text-xs text-yellow-600">In Progress</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <Circle className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Report Generated</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Reports & Actions */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <h3 className="text-gray-800 font-medium mb-4">Reports & Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <Button className="h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md">
              <CheckCircle className="w-4 h-4" />
              Validate Data
            </Button>
            <Button className="h-12 bg-green-700 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md">
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
            <Button className="h-12 bg-purple-700 hover:bg-purple-600 text-white rounded-2xl flex items-center justify-center gap-2 shadow-md">
              <Download className="w-4 h-4" />
              Export Findings
            </Button>
          </div>
        </Card>

        {/* Recent Analysis */}
        <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
          <h3 className="text-gray-800 font-medium mb-3">Recent Analysis</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-gray-700">Satellite gap analysis completed for Q4</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-gray-700">Cross-validation with ground truth data</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <p className="text-sm text-gray-700">Social media sentiment analysis updated</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
