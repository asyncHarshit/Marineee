import React, { useState } from 'react';
import { CheckCircle, FileOutput, Download, MapPin, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

export function QuickActionModals({ activeModal, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    dataSource: '',
    dateRange: '',
    reportType: '',
    exportFormat: '',
    includeCharts: false,
    includeRawData: false,
    recipientEmail: '',
    description: ''
  });

  const handleSubmit = async (action) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (action) {
      case 'validate':
        toast.success('Data validation completed successfully! 87% accuracy rate maintained.');
        break;
      case 'generate':
        toast.success('Report generated successfully! Check your downloads folder.');
        break;
      case 'export':
        toast.success('Data export completed! Findings exported to selected format.');
        break;
    }
    
    setIsProcessing(false);
    onClose();
  };

  const validateDataModal = (
    <Dialog open={activeModal === 'validate'} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Validate Data</span>
          </DialogTitle>
          <DialogDescription>
            Configure data validation parameters for quality assurance checks.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="dataSource">Data Source</Label>
            <Select value={formData.dataSource} onValueChange={(value) => setFormData({...formData, dataSource: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">Satellite Imagery</SelectItem>
                <SelectItem value="earth-engine">Earth Engine</SelectItem>
                <SelectItem value="gap-dataset">Gap Dataset</SelectItem>
                <SelectItem value="all">All Sources</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={formData.dateRange} onValueChange={(value) => setFormData({...formData, dateRange: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeCharts" 
              checked={formData.includeCharts}
              onCheckedChange={(checked) => setFormData({...formData, includeCharts: checked})}
            />
            <Label htmlFor="includeCharts">Include visual validation charts</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={() => handleSubmit('validate')} 
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? 'Validating...' : 'Start Validation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const generateReportModal = (
    <Dialog open={activeModal === 'generate'} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileOutput className="w-5 h-5 text-green-600" />
            <span>Generate Report</span>
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive analysis report with your selected parameters.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <Select value={formData.reportType} onValueChange={(value) => setFormData({...formData, reportType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Executive Summary</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="technical">Technical Report</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Report Description</Label>
            <Textarea 
              id="description"
              placeholder="Enter report description or special requirements..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="recipientEmail">Email (Optional)</Label>
            <Input 
              id="recipientEmail"
              type="email"
              placeholder="recipient@example.com"
              value={formData.recipientEmail}
              onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={() => handleSubmit('generate')} 
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? 'Generating...' : 'Generate Report'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const exportFindingsModal = (
    <Dialog open={activeModal === 'export'} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-purple-600" />
            <span>Export Findings</span>
          </DialogTitle>
          <DialogDescription>
            Export your analysis findings in your preferred format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="exportFormat">Export Format</Label>
            <Select value={formData.exportFormat} onValueChange={(value) => setFormData({...formData, exportFormat: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="json">JSON (JavaScript Object)</SelectItem>
                <SelectItem value="pdf">PDF (Portable Document)</SelectItem>
                <SelectItem value="geojson">GeoJSON (Geographic Data)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Include in Export</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeRawData" 
                checked={formData.includeRawData}
                onCheckedChange={(checked) => setFormData({...formData, includeRawData: checked})}
              />
              <Label htmlFor="includeRawData">Raw data points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeChartsExport" 
                checked={formData.includeCharts}
                onCheckedChange={(checked) => setFormData({...formData, includeCharts: checked})}
              />
              <Label htmlFor="includeChartsExport">Visualizations and charts</Label>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>342 Locations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <Users className="w-4 h-4" />
              <span>15,847 Data Points</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={() => handleSubmit('export')} 
            disabled={isProcessing}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? 'Exporting...' : 'Export Data'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {validateDataModal}
      {generateReportModal}
      {exportFindingsModal}
    </>
  );
}
