```tsx
import React from 'react';
import { Book, Trophy, Users, Calendar } from 'lucide-react';
import { TournamentLevelInfo } from './TournamentLevelInfo';
import type { TournamentLevel } from '../../types/tournaments';

export function TournamentDocs() {
  const [selectedLevel, setSelectedLevel] = React.useState<TournamentLevel>('bronze');

  const levels: TournamentLevel[] = ['bronze', 'silver', 'gold', 'platinum'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-2">
        <Book className="w-6 h-6 text-red-900" />
        <h1 className="text-2xl font-bold">Tournament Guidelines</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-bold mb-4">Tournament Levels</h2>
            <div className="space-y-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`w-full p-3 text-left rounded-lg ${
                    selectedLevel === level
                      ? 'bg-red-50 border-red-900 border'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-bold mb-4">Quick Links</h2>
            <div className="space-y-4">
              <a href="#rules" className="flex items-center text-red-900 hover:text-red-950">
                <Trophy className="w-4 h-4 mr-2" />
                Tournament Rules
              </a>
              <a href="#registration" className="flex items-center text-red-900 hover:text-red-950">
                <Users className="w-4 h-4 mr-2" />
                Registration Guide
              </a>
              <a href="#schedule" className="flex items-center text-red-900 hover:text-red-950">
                <Calendar className="w-4 h-4 mr-2" />
                Match Scheduling
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 capitalize">{selectedLevel} Level</h2>
            <TournamentLevelInfo level={selectedLevel} />
          </div>
        </div>
      </div>
    </div>
  );
}
```