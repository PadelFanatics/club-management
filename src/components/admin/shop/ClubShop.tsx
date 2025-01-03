import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { CategoryFilter } from './CategoryFilter';
import { Cart } from './Cart';
import { OrderHistory } from './OrderHistory';
import type { Product, ProductCategory } from '../../../types/shop';

export function ClubShop() {
  const [selectedCategory, setSelectedCategory] = React.useState<ProductCategory | 'all'>('all');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState<Map<string, number>>(new Map());

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(new Map(cart.set(product.id, (cart.get(product.id) || 0) + quantity)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Club Shop</h2>
        <button
          onClick={() => setCartOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart ({Array.from(cart.values()).reduce((a, b) => a + b, 0)})</span>
        </button>
      </div>

      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ProductGrid
        category={selectedCategory}
        onAddToCart={handleAddToCart}
      />

      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={(productId, quantity) => {
            const newCart = new Map(cart);
            if (quantity === 0) {
              newCart.delete(productId);
            } else {
              newCart.set(productId, quantity);
            }
            setCart(newCart);
          }}
        />
      )}

      <OrderHistory />
    </div>
  );
}