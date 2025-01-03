import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { PaymentProvidersList } from './PaymentProvidersList';
import { PaymentProviderForm } from './PaymentProviderForm';
import type { PaymentProvider, PaymentProviderConfig } from '../../../types/payments';

interface PaymentProvidersManagerProps {
  clubId: string;
}

export function PaymentProvidersManager({ clubId }: PaymentProvidersManagerProps) {
  const [providers, setProviders] = useState<PaymentProviderConfig[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleProvider = async (providerId: string, isActive: boolean) => {
    try {
      // In a real app, this would update the database
      setProviders(providers.map(p => 
        p.id === providerId ? { ...p, is_active: isActive } : p
      ));
    } catch (error) {
      setError('Failed to update provider status');
    }
  };

  const handleSaveConfig = async (config: any) => {
    try {
      // In a real app, this would update the database
      if (selectedProvider) {
        setProviders(providers.map(p => 
          p.id === selectedProvider ? { ...p, config } : p
        ));
        setSelectedProvider(null);
      }
    } catch (error) {
      setError('Failed to save provider configuration');
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        <span className="text-red-700">{error}</span>
      </div>
    );
  }

  if (selectedProvider) {
    const provider = providers.find(p => p.id === selectedProvider);
    if (!provider) return null;

    return (
      <PaymentProviderForm
        provider={provider.provider as PaymentProvider}
        onSave={handleSaveConfig}
        onCancel={() => setSelectedProvider(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Payment Providers</h2>
      </div>

      <PaymentProvidersList
        providers={providers}
        onToggle={handleToggleProvider}
        onConfigure={setSelectedProvider}
      />
    </div>
  );
}