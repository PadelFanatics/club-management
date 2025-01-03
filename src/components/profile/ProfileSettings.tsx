import React from 'react';
import { Edit2 } from 'lucide-react';

interface ProfileSettingsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: number;
  preferredSide: string;
  startedPlaying: string;
  onEdit: () => void;
}

export function ProfileSettings({
  firstName,
  lastName,
  email,
  phone,
  level,
  preferredSide,
  startedPlaying,
  onEdit
}: ProfileSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">PERSONAL INFORMATION</h2>
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">FIRST NAME</span>
          <span className="text-gray-600">{firstName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">LAST NAME</span>
          <span className="text-gray-600">{lastName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">EMAIL</span>
          <span className="text-gray-600">{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">PHONE NUMBER</span>
          <span className="text-gray-600">{phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">LEVEL</span>
          <span className="text-gray-600">{level}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Preferred Side</span>
          <span className="text-gray-600">{preferredSide}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Started Playing</span>
          <span className="text-gray-600">{startedPlaying}</span>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button className="text-red-600 hover:text-red-700">
          Delete Account
        </button>
        <button className="text-gray-600 hover:text-gray-700">
          Change Password
        </button>
      </div>
    </div>
  );
}