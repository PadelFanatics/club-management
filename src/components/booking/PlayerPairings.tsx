import React from 'react';
import { Users, ArrowLeftRight } from 'lucide-react';
import { PlayerCard } from './PlayerCard';
import type { Player } from '../../types';

interface PlayerPairingsProps {
  players: Player[];
  team1Players: Player[];
  team2Players: Player[];
  onTeamChange: (team1: Player[], team2: Player[]) => void;
}

export function PlayerPairings({ players, team1Players, team2Players, onTeamChange }: PlayerPairingsProps) {
  // ... previous code remains the same ...

  const suggestOptimalPairings = () => {
    // Sort players by preferred side and ranking
    const leftSidePlayers = players.filter(p => p.preferred_side === 'left')
      .sort((a, b) => b.ranking - a.ranking);
    const rightSidePlayers = players.filter(p => p.preferred_side === 'right')
      .sort((a, b) => b.ranking - a.ranking);
    const bothSidePlayers = players.filter(p => p.preferred_side === 'both')
      .sort((a, b) => b.ranking - a.ranking);
    const noPreferencePlayers = players.filter(p => !p.preferred_side)
      .sort((a, b) => b.ranking - a.ranking);

    // Try to create balanced teams considering preferred sides
    const team1: Player[] = [];
    const team2: Player[] = [];

    // Helper function to get the best player for a position
    const getBestPlayerForPosition = (side: 'left' | 'right'): Player | undefined => {
      // First try players who prefer that side
      const preferredPlayers = side === 'left' ? leftSidePlayers : rightSidePlayers;
      if (preferredPlayers.length > 0) return preferredPlayers.shift();
      
      // Then try players who can play both sides
      if (bothSidePlayers.length > 0) return bothSidePlayers.shift();
      
      // Finally try players with no preference
      if (noPreferencePlayers.length > 0) return noPreferencePlayers.shift();
      
      return undefined;
    };

    // Fill team 1
    const team1Left = getBestPlayerForPosition('left');
    if (team1Left) team1.push(team1Left);
    const team1Right = getBestPlayerForPosition('right');
    if (team1Right) team1.push(team1Right);

    // Fill team 2
    const team2Left = getBestPlayerForPosition('left');
    if (team2Left) team2.push(team2Left);
    const team2Right = getBestPlayerForPosition('right');
    if (team2Right) team2.push(team2Right);

    // Fill any remaining spots with available players
    const remainingPlayers = [...bothSidePlayers, ...noPreferencePlayers, ...leftSidePlayers, ...rightSidePlayers];
    while (team1.length < 2 && remainingPlayers.length > 0) {
      team1.push(remainingPlayers.shift()!);
    }
    while (team2.length < 2 && remainingPlayers.length > 0) {
      team2.push(remainingPlayers.shift()!);
    }

    onTeamChange(team1, team2);
  };

  // ... rest of the component remains the same ...
}