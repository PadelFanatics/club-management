import React from 'react';
import { TrendingUp, Users, CreditCard } from 'lucide-react';

export function CommissionTracker() {
  // Mock data - replace with real API calls
  const stats = {
    activeMembers: 45,
    monthlyCommission: 90,
    totalEarned: 540
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <Users className="w-6 h-6 text-red-900 mb-2" />
          <div className="text-2xl font-bold">{stats.activeMembers}</div>
          <div className="text-sm text-gray-600">Active VIP Members</div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <CreditCard className="w-6 h-6 text-red-900 mb-2" />
          <div className="text-2xl font-bold">€{stats.monthlyCommission}</div>
          <div className="text-sm text-gray-600">This Month's Commission</div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <TrendingUp className="w-6 h-6 text-red-900 mb-2" />
          <div className="text-2xl font-bold">€{stats.totalEarned}</div>
          <div className="text-sm text-gray-600">Total Earned</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Commission History</h4>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">March 2024</div>
                <div className="text-sm text-gray-600">42 active members</div>
              </div>
              <div className="font-medium">€84.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}