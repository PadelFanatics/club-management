interface GHLConfig {
  locationId: string;
  campaignId: string;
}

// Generate tracking link for GHL
export function getGHLTrackingLink(config: GHLConfig, provider: string): string {
  return `https://marketplace.gohighlevel.com/link/${config.locationId}/${config.campaignId}?provider=${provider}`;
}

// Generate QR code URL
export function getGHLQRCode(config: GHLConfig): string {
  return `https://marketplace.gohighlevel.com/qr/${config.locationId}/${config.campaignId}`;
}

// Generate embed code for websites
export function getGHLEmbedCode(config: GHLConfig): string {
  return `<script src="https://marketplace.gohighlevel.com/embed/${config.locationId}/${config.campaignId}"></script>`;
}

// Package information for GHL
export const packages = {
  basic: {
    name: "Club Essentials",
    price: 99,
    features: [
      "GHL Website with Booking System",
      "Basic Member Management",
      "Equipment Purchase Discounts (5%)",
      "Email Support",
      "Basic Analytics Dashboard"
    ]
  },
  professional: {
    name: "Club Pro",
    price: 249,
    features: [
      "Everything in Essentials, plus:",
      "Full Court Management System",
      "Basic Mobile App",
      "GHL Marketing Funnel",
      "Equipment Discounts (10%)",
      "Priority Support",
      "Advanced Analytics"
    ]
  },
  elite: {
    name: "Club Elite",
    price: 499,
    features: [
      "Everything in Pro, plus:",
      "Tournament Management",
      "Live Scoring System",
      "Equipment Discounts (15%)",
      "API Access",
      "Dedicated Account Manager",
      "Custom Development Hours"
    ]
  }
};