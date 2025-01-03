import React from 'react';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface ProfileHeaderProps {
  name: string;
  level: number;
  preferredSide: string;
}

export function ProfileHeader({ name, level, preferredSide }: ProfileHeaderProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative">
      <div className="flex justify-between mb-4">
        <Link 
          to="/ranking-profile" 
          className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 hover:bg-gray-50"
        >
          See Ranking Profile
        </Link>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {/* Add profile image here if available */}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-red-900 text-white rounded-full">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        
        <h1 className="mt-4 text-4xl font-bold text-gray-900">{name}</h1>
        <p className="text-gray-600">{level} • {preferredSide}</p>
      </div>
    </div>
  );
}