export type Currency = 'EUR' | 'BGN';

export interface ConversionHistory {
  id: string;
  timestamp: Date;
  amountGiven: number;
  currencyGiven: Currency;
  productPrice: number;
  currencyPrice: Currency;
  change: number;
  currencyChange: Currency;
}

export const EXCHANGE_RATE = 1.95583; // Fixed EUR to BGN rate

export const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
  if (from === to) return amount;
  if (from === 'EUR' && to === 'BGN') return amount * EXCHANGE_RATE;
  if (from === 'BGN' && to === 'EUR') return amount / EXCHANGE_RATE;
  return amount;
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
};
