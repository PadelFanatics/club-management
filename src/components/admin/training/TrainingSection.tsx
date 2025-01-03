import React from 'react';
import { BookOpen, DollarSign, Users, Calendar } from 'lucide-react';
import { PaymentProviderGuide } from './PaymentProviderGuide';

export function TrainingSection() {
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);

  const topics = [
    {
      id: 'payment-setup',
      title: 'Payment Provider Setup',
      icon: DollarSign,
      description: 'Learn how to set up payment providers and maximize revenue'
    },
    {
      id: 'member-management',
      title: 'Member Management',
      icon: Users,
      description: 'Best practices for managing your club members'
    },
    {
      id: 'court-scheduling',
      title: 'Court Scheduling',
      icon: Calendar,
      description: 'Optimize your court scheduling and bookings'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-red-900" />
        <h2 className="text-2xl font-bold">Training Center</h2>
      </div>

      {!selectedTopic ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 text-red-900 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={() => setSelectedTopic(null)}
            className="text-red-900 hover:text-red-950 mb-4"
          >
            ← Back to Topics
          </button>
          
          {selectedTopic === 'payment-setup' && <PaymentProviderGuide />}
          {/* Add other guides as needed */}
        </div>
      )}
    </div>
  );
}