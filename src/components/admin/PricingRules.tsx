import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import type { Court } from '../../types';

interface PricingRule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  price_multiplier: number;
  is_happy_hour: boolean;
}

interface PricingRulesProps {
  court: Court;
  rules: PricingRule[];
  onAddRule: (rule: Omit<PricingRule, 'id'>) => void;
  onUpdateRule: (id: string, rule: Partial<PricingRule>) => void;
  onDeleteRule: (id: string) => void;
}

export function PricingRules({
  court,
  rules,
  onAddRule,
  onUpdateRule,
  onDeleteRule
}: PricingRulesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pricing Rules for {court.name}</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add Rule</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{days[rule.day_of_week]}</div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{rule.start_time} - {rule.end_time}</span>
                </div>
              </div>
              <div className="space-x-4">
                <span className={rule.is_happy_hour ? 'text-green-600' : ''}>
                  {rule.price_multiplier}x
                </span>
                <button
                  onClick={() => onDeleteRule(rule.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}