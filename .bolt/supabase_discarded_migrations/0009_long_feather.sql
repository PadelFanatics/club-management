/*
  # Add PayPal payment provider

  1. Changes
    - Add PayPal to provider options in payment_provider_configs
    - Add PayPal to provider options in booking_payments
*/

-- Update payment_provider_configs provider check constraint
ALTER TABLE payment_provider_configs
DROP CONSTRAINT IF EXISTS payment_provider_configs_provider_check;

ALTER TABLE payment_provider_configs
ADD CONSTRAINT payment_provider_configs_provider_check
CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal'));

-- Update booking_payments provider check constraint
ALTER TABLE booking_payments
DROP CONSTRAINT IF EXISTS booking_payments_provider_check;

ALTER TABLE booking_payments
ADD CONSTRAINT booking_payments_provider_check
CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal'));