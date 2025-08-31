import React from 'react';
import { Activity, Eye, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

export function RecentAnalysis() {
  const analyses = [
    {
      id: 1,
      title: 'Coastal Erosion Analysis',
      type: 'Earth Engine',
      status: 'completed',
      accuracy: '94.2%',
      time: '3 hours ago',
      dataPoints: '2.1K'
    },
    {
      id: 2,
      title: 'Forest Cover Change',
      type: 'Satellite',
      status: 'processing',
      accuracy: '87.8%',
      time: '5 hours ago',
      dataPoints: '1.8K'
    },
    {
      id: 3,
      title: 'Water Quality Assessment',
      type: 'Multi-source',
      status: 'completed',
      accuracy: '91.5%',
      time: '1 day ago',
      dataPoints: '3.2K'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'processing': return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>;
      case 'failed': return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Recent Analysis</h3>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {analyses.map((analysis) => (
          <div 
            key={analysis.id} 
            className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(analysis.status)}
                <h4 className="font-medium text-gray-900 text-sm">{analysis.title}</h4>
              </div>
              <Badge variant="outline" className={`text-xs ${getStatusColor(analysis.status)}`}>
                {analysis.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{analysis.type}</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3" />
                <span>{analysis.accuracy}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{analysis.dataPoints} points</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{analysis.time}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Analysis →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
