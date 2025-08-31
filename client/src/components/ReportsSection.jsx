import React, { useState } from 'react';
import { FileText, Download, Eye, Filter, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Calendar } from '../ui/calendar';
import { toast } from 'sonner';

export function ReportsSection() {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const recentReports = [
    {
      id: 1,
      title: 'Marine Conservation Impact Analysis Q4 2024',
      type: 'Impact Assessment',
      generatedBy: 'System',
      dateGenerated: '2024-08-28',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed',
      views: 47,
      downloads: 12
    },
    {
      id: 2,
      title: 'Coastal Erosion Monitoring Report',
      type: 'Environmental',
      generatedBy: 'Dr. Sarah Chen',
      dateGenerated: '2024-08-27',
      size: '1.8 MB',
      format: 'PDF',
      status: 'completed',
      views: 23,
      downloads: 8
    },
    {
      id: 3,
      title: 'Social Media Sentiment Analysis - Weekly',
      type: 'Social Insights',
      generatedBy: 'System',
      dateGenerated: '2024-08-26',
      size: '856 KB',
      format: 'PDF',
      status: 'processing',
      views: 0,
      downloads: 0
    },
    {
      id: 4,
      title: 'Fisheries Data Validation Summary',
      type: 'Data Quality',
      generatedBy: 'Alex Rodriguez',
      dateGenerated: '2024-08-25',
      size: '3.1 MB',
      format: 'Excel',
      status: 'completed',
      views: 89,
      downloads: 34
    }
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Environmental Impact Assessment',
      description: 'Comprehensive analysis of environmental changes and their impact',
      estimatedTime: '15-20 minutes',
      dataSources: ['Satellite Imagery', 'Ground Sensors', 'Government Data']
    },
    {
      id: 2,
      name: 'Social Media Monitoring',
      description: 'Weekly summary of social media sentiment and engagement metrics',
      estimatedTime: '5-10 minutes',
      dataSources: ['Twitter API', 'Instagram API', 'Facebook API']
    },
    {
      id: 3,
      name: 'Data Quality Report',
      description: 'Analysis of data accuracy, completeness, and validation results',
      estimatedTime: '10-15 minutes',
      dataSources: ['All Active Datasets', 'Validation Logs']
    },
    {
      id: 4,
      name: 'Custom Analysis Report',
      description: 'Build your own report with selected datasets and metrics',
      estimatedTime: '20-30 minutes',
      dataSources: ['User Selected']
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

  const handleGenerateReport = (templateName) => {
    setIsGenerating(true);
    toast.info(`Generating ${templateName}...`);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generated successfully!');
    }, 3000);
  };

  const handleDownload = (reportTitle) => {
    toast.success(`Downloading ${reportTitle}...`);
  };

  const handleView = (reportTitle) => {
    toast.info(`Opening ${reportTitle} in viewer`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and manage analytical reports</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-gray-900">127</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">18</p>
                <p className="text-sm text-green-600">+23% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-semibold text-gray-900">2,847</p>
              </div>
              <Download className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Generation Time</p>
                <p className="text-2xl font-semibold text-gray-900">12m</p>
              </div>
              {/* <Calendar className="w-8 h-8 text-orange-600" /> */}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent Reports</h3>
                <div className="flex items-center space-x-2">
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="impact">Impact Assessment</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="social">Social Insights</SelectItem>
                      <SelectItem value="data">Data Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>Type: {report.type}</span>
                          <span>•</span>
                          <span>By: {report.generatedBy}</span>
                          <span>•</span>
                          <span>Generated: {report.dateGenerated}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Size: {report.size}</span>
                          <span>•</span>
                          <span>Format: {report.format}</span>
                          <span>•</span>
                          <span>{report.views} views</span>
                          <span>•</span>
                          <span>{report.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleView(report.title)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(report.title)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <Badge variant="outline">{template.estimatedTime}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{template.description}</p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Data Sources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.dataSources.map((source, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleGenerateReport(template.name)}
                    disabled={isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Report'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Scheduled Reports</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                {/* <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
                <h4 className="font-medium text-gray-900 mb-2">No Scheduled Reports</h4>
                <p className="text-gray-500 mb-4">Set up automated report generation to save time</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}