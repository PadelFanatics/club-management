import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PAYMENT_METHODS } from '../../types/payments';
import type { PaymentProviderConfig } from '../../types/payments';

interface PaymentProvidersTabProps {
  clubId: string;
}

export function PaymentProvidersTab({ clubId }: PaymentProvidersTabProps) {
  const [providers, setProviders] = useState<PaymentProviderConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, [clubId]);

  const loadProviders = async () => {
    const { data } = await supabase
      .from('payment_provider_configs')
      .select('*')
      .eq('club_id', clubId);

    if (data) {
      setProviders(data);
    }
    setLoading(false);
  };

  const handleToggleProvider = async (providerId: string, isActive: boolean) => {
    const { data, error } = await supabase
      .from('payment_provider_configs')
      .update({ is_active: isActive })
      .eq('id', providerId)
      .select()
      .single();

    if (data && !error) {
      setProviders(providers.map(p => p.id === providerId ? data : p));
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading payment providers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Payment Providers</h2>
        <button className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950">
          Add Provider
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PAYMENT_METHODS.map((method) => {
          const config = providers.find(p => p.provider === method.provider);
          const isActive = config?.is_active ?? false;

          return (
            <div key={method.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="h-8 object-contain"
                />
                <button
                  onClick={() => handleToggleProvider(config?.id || '', !isActive)}
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

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction Fee</span>
                  <span className="font-medium">{method.fees}</span>
                </div>

                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}