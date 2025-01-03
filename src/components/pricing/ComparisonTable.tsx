import React from 'react';
import { Check, Minus } from 'lucide-react';

interface ComparisonTableProps {
  tiers: Array<{
    name: string;
    price: number;
  }>;
}

export function ComparisonTable({ tiers }: ComparisonTableProps) {
  const features = {
    'Website & Booking': {
      'GHL Website': ['basic', 'pro', 'elite'],
      'Online Booking': ['basic', 'pro', 'elite'],
      'Custom Domain': ['pro', 'elite'],
      'Marketing Funnel': ['pro', 'elite']
    },
    'Mobile App': {
      'Member App': ['pro', 'elite'],
      'Court Check-in': ['pro', 'elite'],
      'Live Scoring': ['elite'],
      'Tournament Brackets': ['elite']
    },
    'Management': {
      'Member Management': ['basic', 'pro', 'elite'],
      'Court Management': ['basic', 'pro', 'elite'],
      'Staff Management': ['pro', 'elite'],
      'Inventory Management': ['elite']
    },
    'Support': {
      'Email Support': ['basic', 'pro', 'elite'],
      'Priority Support': ['pro', 'elite'],
      'Dedicated Manager': ['elite'],
      'Custom Development': ['elite']
    }
  };

  const tierCodes = ['basic', 'pro', 'elite'];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-4">
        {/* Header */}
        <div className="p-6 bg-gray-50 font-medium">Features</div>
        {tiers.map((tier) => (
          <div key={tier.name} className="p-6 bg-gray-50 text-center">
            <div className="font-medium">{tier.name}</div>
            <div className="text-sm text-gray-600">€{tier.price}/month</div>
          </div>
        ))}

        {/* Features */}
        {Object.entries(features).map(([category, categoryFeatures]) => (
          <React.Fragment key={category}>
            <div className="col-span-4 bg-gray-100 p-4 font-medium">
              {category}
            </div>
            {Object.entries(categoryFeatures).map(([feature, tiers]) => (
              <React.Fragment key={feature}>
                <div className="p-4 border-t">{feature}</div>
                {tierCodes.map((code) => (
                  <div key={code} className="p-4 border-t text-center">
                    {tiers.includes(code) ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}