import React, { useState } from 'react';

import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DashboardSection } from '../components/DashboardSection';
import { EarthEngineSection } from '../components/EarthEngineSection';
import { DatasetsSection } from '../components/DatasetsSection';
import { SocialInsightsSection } from '../components/SocialInsightsSection';
import { ReportsSection } from '../components/ReportsSection';
import { ArchiveSection } from '../components/ArchiveSection';
import VideoCall from '@/components/VideoCall';

export function WebAnalystDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'earth-engine':
        return <EarthEngineSection />;
      case 'datasets':
        return <DatasetsSection />;
      case 'social-insights':
        return <SocialInsightsSection />;
      case 'reports':
        return <ReportsSection />;
      case 'archive':
        return <ArchiveSection />;
      case 'videoMeeting':
        return <VideoCall/>;  
      
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background shadow-sm">
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
