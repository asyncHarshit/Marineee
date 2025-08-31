import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallBack';
import { Waves, Eye, EyeOff, ArrowLeft, Mail, Lock, User,Phone, Building } from 'lucide-react';
import { backend_url } from '@/BackendUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {requestFCMToken} from "../utils/firebaseConfig.js"

export function SignUp({ onNavigate }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    password: '',
    role: '',
    language: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletterOptIn: false
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
    confirmPassword: "",
    role: "",
    language: "",
    acceptTerms: "",
    newsletterOptIn: "",
  });

  const validateForm = () => {
    const newErrors = {...errors};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.userType) newErrors.userType = 'Please select your user type';
    if (!formData.role) newErrors.role = 'Please select your role';
    if (!formData.language) newErrors.language = 'Please select your language';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).every(e=>!e);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Backend URL:', backend_url);

  if (!validateForm()) {
    try {
      // get FCM token first
      const token = await requestFCMToken();
      console.log("FCM Token:", token);

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phone,
        language: formData.language,
        fcmToken: token || null,   // ✅ added FCM token field
      };

      console.log('Signup attempt:', payload);

      const response = await axios.post(`${backend_url}/api/auth/signup`, payload);

      console.log('Signup response:', response);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (response.status === 201) {
        if (payload.role === "citizen") {
          navigate("/citizen-webdashboard");
        } else if (payload.role === "authority") {
          navigate("/gov-webdashboard");
        } else if (payload.role === "rescue_team") {
          navigate("/rescue-webdashboard");
        } else {
          navigate("/webanalyst-dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      console.error('Signup error:', error);
    }
  }
};


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Ocean Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1746470427686-4c3551f3d689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRhdGElMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjMxMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ocean technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-600/60"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Waves className="w-6 h-6" />
              </div>
              <span className="text-2xl font-semibold">MarineVoice</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Join the Ocean Conservation Community
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Become part of our global network protecting marine ecosystems through collaborative intelligence and data-driven action.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-gradient-to-br from-blue-50 to-white">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="mx-auto w-full max-w-sm">
          <Card className="shadow-2xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center text-gray-900">
                Create your account
              </CardTitle>
              <p className="text-sm text-center text-gray-600">
                Join our mission to protect marine ecosystems worldwide
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* phone number */}
                <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Phone number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>


                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700">Role</Label>
                  <Select value={formData.role} onValueChange={(v) => handleInputChange('role', v)}>
                    <SelectTrigger className={`rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    }`}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">Citizen</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="authority">Authority</SelectItem>
                      <SelectItem value="rescue_team">Rescue Team</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700">Preferred language</Label>
                  <Select value={formData.language} onValueChange={(v) => handleInputChange('language', v)}>
                    <SelectTrigger className={`rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.language ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    }`}>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="malayalam">Malayalam</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.language && <p className="text-sm text-red-600">{errors.language}</p>}
                </div>

                

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
                

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl py-3 shadow-lg">
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
