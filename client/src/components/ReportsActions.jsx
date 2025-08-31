import React, { useState } from 'react';
import { CheckCircle, FileText, Download, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

export function ReportsActions() {
  const [isValidating, setIsValidating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);

  const handleValidateData = async () => {
    setIsValidating(true);
    setValidationProgress(0);
    
    toast.info('Starting data validation...');
    
    // Simulate validation progress
    const interval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          toast.success('Data validation completed successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    toast.info('Generating comprehensive report...');
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  const handleExportFindings = async () => {
    setIsExporting(true);
    toast.info('Preparing export package...');
    
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Export completed! Downloaded to your device.');
    }, 1500);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Reports & Actions</h3>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Validate Data */}
        <div className="space-y-2">
          <Button
            onClick={handleValidateData}
            disabled={isValidating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isValidating ? 'Validating...' : 'Validate Data'}
          </Button>
          {isValidating && (
            <div className="space-y-1">
              <Progress value={validationProgress} className="h-2" />
              <p className="text-xs text-gray-500 text-center">{validationProgress}% complete</p>
            </div>
          )}
        </div>

        {/* Generate Report */}
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm rounded-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>

        {/* Export Findings */}
        <Button
          onClick={handleExportFindings}
          disabled={isExporting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm rounded-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Findings'}
        </Button>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Last Validation</span>
            </div>
            <span className="text-gray-900 font-medium">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              {/* <Calendar className="w-4 h-4 text-gray-400" /> */}
              <span className="text-gray-600">Next Scheduled</span>
            </div>
            <span className="text-gray-900 font-medium">Tomorrow 9:00 AM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}