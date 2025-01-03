// Top 20 countries where padel is popular and their currencies
export const currencyOptions = [
  { code: 'EUR', label: 'Euro (€)', countries: ['Spain', 'Italy', 'France', 'Portugal', 'Netherlands'] },
  { code: 'SEK', label: 'Swedish Krona (kr)', countries: ['Sweden'] },
  { code: 'GBP', label: 'British Pound (£)', countries: ['United Kingdom'] },
  { code: 'AED', label: 'UAE Dirham (د.إ)', countries: ['United Arab Emirates'] },
  { code: 'QAR', label: 'Qatari Riyal (ر.ق)', countries: ['Qatar'] },
  { code: 'SAR', label: 'Saudi Riyal (ر.س)', countries: ['Saudi Arabia'] },
  { code: 'ARS', label: 'Argentine Peso ($)', countries: ['Argentina'] },
  { code: 'BRL', label: 'Brazilian Real (R$)', countries: ['Brazil'] },
  { code: 'MXN', label: 'Mexican Peso ($)', countries: ['Mexico'] },
  { code: 'USD', label: 'US Dollar ($)', countries: ['United States'] },
  { code: 'NOK', label: 'Norwegian Krone (kr)', countries: ['Norway'] },
  { code: 'DKK', label: 'Danish Krone (kr)', countries: ['Denmark'] },
  { code: 'CHF', label: 'Swiss Franc (Fr)', countries: ['Switzerland'] },
  { code: 'PLN', label: 'Polish Złoty (zł)', countries: ['Poland'] },
  { code: 'EGP', label: 'Egyptian Pound (£)', countries: ['Egypt'] },
  { code: 'KWD', label: 'Kuwaiti Dinar (د.ك)', countries: ['Kuwait'] },
  { code: 'BHD', label: 'Bahraini Dinar (.د.ب)', countries: ['Bahrain'] },
  { code: 'OMR', label: 'Omani Rial (ر.ع.)', countries: ['Oman'] },
  { code: 'CLP', label: 'Chilean Peso ($)', countries: ['Chile'] },
  { code: 'UYU', label: 'Uruguayan Peso ($)', countries: ['Uruguay'] }
];

// Common timezones grouped by region
export const timezoneOptions = [
  {
    region: 'Europe',
    zones: [
      { value: 'Europe/Madrid', label: 'Madrid (UTC+1)', country: 'Spain' },
      { value: 'Europe/Paris', label: 'Paris (UTC+1)', country: 'France' },
      { value: 'Europe/Rome', label: 'Rome (UTC+1)', country: 'Italy' },
      { value: 'Europe/Stockholm', label: 'Stockholm (UTC+1)', country: 'Sweden' },
      { value: 'Europe/London', label: 'London (UTC+0)', country: 'United Kingdom' },
      { value: 'Europe/Amsterdam', label: 'Amsterdam (UTC+1)', country: 'Netherlands' },
      { value: 'Europe/Oslo', label: 'Oslo (UTC+1)', country: 'Norway' },
      { value: 'Europe/Copenhagen', label: 'Copenhagen (UTC+1)', country: 'Denmark' },
      { value: 'Europe/Zurich', label: 'Zurich (UTC+1)', country: 'Switzerland' },
      { value: 'Europe/Warsaw', label: 'Warsaw (UTC+1)', country: 'Poland' }
    ]
  },
  {
    region: 'Middle East',
    zones: [
      { value: 'Asia/Dubai', label: 'Dubai (UTC+4)', country: 'UAE' },
      { value: 'Asia/Qatar', label: 'Doha (UTC+3)', country: 'Qatar' },
      { value: 'Asia/Riyadh', label: 'Riyadh (UTC+3)', country: 'Saudi Arabia' },
      { value: 'Asia/Kuwait', label: 'Kuwait City (UTC+3)', country: 'Kuwait' },
      { value: 'Asia/Bahrain', label: 'Manama (UTC+3)', country: 'Bahrain' },
      { value: 'Asia/Muscat', label: 'Muscat (UTC+4)', country: 'Oman' }
    ]
  },
  {
    region: 'Americas',
    zones: [
      { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (UTC-3)', country: 'Argentina' },
      { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)', country: 'Brazil' },
      { value: 'America/Mexico_City', label: 'Mexico City (UTC-6)', country: 'Mexico' },
      { value: 'America/Santiago', label: 'Santiago (UTC-4)', country: 'Chile' },
      { value: 'America/Montevideo', label: 'Montevideo (UTC-3)', country: 'Uruguay' }
    ]
  }
];