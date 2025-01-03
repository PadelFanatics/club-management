import React from 'react';
import { CreditCard } from 'lucide-react';
import type { Court } from '../../types';

interface PaymentSummaryProps {
  court: Court;
  duration: number;
  playerCount: number;
  onPay: () => void;
}

export function PaymentSummary({ court, duration, playerCount, onPay }: PaymentSummaryProps) {
  const totalPrice = (court.price_per_hour / 60) * duration;
  const pricePerPlayer = Math.ceil(totalPrice / (playerCount || 1));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Court rate</span>
          <span>{court.price_per_hour / 100}k/hour</span>
        </div>
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{duration} minutes</span>
        </div>
        <div className="flex justify-between">
          <span>Players</span>
          <span>{playerCount}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold">
            <span>Your share</span>
            <span>{pricePerPlayer / 100}k</span>
          </div>
        </div>
      </div>

      <button
        onClick={onPay}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
      >
        <CreditCard className="w-5 h-5" />
        <span>Pay {pricePerPlayer / 100}k</span>
      </button>
      
      <p className="mt-4 text-sm text-gray-500 text-center">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}