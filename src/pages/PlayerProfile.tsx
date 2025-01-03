import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { LoyaltyProgram } from '../components/profile/LoyaltyProgram';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { AuthForm } from '../components/auth/AuthForm';
import { useAppStore } from '../lib/store';

type View = 'upcoming' | 'past' | 'settings';

export function PlayerProfile() {
  const [activeView, setActiveView] = useState<View>('upcoming');
  const currentPlayer = useAppStore(state => state.currentPlayer);

  if (!currentPlayer) {
    return <AuthForm />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ProfileHeader
        name={currentPlayer.full_name}
        level={currentPlayer.ranking / 100} // Convert to 0-7 scale
        preferredSide={currentPlayer.preferred_side || 'Not set'}
      />

      <LoyaltyProgram hoursPlayed={1} />

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveView('upcoming')}
          className={`px-8 py-3 rounded-lg shadow-lg transition-colors ${
            activeView === 'upcoming'
              ? 'bg-red-950 text-white'
              : 'bg-red-900 text-white hover:bg-red-950'
          }`}
        >
          Upcoming Matches
        </button>
        <button
          onClick={() => setActiveView('past')}
          className={`px-8 py-3 rounded-lg shadow-lg transition-colors ${
            activeView === 'past'
              ? 'bg-red-950 text-white'
              : 'bg-red-900 text-white hover:bg-red-950'
          }`}
        >
          Past Matches
        </button>
        <button
          onClick={() => setActiveView('settings')}
          className={`px-8 py-3 rounded-lg shadow-lg transition-colors ${
            activeView === 'settings'
              ? 'bg-red-950 text-white'
              : 'bg-red-900 text-white hover:bg-red-950'
          }`}
        >
          Settings
        </button>
      </div>

      {activeView === 'settings' ? (
        <ProfileSettings
          firstName={currentPlayer.full_name.split(' ')[0]}
          lastName={currentPlayer.full_name.split(' ')[1] || ''}
          email={currentPlayer.email}
          phone={currentPlayer.phone || 'Not set'}
          level={currentPlayer.ranking / 100}
          preferredSide={currentPlayer.preferred_side || 'Not set'}
          startedPlaying="November 2019"
          onEdit={() => console.log('Edit profile')}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">
            {activeView === 'upcoming' ? 'Upcoming Matches' : 'Past Matches'}
          </h3>
          {/* Add match list component here */}
          <p className="text-gray-500 text-center py-4">
            No {activeView} matches found
          </p>
        </div>
      )}
    </div>
  );
}