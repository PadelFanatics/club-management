import type { PaymentProvider } from '../types/payments';

export function getAffiliateLink(provider: PaymentProvider): string {
  const affiliateLinks: Record<PaymentProvider, string> = {
    stripe: 'https://stripe.com/partners',
    paypal: 'https://www.paypal.com/partnersignup',
    midtrans: 'https://midtrans.com/partners',
    xendit: 'https://www.xendit.co/en/partners',
    doku: 'https://doku.com/partner',
    ovo: 'https://www.ovo.id/partners',
    dana: 'https://www.dana.id/partner'
  };

  return affiliateLinks[provider];
}

export function getApiKeyInstructions(provider: PaymentProvider): string {
  const instructions: Record<PaymentProvider, string> = {
    stripe: 'Go to the Stripe Dashboard > Developers > API keys to find your publishable and secret keys.',
    paypal: 'Visit the PayPal Developer Dashboard to create an app and get your client ID and secret.',
    midtrans: 'Access your Midtrans Dashboard > Settings > Access Keys to find your server and client keys.',
    xendit: 'Log in to your Xendit Dashboard > Settings > API Keys to generate your API keys.',
    doku: 'Visit the DOKU Dashboard > Integration > API Configuration to get your Mall ID and Shared Key.',
    ovo: 'Access the OVO Business Portal > Integration > API Credentials for your App ID and secret.',
    dana: 'Log in to DANA Business > Developer Center to obtain your merchant ID and secret key.'
  };

  return instructions[provider];
}

export function getProviderBenefits(provider: PaymentProvider): string[] {
  const benefits: Record<PaymentProvider, string[]> = {
    stripe: [
      'Reduced processing fees for the first $100,000',
      'Free fraud prevention tools',
      'Priority support access'
    ],
    paypal: [
      'No setup or monthly fees',
      'Seller protection on eligible transactions',
      'Access to PayPal Working Capital'
    ],
    midtrans: [
      'Local payment method support',
      'Reduced fees for high volume',
      'Free payment page customization'
    ],
    xendit: [
      'Competitive local rates',
      'Same-day disbursement',
      'Free integration support'
    ],
    doku: [
      'Multiple payment channel access',
      'Real-time transaction monitoring',
      'Dedicated account manager'
    ],
    ovo: [
      'Instant settlement options',
      'Lower MDR rates',
      'In-app promotion opportunities'
    ],
    dana: [
      'Quick activation process',
      'Marketing collaboration opportunities',
      'Comprehensive transaction reports'
    ]
  };

  return benefits[provider];
}