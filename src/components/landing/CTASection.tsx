import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <div className="bg-red-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Club?
        </h2>
        <p className="text-xl text-red-100 mb-8">
          Join hundreds of successful padel clubs already using our platform
        </p>
        <button className="bg-white text-red-900 px-8 py-3 rounded-lg font-medium hover:bg-red-50 inline-flex items-center">
          Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}