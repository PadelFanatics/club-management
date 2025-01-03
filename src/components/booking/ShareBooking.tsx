import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { GameLevelBadge } from './GameLevelBadge';
import { calculateGameLevel } from '../../utils/gameLevel';
import type { Booking, Court, Player } from '../../types';

interface ShareBookingProps {
  booking: Booking;
  court: Court;
  currentPlayer?: Player;
}

export function ShareBooking({ booking, court, currentPlayer }: ShareBookingProps) {
  const [copied, setCopied] = useState(false);

  const gameLevel = currentPlayer ? calculateGameLevel([currentPlayer]) : 'Intermediate';
  
  const shareText = `🎾 Padel game at ${court.name}\n` +
    `📅 ${new Date(booking.start_time).toLocaleDateString()}\n` +
    `⏰ ${new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n` +
    `🎯 Level: ${gameLevel}\n` +
    `Looking for 3 players to join! Let me know if you're interested.`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Padel game',
          text: shareText
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-medium">Share with Players</h3>
          <GameLevelBadge level={gameLevel} />
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 relative">
        <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
          {shareText}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}