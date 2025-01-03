import React from 'react';
import type { TournamentLevel } from '../../types/tournaments';

interface TournamentLevelInfoProps {
  level: TournamentLevel;
}

export function TournamentLevelInfo({ level }: TournamentLevelInfoProps) {
  const levelInfo: Record<TournamentLevel, {
    description: string;
    requirements: string[];
    benefits: string[];
  }> = {
    bronze: {
      description: 'Entry-level tournaments for local players',
      requirements: [
        'Open to all skill levels',
        'No ranking requirements',
        'Basic match officiating'
      ],
      benefits: [
        'Prize pool: €100 - €500',
        'Local ranking points',
        'Basic tournament organization'
      ]
    },
    silver: {
      description: 'Regional tournaments with moderate competition',
      requirements: [
        'Minimum ranking of 3.0',
        'Previous tournament experience',
        'Professional officiating for finals'
      ],
      benefits: [
        'Prize pool: €500 - €2,000',
        'Regional ranking points',
        'Live scoring system',
        'Basic streaming of finals'
      ]
    },
    gold: {
      description: 'High-level national tournaments',
      requirements: [
        'Minimum ranking of 4.0',
        'Professional tournament experience',
        'Full professional officiating'
      ],
      benefits: [
        'Prize pool: €2,000 - €5,000',
        'National ranking points',
        'Full tournament streaming',
        'Player hospitality package',
        'Media coverage'
      ]
    },
    platinum: {
      description: 'Elite international tournaments',
      requirements: [
        'Minimum ranking of 5.0',
        'International tournament experience',
        'Professional status'
      ],
      benefits: [
        'Prize pool: €5,000+',
        'International ranking points',
        'Full tournament production',
        'VIP hospitality package',
        'International media coverage',
        'Travel allowance for top seeds'
      ]
    }
  };

  const info = levelInfo[level];

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{info.description}</p>
      
      <div>
        <h4 className="font-medium mb-2">Requirements</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {info.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2">Benefits</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {info.benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}