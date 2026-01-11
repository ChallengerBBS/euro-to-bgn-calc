import { useState, useEffect } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInput';
import CurrencyToggle from './components/CurrencyToggle';
import HistoryPanel from './components/HistoryPanel';
import LanguageSelector from './components/LanguageSelector';
import type { Currency, ConversionHistory } from './types';
import { convertCurrency, EXCHANGE_RATE } from './types';
import { translations, type Language } from './translations';

const STORAGE_KEY_HISTORY = 'currency-calculator-history';
const STORAGE_KEY_LANGUAGE = 'currency-calculator-language';

function App() {
  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
    return (saved === 'bg' || saved === 'en') ? saved : 'en';
  });

  const t = translations[language];

  // State for inputs
  const [amountGiven, setAmountGiven] = useState<string>('');
  const [currencyGiven, setCurrencyGiven] = useState<Currency>('EUR');

  const [productPrice, setProductPrice] = useState<string>('');
  const [currencyPrice, setCurrencyPrice] = useState<Currency>('EUR');

  const [currencyChange, setCurrencyChange] = useState<Currency>('EUR');

  // History state with localStorage
  const [history, setHistory] = useState<ConversionHistory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((item: ConversionHistory) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANGUAGE, language);
  }, [language]);

  // Calculate change
  const calculateChange = (): number => {
    const given = parseFloat(amountGiven) || 0;
    const price = parseFloat(productPrice) || 0;

    // Convert both to the same currency (change currency)
    const givenInChangeCurrency = convertCurrency(given, currencyGiven, currencyChange);
    const priceInChangeCurrency = convertCurrency(price, currencyPrice, currencyChange);

    return Math.max(0, givenInChangeCurrency - priceInChangeCurrency);
  };

  const change = calculateChange();

  // Add to history
  const addToHistory = () => {
    if (!amountGiven || !productPrice) return;

    const newEntry: ConversionHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      amountGiven: parseFloat(amountGiven),
      currencyGiven,
      productPrice: parseFloat(productPrice),
      currencyPrice,
      change,
      currencyChange,
    };

    setHistory([newEntry, ...history]);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Handle calculate button
  const handleCalculate = () => {
    addToHistory();
  };

  return (
    <>
      <LanguageSelector language={language} onLanguageChange={setLanguage} />

      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">{t.appTitle}</h1>
          <p className="app-subtitle">{t.appSubtitle}</p>
        </header>

        <div className="calculator-section">
          {/* Input Section */}
          <div className="calculator-card glass-card">
            <h2 className="card-title">
              <span className="card-icon">💵</span>
              {t.transactionDetails}
            </h2>

            <CurrencyInput
              id="amount-given"
              label={t.amountGiven}
              value={amountGiven}
              currency={currencyGiven}
              onValueChange={setAmountGiven}
              onCurrencyChange={setCurrencyGiven}
              placeholder="0.00"
            />

            <CurrencyInput
              id="product-price"
              label={t.productPrice}
              value={productPrice}
              currency={currencyPrice}
              onValueChange={setProductPrice}
              onCurrencyChange={setCurrencyPrice}
              placeholder="0.00"
            />

            {/* Change Field - Readonly */}
            <div className="input-group">
              <label htmlFor="change-amount" className="input-label">
                {t.changeToReturn}
              </label>
              <div className="currency-input-wrapper">
                <div className="currency-input-main">
                  <input
                    id="change-amount"
                    type="text"
                    className="input-field input-readonly"
                    value={change.toFixed(2)}
                    readOnly
                    placeholder="0.00"
                  />
                </div>
                <CurrencyToggle
                  id="change-currency-toggle"
                  value={currencyChange}
                  onChange={setCurrencyChange}
                />
              </div>
            </div>


            <button
              className="btn btn-primary"
              onClick={handleCalculate}
              style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
            >
              {t.calculateButton}
            </button>

            <div className="exchange-rate-info">
              <div className="exchange-rate-label">{t.exchangeRate}</div>
              <div className="exchange-rate-value">1 EUR = {EXCHANGE_RATE} BGN</div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <HistoryPanel
          history={history}
          onClear={clearHistory}
          translations={{
            history: t.history,
            clearAll: t.clearAll,
            emptyHistory: t.emptyHistory,
            emptyHistorySubtext: t.emptyHistorySubtext,
            amountGiven: t.amountGiven,
            productPrice: t.productPrice,
            change: t.change,
          }}
        />
      </div>
    </>
  );
}

export default App;
