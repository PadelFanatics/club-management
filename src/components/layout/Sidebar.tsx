import React from 'react';
import { 
  LayoutGrid, 
  CalendarDays, 
  Users, 
  Trophy,
  Settings,
  ChevronRight,
  Building2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

export function Sidebar() {
  const location = useLocation();
  
  const menuItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/' },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/bookings' },
    { id: 'members', label: 'Members', icon: Users, path: '/members' },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy, path: '/tournaments' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="w-64 bg-red-900 text-white h-screen fixed left-0 top-0">
      {/* Logo/Header */}
      <div className="p-6 border-b border-red-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-red-900" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Padel Manager</h1>
            <div className="text-sm text-red-200">Administration</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center px-6 py-3 text-sm transition-colors ${
                isActive 
                  ? 'bg-red-950 border-l-4 border-white' 
                  : 'hover:bg-red-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          );
        })}
      </nav>

      {/* Version Info */}
      <div className="absolute bottom-0 left-0 w-64 p-4 bg-red-950">
        <div className="flex items-center justify-between text-sm text-red-200">
          <span>Version 1.0.0</span>
          <Settings className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}