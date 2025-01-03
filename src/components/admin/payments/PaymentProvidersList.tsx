import React from 'react';
import { Settings, CheckCircle, XCircle } from 'lucide-react';
import { PAYMENT_METHODS } from '../../../types/payments';
import type { PaymentProviderConfig } from '../../../types/payments';

interface PaymentProvidersListProps {
  providers: PaymentProviderConfig[];
  onToggle: (providerId: string, isActive: boolean) => void;
  onConfigure: (providerId: string) => void;
}

export function PaymentProvidersList({ providers, onToggle, onConfigure }: PaymentProvidersListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {PAYMENT_METHODS.map((method) => {
        const config = providers.find(p => p.provider === method.provider);
        const isActive = config?.is_active ?? false;

        return (
          <div key={method.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="h-8 object-contain"
                />
                <div>
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-500">Base fee: {method.fees}</p>
                </div>
              </div>
              <button
                onClick={() => config && onToggle(config.id, !isActive)}
                className={`p-2 rounded-full ${
                  isActive ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {isActive ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              {config && (
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Your Fee</span>
                    <span className="font-medium">
                      {config.config.fee_percentage}% + {config.config.fee_fixed / 100}k
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Min Amount</span>
                    <span className="font-medium">{config.config.min_amount / 100}k</span>
                  </div>
                  {config.config.max_amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Amount</span>
                      <span className="font-medium">{config.config.max_amount / 100}k</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => config && onConfigure(config.id)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-4 h-4" />
                <span>{config ? 'Configure' : 'Set Up'}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}