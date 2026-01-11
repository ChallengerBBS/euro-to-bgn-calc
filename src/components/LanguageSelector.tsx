import React from 'react';
import type { Language } from '../translations';

interface LanguageSelectorProps {
    language: Language;
    onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
    return (
        <div className="language-selector">
            <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => onLanguageChange('en')}
                aria-label="Switch to English"
                title="English"
            >
                <span className="flag-icon flag-gb">GB</span>
            </button>
            <button
                className={`lang-btn ${language === 'bg' ? 'active' : ''}`}
                onClick={() => onLanguageChange('bg')}
                aria-label="Превключи на български"
                title="Български"
            >
                <span className="flag-icon flag-bg">BG</span>
            </button>
        </div>
    );
};

export default LanguageSelector;
