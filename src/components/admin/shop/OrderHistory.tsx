import React from 'react';
import { Package } from 'lucide-react';
import type { Order } from '../../../types/shop';

export function OrderHistory() {
  // This would come from your API
  const orders: Order[] = [];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Order History</h3>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600">Order #{order.id}</div>
                <div className="font-medium">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-red-900" />
                <span className="font-medium capitalize">{order.status}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-right font-bold">
                Total: €{order.total / 100}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}