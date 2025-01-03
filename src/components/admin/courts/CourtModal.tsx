import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface PricingTier {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
}

interface CourtModalProps {
  court?: {
    id: string;
    name: string;
    price_per_hour: number;
  };
  onClose: () => void;
  onSave: (court: {
    name: string;
    price_per_hour: number;
    pricing_tiers: PricingTier[];
  }) => void;
}

export function CourtModal({ court, onClose, onSave }: CourtModalProps) {
  const [name, setName] = useState(court?.name || '');
  const [basePrice, setBasePrice] = useState(court?.price_per_hour || 0);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);

  const handleAddTier = () => {
    setPricingTiers([
      ...pricingTiers,
      {
        id: crypto.randomUUID(),
        startTime: '09:00',
        endTime: '17:00',
        price: basePrice
      }
    ]);
  };

  const handleRemoveTier = (id: string) => {
    setPricingTiers(pricingTiers.filter(tier => tier.id !== id));
  };

  const handleUpdateTier = (id: string, updates: Partial<PricingTier>) => {
    setPricingTiers(pricingTiers.map(tier => 
      tier.id === id ? { ...tier, ...updates } : tier
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      price_per_hour: basePrice,
      pricing_tiers: pricingTiers
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-xl font-bold mb-6">
          {court ? 'Edit Court' : 'Add New Court'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Court Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Price per Hour
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={basePrice / 100}
                onChange={(e) => setBasePrice(Math.round(parseFloat(e.target.value) * 100))}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
                step="0.01"
                required
              />
              <span className="ml-2">€</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Special Pricing Tiers
              </label>
              <button
                type="button"
                onClick={handleAddTier}
                className="text-sm text-red-900 hover:text-red-950"
              >
                + Add Tier
              </button>
            </div>

            <div className="space-y-4">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={tier.startTime}
                    onChange={(e) => handleUpdateTier(tier.id, { startTime: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={tier.endTime}
                    onChange={(e) => handleUpdateTier(tier.id, { endTime: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    value={tier.price / 100}
                    onChange={(e) => handleUpdateTier(tier.id, { 
                      price: Math.round(parseFloat(e.target.value) * 100)
                    })}
                    className="px-3 py-2 border rounded-md w-24"
                    min="0"
                    step="0.01"
                  />
                  <span>€</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(tier.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
            >
              {court ? 'Save Changes' : 'Add Court'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}