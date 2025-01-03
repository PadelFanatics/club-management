import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative bg-red-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Ultimate Padel Club Management Solution
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            Everything you need to run your padel club efficiently, all in one place
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-red-900 px-8 py-3 rounded-lg font-medium hover:bg-red-50 flex items-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-red-800">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}