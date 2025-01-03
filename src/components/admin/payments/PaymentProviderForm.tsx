import React, { useState } from 'react';
import type { PaymentProvider } from '../../../types/payments';

interface PaymentProviderFormProps {
  provider: PaymentProvider;
  onSave: (config: PaymentProviderConfig) => void;
  onCancel: () => void;
}

interface PaymentProviderConfig {
  fee_percentage: number;
  fee_fixed: number;
  min_amount: number;
  max_amount?: number;
  credentials: Record<string, string>;
}

export function PaymentProviderForm({ provider, onSave, onCancel }: PaymentProviderFormProps) {
  const [config, setConfig] = useState<PaymentProviderConfig>({
    fee_percentage: 0,
    fee_fixed: 0,
    min_amount: 0,
    credentials: {}
  });

  const credentialFields = {
    stripe: ['api_key', 'webhook_secret'],
    paypal: ['client_id', 'client_secret'],
    midtrans: ['server_key', 'client_key'],
    xendit: ['api_key'],
    doku: ['mall_id', 'shared_key'],
    ovo: ['app_id', 'app_secret'],
    dana: ['merchant_id', 'secret_key']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Fee Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Percentage Fee (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.fee_percentage}
              onChange={e => setConfig({
                ...config,
                fee_percentage: parseFloat(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fixed Fee (in smallest currency unit)
            </label>
            <input
              type="number"
              value={config.fee_fixed}
              onChange={e => setConfig({
                ...config,
                fee_fixed: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Amount
            </label>
            <input
              type="number"
              value={config.min_amount}
              onChange={e => setConfig({
                ...config,
                min_amount: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Amount (optional)
            </label>
            <input
              type="number"
              value={config.max_amount || ''}
              onChange={e => setConfig({
                ...config,
                max_amount: e.target.value ? parseInt(e.target.value) : undefined
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">API Credentials</h3>
        
        {credentialFields[provider].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <input
              type="password"
              value={config.credentials[field] || ''}
              onChange={e => setConfig({
                ...config,
                credentials: {
                  ...config.credentials,
                  [field]: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
        >
          Save Configuration
        </button>
      </div>
    </form>
  );
}