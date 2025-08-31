import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function TimelineChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const periods = [
    { id: '7', label: '7 days' },
    { id: '30', label: '30 days' },
    { id: '90', label: '90 days' }
  ];

  // Generate sample data based on selected period
  const generateData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        imagery: Math.floor(Math.random() * 50) + 20,
        gaps: Math.floor(Math.random() * 20) + 5,
        processed: Math.floor(Math.random() * 80) + 40
      });
    }
    
    return data;
  };

  // Load data when component mounts or period changes
  useEffect(() => {
    loadData();
  }, [selectedPeriod]);

  const loadData = async () => {
    setIsLoading(true);
    toast.info(`Loading ${selectedPeriod} days of satellite imagery data...`);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newData = generateData(parseInt(selectedPeriod));
    setData(newData);
    setIsLoading(false);
    
    toast.success(`Timeline updated with ${selectedPeriod} days of data`);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Gap Satellite Imagery Timeline</h3>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {periods.map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period.id)}
                disabled={isLoading}
                className={`${isLoading ? "opacity-50" : ""} ${selectedPeriod === period.id ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-gray-300 hover:bg-gray-50"}`}
              >
                {isLoading && selectedPeriod === period.id && (
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                )}
                {period.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 w-full relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-600">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Updating timeline data...</span>
              </div>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorImagery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Area
                type="monotone"
                dataKey="processed"
                stackId="1"
                stroke="#9333EA"
                fillOpacity={1}
                fill="url(#colorProcessed)"
              />
              <Area
                type="monotone"
                dataKey="imagery"
                stackId="1"
                stroke="#2563EB"
                fillOpacity={1}
                fill="url(#colorImagery)"
              />
              <Area
                type="monotone"
                dataKey="gaps"
                stackId="1"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#colorGaps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Satellite Imagery</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Gap Coverage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Processed Data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
