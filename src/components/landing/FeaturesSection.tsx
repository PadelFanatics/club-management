import React from 'react';
import { Calendar, Users, Trophy, Smartphone, BarChart, CreditCard } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Booking System',
      description: 'Effortless court management and online bookings'
    },
    {
      icon: Users,
      title: 'Member Management',
      description: 'Track memberships, rankings, and player progress'
    },
    {
      icon: Trophy,
      title: 'Tournament Tools',
      description: 'Organize and manage tournaments with ease'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Give your members a premium mobile experience'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Make data-driven decisions for your club'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Secure and flexible payment solutions'
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">
            Powerful features to help your club thrive
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm">
                <Icon className="w-12 h-12 text-red-900 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}