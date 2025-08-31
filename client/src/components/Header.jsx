import React from 'react';
import { Search, Bell, Settings, Download, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Header({ searchQuery, onSearchChange }) {
  return (
  <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 shadow-sm">
  <div className="flex items-center justify-between">
    {/* Logo + Title */}
    <div className="flex items-center space-x-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Analyst Hub</h1>
        <p className="text-sm text-gray-500">Professional Analytics Dashboard</p>
      </div>
    </div>

    {/* Right Controls */}
    <div className="flex items-center space-x-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search datasets, reports..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-80 bg-gray-100/70 border border-gray-200 rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
      </div>

      {/* Action Buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition"
      >
        <Download className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition"
      >
        <Bell className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {/* Profile Avatar */}
      <Avatar className="w-9 h-9 ring-2 ring-gray-200 hover:ring-blue-400 transition">
        <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
        <AvatarFallback className="bg-blue-600 text-white text-sm">
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
</header>

  );
}
