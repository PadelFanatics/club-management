import React, { useState, useEffect } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { paymentApi } from '../../lib/api/paymentApi';
import type { PaymentProvider } from '../../types/payments';

interface PaymentOptionsProps {
  clubId: string;
  amount: number;
  onSelectProvider: (provider: PaymentProvider) => void;
}

export function PaymentOptions({ clubId, amount, onSelectProvider }: PaymentOptionsProps) {
  const [availableProviders, setAvailableProviders] = useState<PaymentProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('stripe');

  useEffect(() => {
    loadPaymentProviders();
  }, [clubId]);

  const loadPaymentProviders = async () => {
    try {
      const providers = await paymentApi.getClubPaymentProviders(clubId);
      setAvailableProviders(providers.map(p => p.provider));
      if (providers.length > 0) {
        setSelectedProvider(providers[0].provider);
        onSelectProvider(providers[0].provider);
      }
    } catch (error) {
      console.error('Failed to load payment providers:', error);
    }
  };

  const handleProviderSelect = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
    onSelectProvider(provider);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Payment Amount</h3>
        <div className="text-3xl font-bold">{(amount / 100).toFixed(2)}k</div>
        <p className="text-sm text-gray-500">Your share of the court booking</p>
      </div>

      <PaymentMethodSelector
        selectedProvider={selectedProvider}
        onSelect={handleProviderSelect}
        availableProviders={availableProviders}
      />
    </div>
  );
}