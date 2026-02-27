/* pages/RetrievePage.jsx */
import { useState, useCallback } from 'react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { Glass, Spinner, LangSelect, ErrorBanner } from '../components';

const ChunkCard = ({ chunk, index }) => (
    <Glass className="chunk-card fade-in">
        <div className="chunk-header">
            <span className="chunk-index">#{index + 1}</span>
            <span className="chunk-meta">{chunk.source} · {chunk.language.toUpperCase()} · chunk {chunk.chunk_index}</span>
            <span className="chunk-score">{(chunk.score * 100).toFixed(1)}%</span>
        </div>
        <p className="chunk-text">{chunk.text}</p>
    </Glass>
);

export const RetrievePage = ({ apiKey }) => {
    const [query, setQuery] = useState('');
    const [lang, setLang] = useState('');
    const fn = useCallback((q, l) => api.retrieve(q, l, apiKey), [apiKey]);
    const { data, error, isLoading, execute } = useAsync(fn);

    const submit = () => query.trim() && execute(query, lang);

    return (
        <section className="page">
            <h2 className="page-title">Semantic Retrieval</h2>
            <Glass className="form-card">
                <textarea
                    id="retrieve-query"
                    className="query-input"
                    rows={3}
                    placeholder="Ask a clinical question…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="form-row">
                    <LangSelect value={lang} onChange={setLang} />
                    <button id="retrieve-submit" className="btn btn-primary" onClick={submit} disabled={!query.trim() || isLoading}>
                        {isLoading ? <Spinner /> : 'Retrieve'}
                    </button>
                </div>
            </Glass>
            <ErrorBanner message={error} />
            {data?.results?.map((c, i) => <ChunkCard key={`${c.source}-${c.chunk_index}-${i}`} chunk={c} index={i} />)}
        </section>
    );
};
