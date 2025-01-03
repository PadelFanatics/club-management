/*
  # Add shop and affiliate tracking tables

  1. New Tables
    - `products`
      - Standard product info (name, price, etc)
      - Wholesale pricing and minimum order quantities
    - `club_orders`
      - Track club equipment/supply orders
    - `order_items`
      - Individual items in each order
    - `affiliate_tracking`
      - Track club referrals and commissions
    - `affiliate_payouts`
      - Record commission payments to clubs

  2. Security
    - Enable RLS on all new tables
    - Add policies for club admins and staff
*/

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('rackets', 'balls', 'bags', 'accessories', 'energy_drinks', 'nutrition')),
  description text,
  price integer NOT NULL,
  wholesale_price integer NOT NULL,
  min_order integer DEFAULT 1,
  stock integer NOT NULL DEFAULT 0,
  brand text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Club orders table
CREATE TABLE club_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered')),
  shipping_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES club_orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Affiliate tracking table
CREATE TABLE affiliate_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  referral_code text NOT NULL,
  member_id uuid REFERENCES players(id) NOT NULL,
  subscription_status text NOT NULL CHECK (status IN ('trial', 'active', 'cancelled')),
  commission_rate decimal(5,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate payouts table
CREATE TABLE affiliate_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  amount integer NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Club admins can view their orders"
  ON club_orders FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_orders.club_id
  ));

CREATE POLICY "Club admins can create orders"
  ON club_orders FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_orders.club_id
  ));

CREATE POLICY "Club admins can view their order items"
  ON order_items FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins 
    WHERE club_id = (
      SELECT club_id FROM club_orders WHERE id = order_items.order_id
    )
  ));

CREATE POLICY "Club admins can view their affiliate tracking"
  ON affiliate_tracking FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = affiliate_tracking.club_id
  ));

CREATE POLICY "Club admins can view their payouts"
  ON affiliate_payouts FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = affiliate_payouts.club_id
  ));