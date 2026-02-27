/* components/Glass.jsx — atomic glass card wrapper */
export const Glass = ({ children, className = '', style = {} }) => (
    <div className={`glass ${className}`} style={style}>
        {children}
    </div>
);

/* components/Spinner.jsx */
export const Spinner = () => (
    <div className="spinner" aria-label="Loading" />
);

/* components/StatusBadge.jsx */
export const StatusBadge = ({ ok, label }) => (
    <span className={`badge ${ok ? 'badge-ok' : 'badge-err'}`}>{label}</span>
);

/* components/LangSelect.jsx */
export const LangSelect = ({ value, onChange }) => (
    <select
        id="lang-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="lang-select"
    >
        <option value="">Auto</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
    </select>
);

/* components/ErrorBanner.jsx */
export const ErrorBanner = ({ message }) =>
    message ? <div className="error-banner">⚠ {message}</div> : null;

/* components/ApiKeyBar.jsx */
import { useState } from 'react';

export const ApiKeyBar = ({ apiKey, onSave }) => {
    const [draft, setDraft] = useState(apiKey);

    return (
        <div className="apikey-bar glass">
            <span className="apikey-label">🔑 API Key</span>
            <input
                id="apikey-input"
                type="password"
                value={draft}
                placeholder="Enter X-API-Key…"
                onChange={(e) => setDraft(e.target.value)}
                className="apikey-input"
            />
            <button
                id="apikey-save"
                className="btn btn-sm"
                onClick={() => onSave(draft)}
            >
                Save
            </button>
        </div>
    );
};
