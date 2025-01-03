```tsx
import React from 'react';
import { TournamentLevelBadge } from './TournamentLevelBadge';
import type { TournamentLevel } from '../../types/tournaments';

interface TournamentRulesProps {
  level: TournamentLevel;
}

export function TournamentRules({ level }: TournamentRulesProps) {
  const rules = {
    format: [
      'Single elimination bracket',
      'Best of 3 sets (6 games per set)',
      'Tiebreak at 6-6 in all sets',
      'No-Ad scoring system'
    ],
    timing: [
      '10-minute warmup period',
      '90 seconds between changeovers',
      '120 seconds between sets',
      'Maximum 2 matches per day per team'
    ],
    conduct: [
      'Professional conduct required at all times',
      'Official tournament referee decisions are final',
      'Proper tennis attire required',
      'Unsportsmanlike conduct may result in disqualification'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Tournament Rules</h2>
        <TournamentLevelBadge level={level} />
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="font-medium mb-3">Match Format</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {rules.format.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-medium mb-3">Timing Rules</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {rules.timing.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-medium mb-3">Code of Conduct</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {rules.conduct.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
```