import React from 'react';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { CTASection } from './components/landing/CTASection';
import { PricingPage } from './components/pricing/PricingPage';

export function Website() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingPage />
      <CTASection />
    </div>
  );
}