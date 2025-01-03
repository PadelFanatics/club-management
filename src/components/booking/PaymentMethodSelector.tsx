import React from 'react';
import { PAYMENT_METHODS } from '../../types/payments';
import type { PaymentProvider } from '../../types/payments';

interface PaymentMethodSelectorProps {
  selectedProvider: PaymentProvider;
  onSelect: (provider: PaymentProvider) => void;
  availableProviders: PaymentProvider[];
}

export function PaymentMethodSelector({
  selectedProvider,
  onSelect,
  availableProviders
}: PaymentMethodSelectorProps) {
  const filteredMethods = PAYMENT_METHODS.filter(
    method => availableProviders.includes(method.provider)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Payment Method</h3>
      <div className="grid gap-4">
        {filteredMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.provider)}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              selectedProvider === method.provider
                ? 'border-red-900 bg-red-50'
                : 'border-gray-200 hover:border-red-200'
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={method.icon}
                alt={method.name}
                className="h-8 object-contain"
              />
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">Fee: {method.fees}</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedProvider === method.provider
                ? 'border-red-900 bg-red-900'
                : 'border-gray-300'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}