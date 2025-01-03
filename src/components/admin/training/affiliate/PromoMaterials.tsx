import React from 'react';
import { Download, Monitor, Smartphone } from 'lucide-react';

export function PromoMaterials() {
  const materials = [
    {
      title: 'QR Code Posters',
      description: 'High-quality posters with your unique QR code for club display',
      formats: ['PDF', 'PNG'],
      icon: Monitor
    },
    {
      title: 'Social Media Kit',
      description: 'Ready-to-post images and captions for Instagram, Facebook, and WhatsApp',
      formats: ['ZIP'],
      icon: Smartphone
    }
  ];

  return (
    <div className="space-y-6">
      {materials.map((material) => {
        const Icon = material.icon;
        return (
          <div key={material.title} className="bg-white p-6 rounded-lg border">
            <div className="flex items-start space-x-4">
              <Icon className="w-8 h-8 text-red-900" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{material.title}</h4>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <div className="flex space-x-2">
                  {material.formats.map((format) => (
                    <button
                      key={format}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-900 text-red-900 rounded hover:bg-red-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {format}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}