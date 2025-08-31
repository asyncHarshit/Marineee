import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallBack';
import { Waves, Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { backend_url } from '@/BackendUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { el } from 'date-fns/locale';

export function Login({ onNavigate }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    rememberMe:false
    });
  const validateForm = () => {
    const newErrors = {...errors};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Handle login logic here
      console.log('Login attempt:', formData);
      await axios.post(`${backend_url}/api/auth/login`, formData)
      .then(response => {
        if(response.status == 201){
        localStorage.setItem("user", JSON.stringify(response.data.user));
          if(response.data.user.role == 'citizen'){
            navigate("/citizen-webdashboard")
          }else if (response.data.user.role == "authority") {
            navigate("/gov-webdashboard");
          } else if (response.data.user.role == "rescue_team") {
            navigate("/rescue-webdashboard");
          } else {
            navigate("/webanalyst-dashboard");
          }
        }else{
          toast.error('Login failed. Please check your credentials.');
        }
      })
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Ocean Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1736725502836-9ca5d3a44870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwYmx1ZSUyMGdyYWRpZW50fGVufDF8fHx8MTc1NjMxMDE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ocean waves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-600/60"></div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Waves className="w-6 h-6" />
              </div>
              <span className="text-2xl font-semibold">MarineVoice</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome Back to Ocean Intelligence
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Continue protecting marine ecosystems with our advanced monitoring and analytics platform.
            </p>
          </div>
          
          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>Real-time marine data monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>Advanced threat detection algorithms</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>Collaborative conservation tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-gradient-to-br from-blue-50 to-white">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">MarineVoice</span>
          </div>

          <Card className="shadow-2xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl text-center text-gray-900">
                Sign in to your account
              </CardTitle>
              <p className="text-sm text-center text-gray-600">
                Enter your credentials to access your marine dashboard
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>

                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl py-3 shadow-lg"
                >
                  Sign in
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('signup')}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Sign up
                    </button>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
