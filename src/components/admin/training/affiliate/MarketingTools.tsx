import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { getGHLTrackingLink, getGHLQRCode, getGHLEmbedCode } from '../../../../utils/ghl';

interface MarketingToolsProps {
  ghlConfig: {
    locationId: string;
    campaignId: string;
  };
}

export function MarketingTools({ ghlConfig }: MarketingToolsProps) {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'link' | 'qr' | 'embed'>('link');

  const trackingLink = getGHLTrackingLink(ghlConfig, 'stripe'); // Default to stripe
  const qrCodeUrl = getGHLQRCode(ghlConfig);
  const embedCode = getGHLEmbedCode(ghlConfig);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        {(['link', 'qr', 'embed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab 
                ? 'bg-red-900 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border">
        {activeTab === 'link' && (
          <>
            <h4 className="font-semibold mb-4">Your Tracking Link</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={trackingLink}
                readOnly
                className="flex-1 p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => handleCopy(trackingLink)}
                className="p-2 text-red-900 hover:text-red-950"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </>
        )}

        {activeTab === 'qr' && (
          <>
            <h4 className="font-semibold mb-4">QR Code</h4>
            <img src={qrCodeUrl} alt="Tracking QR Code" className="max-w-xs mx-auto" />
            <button
              onClick={() => handleCopy(qrCodeUrl)}
              className="mt-4 flex items-center space-x-2 text-red-900 hover:text-red-950"
            >
              <Copy className="w-5 h-5" />
              <span>Copy QR Code URL</span>
            </button>
          </>
        )}

        {activeTab === 'embed' && (
          <>
            <h4 className="font-semibold mb-4">Embed Code</h4>
            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                {embedCode}
              </pre>
              <button
                onClick={() => handleCopy(embedCode)}
                className="absolute top-2 right-2 p-2 text-red-900 hover:text-red-950"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}