/* pages/IngestPage.jsx */
import { useState, useCallback } from 'react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { Glass, Spinner, ErrorBanner } from '../components';

const ResultCard = ({ data }) => (
    <Glass className="result-card fade-in">
        <div className="ingest-grid">
            <span>📄 File</span><strong>{data.filename}</strong>
            <span>🌐 Language</span><strong>{data.language_detected === 'ja' ? 'Japanese 🇯🇵' : 'English 🇺🇸'}</strong>
            <span>🧩 Chunks</span><strong>{data.chunks_indexed}</strong>
            <span>✅ Status</span><strong>{data.message}</strong>
        </div>
    </Glass>
);

export const IngestPage = ({ apiKey }) => {
    const [file, setFile] = useState(null);
    const fn = useCallback((f) => api.ingest(f, apiKey), [apiKey]);
    const { data, error, isLoading, execute } = useAsync(fn);

    const submit = () => file && execute(file);

    return (
        <section className="page">
            <h2 className="page-title">Ingest Document</h2>
            <Glass className="form-card">
                <label className="upload-zone" htmlFor="file-input">
                    {file ? `📄 ${file.name}` : '⬆ Drop or click to select a .txt file'}
                    <input
                        id="file-input"
                        type="file"
                        accept=".txt"
                        hidden
                        onChange={(e) => setFile(e.target.files[0] ?? null)}
                    />
                </label>
                <button id="ingest-submit" className="btn btn-primary" onClick={submit} disabled={!file || isLoading}>
                    {isLoading ? <Spinner /> : 'Ingest'}
                </button>
            </Glass>
            <ErrorBanner message={error} />
            {data && <ResultCard data={data} />}
        </section>
    );
};
