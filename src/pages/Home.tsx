import React, { useState } from 'react';
import { MatchTabs } from '../components/matches/MatchTabs';
import { MatchFilters } from '../components/matches/MatchFilters';
import { OpenMatchesList } from '../components/matches/OpenMatchesList';
import { EventsList } from '../components/events/EventsList';
import type { OpenMatch } from '../types/matches';

const SAMPLE_MATCHES: OpenMatch[] = [
  {
    id: '1',
    court: {
      id: '1',
      name: 'Court 1',
      club_name: 'UBUD',
      price_per_hour: 160000
    },
    start_time: '2024-03-27T13:00:00Z',
    end_time: '2024-03-27T14:30:00Z',
    level_range: [4.5, 5.5],
    players: [
      { id: '1', full_name: 'John Doe', ranking: 500 },
      { id: '2', full_name: 'Jane Smith', ranking: 520 }
    ],
    requires_approval: true,
    is_friendly: false
  }
];

export function Home() {
  const [activeTab, setActiveTab] = useState<'open' | 'events'>('open');
  const [levelRange, setLevelRange] = useState<[number, number]>([4.1, 6.6]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [matches] = useState<OpenMatch[]>(SAMPLE_MATCHES);
  
  const locations = ['All Locations', 'UBUD', 'PERERENAN', 'CANGGU'];

  const handleJoinMatch = (matchId: string) => {
    console.log('Joining match:', matchId);
    // Implement join match logic
  };

  return (
    <div className="space-y-6">
      <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <MatchFilters
        levelRange={levelRange}
        onLevelRangeChange={setLevelRange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        locations={locations}
      />
      
      {activeTab === 'open' ? (
        <OpenMatchesList
          matches={matches}
          onJoinMatch={handleJoinMatch}
        />
      ) : (
        <EventsList />
      )}
    </div>
  );
}