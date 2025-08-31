import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar_rescue';
import { Dashboard } from '@/components/Dashboard.jsx';
import { EmergencyMap } from '@/components/EmergencyMap';
import { TeamManagement } from '@/components/TeamManagement'
import { AlertSystem } from '@/components/AlertSystem';
import { Reports } from '@/components/Reports_resqque';
import { RescueArchive } from '@/components/RescueArchive';


export function WebRescueDashboard() {
  const [activeView, setActiveView] = useState('control-center');

  const renderContent = () => {
    switch (activeView) {
      case 'control-center':
        return <Dashboard />;
      case 'emergency-map':
        return <EmergencyMap />;
      case 'team-management':
        return <TeamManagement />;
      case 'alert-system':
        return <AlertSystem />;
      case 'reports':
        return <Reports />;
      case 'rescue-archive':
        return <RescueArchive />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      
    </div>
  );
}