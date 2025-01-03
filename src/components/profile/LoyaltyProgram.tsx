import React from 'react';

interface LoyaltyProgramProps {
  hoursPlayed: number;
}

export function LoyaltyProgram({ hoursPlayed }: LoyaltyProgramProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="font-bold mb-2">LOYALTY PROGRAM</h2>
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="h-2 flex-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-red-900 rounded-full" 
              style={{ width: `${Math.min((hoursPlayed / 10) * 100, 100)}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">This month: {hoursPlayed}hrs</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="underline">WHITE CARD</span>
          <span className="underline">BLACK CARD</span>
        </div>
      </div>
    </div>
  );
}