export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  stock: number;
  brand: string;
  wholesale_price?: number;
  min_order?: number;
}

export type ProductCategory = 
  | 'rackets'
  | 'balls'
  | 'bags'
  | 'accessories'
  | 'energy_drinks'
  | 'nutrition';

export interface Order {
  id: string;
  club_id: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}