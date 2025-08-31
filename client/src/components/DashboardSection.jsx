import React from 'react';
import { MetricsCards } from './MetricsCards';
import { MapVisualization } from './MapVisualization';
import { TimelineChart } from './TimelineChart';
import {SocialInsights }from './SocialInsights';
import { ReportsActions } from './ReportsActions';
import { RecentAnalysis } from './RecentAnalysis';

export function DashboardSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        <MetricsCards />
        <MapVisualization />
        <TimelineChart />
      </div>
      
      {/* Right Sidebar */}
      <div className="space-y-6">
        <SocialInsights/>
        <ReportsActions />
        <RecentAnalysis />
      </div>
    </div>
  );
}