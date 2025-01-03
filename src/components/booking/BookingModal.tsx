import React, { useState } from 'react';
import { PaymentOptions } from './PaymentOptions';
import { MatchLevelSelector } from './MatchLevelSelector';
import { PlayerOptions } from './PlayerOptions';
import type { Court } from '../../types';
import type { PaymentProvider } from '../../types/payments';

interface BookingModalProps {
  court: Court;
  date: Date;
  duration: number;
  onClose: () => void;
  onBook: (options: BookingOptions) => void;
}

interface BookingOptions {
  matchLevel: [number, number];
  additionalPlayers: number;
  approvePlayers: boolean;
  isFriendly: boolean;
  paymentProvider: PaymentProvider;
}

export function BookingModal({ court, date, duration, onClose, onBook }: BookingModalProps) {
  const [step, setStep] = useState<'options' | 'payment'>('options');
  const [options, setOptions] = useState<BookingOptions>({
    matchLevel: [5.1, 6.1],
    additionalPlayers: 0,
    approvePlayers: true,
    isFriendly: false,
    paymentProvider: 'stripe'
  });

  const totalPrice = (court.price_per_hour / 60) * duration;
  const pricePerPlayer = Math.ceil(totalPrice / 4); // Always split between 4 players

  const handleContinue = () => {
    setStep('payment');
  };

  const handlePaymentProviderSelect = (provider: PaymentProvider) => {
    setOptions({ ...options, paymentProvider: provider });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-6">
        {step === 'options' ? (
          <>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{court.name}</h2>
              <p className="text-gray-600">
                {court.club_name} • {duration} min • {court.price_per_hour / 100}k/hour
              </p>
            </div>

            <MatchLevelSelector
              value={options.matchLevel}
              onChange={(level) => setOptions({ ...options, matchLevel: level })}
            />

            <PlayerOptions
              value={options}
              onChange={(newOptions) => setOptions({ ...options, ...newOptions })}
            />

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 text-gray-600 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 py-4 bg-red-900 text-white rounded-lg font-medium hover:bg-red-950"
              >
                Continue to Payment
              </button>
            </div>
          </>
        ) : (
          <PaymentOptions
            clubId={court.club_id}
            amount={pricePerPlayer}
            onSelectProvider={handlePaymentProviderSelect}
          />
        )}
      </div>
    </div>
  );
}