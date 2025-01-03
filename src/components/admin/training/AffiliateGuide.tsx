import React from 'react';
import { DollarSign, Share2, Smartphone, BarChart } from 'lucide-react';
import { MarketingTools } from './affiliate/MarketingTools';
import { CommissionTracker } from './affiliate/CommissionTracker';
import { PromoMaterials } from './affiliate/PromoMaterials';

export function AffiliateGuide() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'materials' | 'tracking'>('overview');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Club Affiliate Program</h3>
        <p className="text-gray-600">
          Earn monthly commissions by promoting the Padel Fanatics Voice Scoring App to your members.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`p-4 text-left rounded-lg ${
            activeTab === 'overview' ? 'bg-red-50 border-red-900' : 'bg-white'
          } border`}
        >
          <DollarSign className="w-6 h-6 text-red-900 mb-2" />
          <h4 className="font-medium">Commission Structure</h4>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`p-4 text-left rounded-lg ${
            activeTab === 'materials' ? 'bg-red-50 border-red-900' : 'bg-white'
          } border`}
        >
          <Share2 className="w-6 h-6 text-red-900 mb-2" />
          <h4 className="font-medium">Promo Materials</h4>
        </button>

        <button
          onClick={() => setActiveTab('tracking')}
          className={`p-4 text-left rounded-lg ${
            activeTab === 'tracking' ? 'bg-red-50 border-red-900' : 'bg-white'
          } border`}
        >
          <BarChart className="w-6 h-6 text-red-900 mb-2" />
          <h4 className="font-medium">Track Earnings</h4>
        </button>
      </div>

      {activeTab === 'overview' && (
        <MarketingTools affiliateId="CLUB123" /> {/* Replace with actual club ID */}
      )}
      
      {activeTab === 'materials' && <PromoMaterials />}
      
      {activeTab === 'tracking' && <CommissionTracker />}
    </div>
  );
}