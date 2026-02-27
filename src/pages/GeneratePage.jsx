/* pages/GeneratePage.jsx */
import { useState, useCallback } from 'react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { Glass, Spinner, LangSelect, ErrorBanner } from '../components';

const SourceChip = ({ source, lang, idx }) => (
    <span className="source-chip">{idx + 1}. {source} <em>({lang})</em></span>
);

const GenerateResult = ({ data }) => (
    <Glass className="generate-result fade-in">
        <div className="generate-meta">
            <span>🤖 {data.model_used}</span>
        </div>
        <p className="generate-response">{data.response}</p>
        <div className="sources-section">
            <span className="sources-label">Sources</span>
            <div className="sources-list">
                {data.sources.map((s, i) => (
                    <SourceChip key={i} source={s.source} lang={s.language} idx={i} />
                ))}
            </div>
        </div>
    </Glass>
);

export const GeneratePage = ({ apiKey }) => {
    const [query, setQuery] = useState('');
    const [lang, setLang] = useState('');
    const fn = useCallback((q, l) => api.generate(q, l, apiKey), [apiKey]);
    const { data, error, isLoading, execute } = useAsync(fn);

    const submit = () => query.trim() && execute(query, lang);

    return (
        <section className="page">
            <h2 className="page-title">AI Generate</h2>
            <Glass className="form-card">
                <textarea
                    id="generate-query"
                    className="query-input"
                    rows={4}
                    placeholder="Ask a clinical question for AI-generated answer…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="form-row">
                    <LangSelect value={lang} onChange={setLang} />
                    <button id="generate-submit" className="btn btn-primary" onClick={submit} disabled={!query.trim() || isLoading}>
                        {isLoading ? <Spinner /> : '✦ Generate'}
                    </button>
                </div>
            </Glass>
            <ErrorBanner message={error} />
            {data && <GenerateResult data={data} />}
        </section>
    );
};
