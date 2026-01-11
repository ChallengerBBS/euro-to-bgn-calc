import React from 'react';
import type { Currency } from '../types';
import CurrencyToggle from './CurrencyToggle';

interface CurrencyInputProps {
    label: string;
    value: string;
    currency: Currency;
    onValueChange: (value: string) => void;
    onCurrencyChange: (currency: Currency) => void;
    placeholder?: string;
    id: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    label,
    value,
    currency,
    onValueChange,
    onCurrencyChange,
    placeholder = '0.00',
    id,
}) => {
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Allow only numbers and one decimal point
        if (inputValue === '' || /^\d*\.?\d{0,2}$/.test(inputValue)) {
            onValueChange(inputValue);
        }
    };

    return (
        <div className="input-group">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <div className="currency-input-wrapper">
                <div className="currency-input-main">
                    <input
                        id={id}
                        type="text"
                        inputMode="decimal"
                        className="input-field"
                        value={value}
                        onChange={handleValueChange}
                        placeholder={placeholder}
                    />
                </div>
                <CurrencyToggle
                    id={`${id}-toggle`}
                    value={currency}
                    onChange={onCurrencyChange}
                />
            </div>
        </div>
    );
};

export default CurrencyInput;
