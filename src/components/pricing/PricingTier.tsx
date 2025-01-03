import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface PricingTierProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: LucideIcon;
  highlighted?: boolean;
}

export function PricingTier({
  name,
  price,
  description,
  features,
  icon: Icon,
  highlighted = false
}: PricingTierProps) {
  return (
    <div className={`rounded-2xl p-8 ${
      highlighted 
        ? 'bg-red-900 text-white ring-4 ring-red-500'
        : 'bg-white'
    }`}>
      <div className="mb-8">
        <Icon className={`w-12 h-12 mb-4 ${
          highlighted ? 'text-white' : 'text-red-900'
        }`} />
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className={highlighted ? 'text-red-100' : 'text-gray-600'}>
          {description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">€{price}</span>
          <span className={`ml-2 ${
            highlighted ? 'text-red-100' : 'text-gray-600'
          }`}>
            /month
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${
              highlighted ? 'text-white' : 'text-red-900'
            }`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded-lg font-medium ${
        highlighted
          ? 'bg-white text-red-900 hover:bg-red-50'
          : 'bg-red-900 text-white hover:bg-red-950'
      }`}>
        Get Started
      </button>
    </div>
  );
}