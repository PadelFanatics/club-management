import React from 'react';
import { X, Plus, Minus, Truck } from 'lucide-react';
import type { Product } from '../../../types/shop';

interface CartProps {
  cart: Map<string, number>;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function Cart({ cart, onClose, onUpdateQuantity }: CartProps) {
  // This would come from your API
  const products = new Map<string, Product>();

  const total = Array.from(cart.entries()).reduce((sum, [productId, quantity]) => {
    const product = products.get(productId);
    return sum + (product ? (product.wholesale_price || 0) * quantity : 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4 h-[calc(100vh-200px)] overflow-auto">
          {Array.from(cart.entries()).map(([productId, quantity]) => {
            const product = products.get(productId);
            if (!product) return null;

            return (
              <div key={productId} className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.brand}</div>
                  <div className="font-bold">
                    €{((product.wholesale_price || 0) * quantity) / 100}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(productId, quantity - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(productId, quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">Total</div>
            <div className="text-xl font-bold">€{total / 100}</div>
          </div>
          <button className="w-full py-3 bg-red-900 text-white rounded-lg hover:bg-red-950 flex items-center justify-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}