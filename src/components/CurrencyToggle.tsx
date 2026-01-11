import React from 'react';
import type { Currency } from '../types';

interface CurrencyToggleProps {
    value: Currency;
    onChange: (currency: Currency) => void;
    id: string;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ value, onChange, id }) => {
    const handleToggle = () => {
        onChange(value === 'EUR' ? 'BGN' : 'EUR');
    };

    return (
        <button
            id={id}
            className={`currency-toggle ${value === 'EUR' ? 'toggle-eur' : 'toggle-bgn'}`}
            onClick={handleToggle}
            type="button"
            aria-label="Toggle currency"
        >
            <span className="toggle-track">
                <span className="toggle-option toggle-option-left">BGN</span>
                <span className="toggle-option toggle-option-right">EUR</span>
                <span className="toggle-slider"></span>
            </span>
        </button>
    );
};

export default CurrencyToggle;
