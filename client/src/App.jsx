import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import { CitizenDashboard } from "./pages/CitizenDashBoard";
import { GovernmentDashboard } from "./pages/Government.Dashboard";
import { RescueDashboard } from "./pages/RescueDashBoard";
import ResearcherDashboard from "./pages/ResearcherDashBoard";
import { WebAnalystDashboard } from "./pages/WebAnalystDashBoard";
import { WebCitizenDashboard } from "./pages/WebCitizenDashBoard";
import { WebGovernmentDashboard } from "./pages/WebGovDashBoard";
import { WebRescueDashboard } from "./pages/WebRescueDashBoard";
import MyMap from "./pages/GoogleMap";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard/>}/>
        <Route path="/govt-dashboard" element={<GovernmentDashboard />} />
        <Route path="/rescue-dashboard" element={<RescueDashboard/>}/>
        <Route path="/researcher-dashboard" element={<ResearcherDashboard/>}/>
        <Route path="/webanalyst-dashboard" element={<WebAnalystDashboard/>}/>
        <Route path="/citizen-webdashboard" element={<WebCitizenDashboard/>}/>
        <Route path="/gov-webdashboard" element={<WebGovernmentDashboard/>}/>
        <Route path="/rescue-webdashboard" element={<WebRescueDashboard/>}/>
        <Route path="/map" element={<MyMap/>}/>
      </Routes>
    </>
  );
}
