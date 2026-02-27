/* hooks/useApiKey.js — persisted API key context */
import { useState } from 'react';

export const useApiKey = () => {
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('acme_api_key') ?? '');

    const save = (key) => {
        localStorage.setItem('acme_api_key', key);
        setApiKey(key);
    };

    return { apiKey, save };
};
