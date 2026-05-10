export const sampleAssets = [
  {
    id: 1,
    name: 'MSCI World ETF',
    category: 'STOCK',
    currentValue: 5000,
    purchasePrice: 4200,
    quantity: 10.5,
    currency: 'EUR',
    purchaseDate: '2024-01-15',
    notes: 'Hauptinvestment'
  },
  {
    id: 2,
    name: 'Apple Inc.',
    category: 'STOCK',
    currentValue: 2150,
    purchasePrice: 1800,
    quantity: 12,
    currency: 'EUR',
    purchaseDate: '2023-06-04',
    notes: 'Langfristige Position'
  },
  {
    id: 3,
    name: 'Bitcoin',
    category: 'CRYPTO',
    currentValue: 8200,
    purchasePrice: 6500,
    quantity: 0.15,
    currency: 'EUR',
    purchaseDate: '2023-11-22',
    notes: 'Spekulativ'
  },
  {
    id: 4,
    name: 'Ethereum',
    category: 'CRYPTO',
    currentValue: 1900,
    purchasePrice: 2400,
    quantity: 0.8,
    currency: 'EUR',
    purchaseDate: '2024-03-10',
    notes: 'Aktuell im Minus'
  },
  {
    id: 5,
    name: 'Tagesgeldkonto',
    category: 'CASH',
    currentValue: 7500,
    purchasePrice: 7500,
    quantity: 1,
    currency: 'EUR',
    purchaseDate: '2024-01-01',
    notes: 'Notgroschen'
  },
  {
    id: 6,
    name: 'Eigentumswohnung Berlin',
    category: 'REAL_ESTATE',
    currentValue: 285000,
    purchasePrice: 240000,
    quantity: 1,
    currency: 'EUR',
    purchaseDate: '2021-09-01',
    notes: 'Eigennutzung'
  },
  {
    id: 7,
    name: 'Tesla Inc.',
    category: 'STOCK',
    currentValue: 1240,
    purchasePrice: 1500,
    quantity: 5,
    currency: 'EUR',
    purchaseDate: '2024-05-08',
    notes: 'Volatil'
  }
]

export const CATEGORY_META = {
  STOCK:       { label: 'Aktien',     color: '#4ade80' },
  CRYPTO:      { label: 'Krypto',     color: '#fbbf24' },
  CASH:        { label: 'Bargeld',    color: '#60a5fa' },
  REAL_ESTATE: { label: 'Immobilien', color: '#c084fc' }
}
