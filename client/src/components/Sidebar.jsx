import React, { useState } from 'react';
import { BarChart3, Database, Home, Globe, Users, FileText, Archive, CheckCircle, Download, FileOutput, Video } from 'lucide-react';
import { Button } from './ui/button';
import { QuickActionModals } from './QuickActionModals';

export function Sidebar({ activeSection, onSectionChange }) {
  const [activeModal, setActiveModal] = useState(null);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'earth-engine', label: 'Earth Engine', icon: Globe },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'social-insights', label: 'Social Insights', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'archive', label: 'Archive', icon: Archive },
    {id : 'videoMeeting' , label : "Video Meeting" , icon : Video}
  ];

  const quickActions = [
    { id: 'validate', label: 'Validate Data', icon: CheckCircle, color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'generate', label: 'Generate Report', icon: FileOutput, color: 'bg-green-600 hover:bg-green-700' },
    { id: 'export', label: 'Export Findings', icon: Download, color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Analyst Hub</h1>
            <p className="text-sm text-gray-500">Data Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="default"
                size="sm"
                className={`w-full justify-start ${action.color} text-white shadow-sm`}
                onClick={() => setActiveModal(action.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
      
      <QuickActionModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
}
