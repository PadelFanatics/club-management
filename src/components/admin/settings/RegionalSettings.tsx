import React from 'react';
import { currencyOptions, timezoneOptions } from '../../../utils/regionOptions';

interface RegionalSettingsProps {
  currency: string;
  timezone: string;
  onCurrencyChange: (currency: string) => void;
  onTimezoneChange: (timezone: string) => void;
}

export function RegionalSettings({
  currency,
  timezone,
  onCurrencyChange,
  onTimezoneChange
}: RegionalSettingsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {currencyOptions.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.label} - {curr.countries.join(', ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <select
          value={timezone}
          onChange={(e) => onTimezoneChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {timezoneOptions.map((region) => (
            <optgroup key={region.region} label={region.region}>
              {region.zones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label} - {zone.country}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}