import React from 'react';
import type { ConversionHistory } from '../types';
import { formatCurrency, formatTime } from '../types';

interface HistoryPanelProps {
    history: ConversionHistory[];
    onClear: () => void;
    translations: {
        history: string;
        clearAll: string;
        emptyHistory: string;
        emptyHistorySubtext: string;
        amountGiven: string;
        productPrice: string;
        change: string;
    };
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear, translations }) => {
    return (
        <div className="history-section">
            <div className="history-card glass-card">
                <div className="history-header">
                    <h2 className="card-title">
                        <span className="card-icon">📊</span>
                        {translations.history}
                    </h2>
                    {history.length > 0 && (
                        <button className="clear-btn" onClick={onClear}>
                            {translations.clearAll}
                        </button>
                    )}
                </div>

                <div className="history-list">
                    {history.length === 0 ? (
                        <div className="empty-history">
                            <div className="empty-history-icon">💰</div>
                            <p className="empty-history-text">
                                {translations.emptyHistory}<br />
                                {translations.emptyHistorySubtext}
                            </p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div key={item.id} className="history-item">
                                <div className="history-timestamp">
                                    {formatTime(item.timestamp)}
                                </div>
                                <div className="history-details">
                                    <div className="history-row">
                                        <span className="history-row-label">{translations.amountGiven}:</span>
                                        <span className="history-row-value">
                                            {formatCurrency(item.amountGiven, item.currencyGiven)}
                                        </span>
                                    </div>
                                    <div className="history-row">
                                        <span className="history-row-label">{translations.productPrice}:</span>
                                        <span className="history-row-value">
                                            {formatCurrency(item.productPrice, item.currencyPrice)}
                                        </span>
                                    </div>
                                    <div className="history-divider"></div>
                                    <div className="history-row">
                                        <span className="history-row-label">{translations.change}:</span>
                                        <span className="history-change">
                                            {formatCurrency(item.change, item.currencyChange)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPanel;
