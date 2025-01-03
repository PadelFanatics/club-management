export type PaymentProvider = 'stripe' | 'midtrans' | 'xendit' | 'doku' | 'ovo' | 'dana' | 'paypal';

export interface PaymentProviderConfig {
  id: string;
  club_id: string;
  provider: PaymentProvider;
  is_active: boolean;
  config: {
    api_key?: string;
    merchant_id?: string;
    client_key?: string;
    client_id?: string; // For PayPal
    client_secret?: string; // For PayPal
    environment: 'sandbox' | 'production';
  };
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  provider: PaymentProvider;
  icon: string;
  fees: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    provider: 'paypal',
    icon: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg',
    fees: '3.49% + 49¢'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    provider: 'stripe',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    fees: '2.9% + 30¢'
  },
  {
    id: 'midtrans',
    name: 'Midtrans',
    provider: 'midtrans',
    icon: 'https://www.midtrans.com/assets/images/logo-midtrans-color.png',
    fees: '2.7%'
  },
  {
    id: 'xendit',
    name: 'Xendit',
    provider: 'xendit',
    icon: 'https://xendit.co/wp-content/uploads/2019/11/xendit-logo-color.svg',
    fees: '2.5%'
  },
  {
    id: 'doku',
    name: 'DOKU',
    provider: 'doku',
    icon: 'https://www.doku.com/img/doku-logo.svg',
    fees: '2.8%'
  },
  {
    id: 'ovo',
    name: 'OVO',
    provider: 'ovo',
    icon: 'https://www.ovo.id/-/media/project/ovo/home/public/ovo-logo.png',
    fees: '1.5%'
  },
  {
    id: 'dana',
    name: 'DANA',
    provider: 'dana',
    icon: 'https://www.dana.id/assets/images/logo-dana-blue.svg',
    fees: '1.5%'
  }
];