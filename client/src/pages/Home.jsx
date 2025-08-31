import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallBack';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  ChevronDown, 
  Waves, 
  Globe, 
  AlertTriangle, 
  Database, 
  LifeBuoy, 
  Users, 
  Building, 
  BarChart3, 
  Shield,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} />;
  }

  if (currentPage === 'signup') {
    return <SignUp onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigate('landing')}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MarineVoice</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              
              {/* Dashboards Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Dashboards</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <a href="#citizen" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Citizen Dashboard
                    </a>
                    <a href="#gov" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Government Dashboard
                    </a>
                    <a href="#analyst" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Analyst Dashboard
                    </a>
                    <a href="#rescue" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Rescue Team Dashboard
                    </a>
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => handleNavigate('login')}
              >
                Citizen Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                onClick={() => handleNavigate('signup')}
              >
                Dashboard Access
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1736725502836-9ca5d3a44870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwYmx1ZSUyMGdyYWRpZW50fGVufDF8fHx8MTc1NjMxMDE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Ocean waves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-600/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Protecting Our Oceans with
            <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Advanced Marine Intelligence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            MarineVoice combines satellite data, AI analytics, and real-time monitoring to safeguard marine ecosystems and support coastal communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl px-8 py-3 rounded-xl"
              onClick={() => handleNavigate('signup')}
            >
              Explore Dashboards
            </Button>
            <Button size="lg" variant="outline" className="border-white text-gray-500 hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Marine Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools provides real-time insights and actionable intelligence for marine conservation and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Earth Engine */}
            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Earth Engine</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced satellite imagery analysis powered by Google Earth Engine for comprehensive ocean monitoring.
                </p>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Alerts</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time notifications for environmental threats, illegal fishing, and emergency situations.
                </p>
              </CardContent>
            </Card>

            {/* Data */}
            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marine Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive database of ocean conditions, species tracking, and environmental indicators.
                </p>
              </CardContent>
            </Card>

            {/* Rescue */}
            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <LifeBuoy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Rescue Coordination</h3>
                <p className="text-gray-600 leading-relaxed">
                  Emergency response coordination with real-time location tracking and resource deployment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboards, Impact, Footer sections remain the same */}
      {/* You can copy-paste the remaining JSX as-is from your original TSX */}
            <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Specialized Dashboards for Every User
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Access tailored interfaces designed for different stakeholders in marine conservation and safety.
                  </p>
                </div>
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Citizen Dashboard */}
                  <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1580380598019-c6938e4b9399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBlYXJ0aCUyMG9jZWFufGVufDF8fHx8MTc1NjMxMDE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Earth from space"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-blue-700/50"></div>
                      <Users className="absolute top-4 right-4 w-8 h-8 text-white" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Citizen Dashboard</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Report marine incidents, access local ocean conditions, and contribute to community-driven conservation efforts.
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl"
                        onClick={() => handleNavigate('signup')}
                      >
                        Explore Citizen Tools
                      </Button>
                    </CardContent>
                  </Card>
      
                  {/* Government Dashboard */}
                  <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1746470427686-4c3551f3d689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRhdGElMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjMxMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Ocean technology"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/50 to-emerald-700/50"></div>
                      <Building className="absolute top-4 right-4 w-8 h-8 text-white" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Government Dashboard</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Policy insights, regulatory compliance monitoring, and comprehensive environmental impact assessments.
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl"
                        onClick={() => handleNavigate('signup')}
                      >
                        Explore Gov Tools
                      </Button>
                    </CardContent>
                  </Card>
      
                  {/* Analyst Dashboard */}
                  <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-600 relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1746470427686-4c3551f3d689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRhdGElMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjMxMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Data analysis"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-indigo-700/50"></div>
                      <BarChart3 className="absolute top-4 right-4 w-8 h-8 text-white" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Analyst Dashboard</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Advanced analytics, predictive modeling, and comprehensive data visualization for research and insights.
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 rounded-xl"
                        onClick={() => handleNavigate('signup')}
                      >
                        Explore Analytics
                      </Button>
                    </CardContent>
                  </Card>
      
                  {/* Rescue Team Dashboard */}
                  <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-red-400 to-orange-600 relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1691327510183-5b856f21d8bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjByZXNjdWUlMjBib2F0fGVufDF8fHx8MTc1NjMxMDE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Marine rescue boat"
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 to-orange-700/50"></div>
                      <Shield className="absolute top-4 right-4 w-8 h-8 text-white" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Rescue Team Dashboard</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Emergency response coordination, real-time tracking, and resource management for marine rescue operations.
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800 rounded-xl"
                        onClick={() => handleNavigate('signup')}
                      >
                        Explore Rescue Tools
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
      
            {/* Impact Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Making a Global Impact
                  </h2>
                  <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                    Our platform is actively protecting marine ecosystems and supporting communities worldwide.
                  </p>
                </div>
      
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">2.3M</div>
                    <div className="text-blue-200">Square kilometers monitored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">15K+</div>
                    <div className="text-blue-200">Active users globally</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                    <div className="text-blue-200">Rescue operations assisted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                    <div className="text-blue-200">Threat detection accuracy</div>
                  </div>
                </div>
            </div>
        </section>
      
            {/* Footer */}
        <footer className="bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* About */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <Waves className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-semibold">MarineVoice</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Protecting our oceans through advanced marine intelligence and collaborative conservation efforts.
                    </p>
                    <div className="flex space-x-4">
                      <FaFacebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                      <FaTwitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                      <FaLinkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                      <FaInstagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                    </div>
                  </div>
      
                  {/* Quick Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboards</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Research</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">News</a></li>
                    </ul>
                  </div>
      
                  {/* Help */}
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Help & Support</h3>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Reference</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                  </div>
      
                  {/* Contact */}
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300">contact@marinevoice.org</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300">
                          Ocean Conservation Center<br />
                          1234 Marine Drive<br />
                          Coastal City, CA 90210
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="border-t border-gray-700 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                      © 2025 MarineVoice. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">
                      Built with care for our oceans 🌊
                    </p>
                  </div>
                </div>
              </div>
        </footer>
    </div>
  );
}
