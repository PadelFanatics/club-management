import React from 'react';
import { Shield, Smartphone, Trophy } from 'lucide-react';
import { PricingTier } from './PricingTier';
import { ComparisonTable } from './ComparisonTable';

export function PricingPage() {
  const tiers = [
    {
      name: 'Club Essentials',
      price: 99,
      description: 'Perfect for clubs just getting started',
      icon: Shield,
      features: [
        'GHL Website with Booking System',
        'Basic Member Management',
        'Equipment Purchase Discounts (5%)',
        'Email Support',
        'Basic Analytics Dashboard'
      ],
      highlighted: false
    },
    {
      name: 'Club Pro',
      price: 249,
      description: 'For growing clubs needing more features',
      icon: Smartphone,
      features: [
        'Everything in Essentials, plus:',
        'Full Court Management System',
        'Basic Mobile App',
        'GHL Marketing Funnel',
        'Equipment Discounts (10%)',
        'Priority Support',
        'Advanced Analytics'
      ],
      highlighted: true
    },
    {
      name: 'Club Elite',
      price: 499,
      description: 'Complete solution for serious clubs',
      icon: Trophy,
      features: [
        'Everything in Pro, plus:',
        'Tournament Management',
        'Live Scoring System',
        'Equipment Discounts (15%)',
        'API Access',
        'Dedicated Account Manager',
        'Custom Development Hours'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Choose Your Perfect Package
        </h1>
        <p className="text-xl text-gray-600">
          Flexible solutions for every padel club
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier) => (
          <PricingTier
            key={tier.name}
            {...tier}
          />
        ))}
      </div>

      <ComparisonTable tiers={tiers} />
    </div>
  );
}