import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Product, ProductCategory } from '../../../types/shop';

interface ProductGridProps {
  category: ProductCategory | 'all';
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductGrid({ category, onAddToCart }: ProductGridProps) {
  // This would come from your API
  const products: Product[] = [];

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="font-medium mb-1">{product.name}</div>
            <div className="text-sm text-gray-600 mb-2">{product.brand}</div>
            <div className="flex justify-between items-center">
              <div className="font-bold">€{(product.wholesale_price || 0) / 100}</div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="p-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {product.min_order && (
              <div className="text-sm text-gray-500 mt-2">
                Min order: {product.min_order} units
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}