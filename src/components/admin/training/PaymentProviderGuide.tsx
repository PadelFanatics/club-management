import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { PAYMENT_METHODS } from '../../../types/payments';
import { getGHLTrackingLink } from '../../../utils/ghl';

// Mock GHL config - in production this would come from your app's configuration
const GHL_CONFIG = {
  locationId: 'your-location-id',
  campaignId: 'your-campaign-id'
};

export function PaymentProviderGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Payment Provider Setup Guide</h3>
        <p className="text-gray-600">
          Follow these steps to set up payment providers for your club. Each signup through
          your unique link will be tracked automatically.
        </p>
      </div>

      <div className="space-y-6">
        {PAYMENT_METHODS.map((method) => (
          <div key={method.id} className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="h-8 object-contain"
                />
                <h4 className="text-lg font-semibold">{method.name}</h4>
              </div>
              <a
                href={getGHLTrackingLink(GHL_CONFIG, method.provider)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-red-900 hover:text-red-950"
              >
                <span>Create Account</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Rest of the component remains the same */}
          </div>
        ))}
      </div>
    </div>
  );
}