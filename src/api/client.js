/* api/client.js — centralised fetch wrapper, no try/catch */

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const headers = (apiKey, extra = {}) => ({
    'X-API-Key': apiKey,
    ...extra,
});

const handle = (res) =>
    res.ok ? res.json() : res.json().then((e) => Promise.reject(e.detail ?? 'Request failed'));

export const api = {
    health: () =>
        fetch(`${BASE}/health`).then(handle),

    ingest: (file, apiKey) => {
        const body = new FormData();
        body.append('file', file);
        return fetch(`${BASE}/ingest`, { method: 'POST', headers: headers(apiKey), body }).then(handle);
    },

    retrieve: (query, output_language, apiKey) =>
        fetch(`${BASE}/retrieve`, {
            method: 'POST',
            headers: headers(apiKey, { 'Content-Type': 'application/json' }),
            body: JSON.stringify({ query, output_language: output_language || undefined }),
        }).then(handle),

    generate: (query, output_language, apiKey) =>
        fetch(`${BASE}/generate`, {
            method: 'POST',
            headers: headers(apiKey, { 'Content-Type': 'application/json' }),
            body: JSON.stringify({ query, output_language: output_language || undefined }),
        }).then(handle),
};
