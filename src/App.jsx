/* App.jsx — routing shell */
import { useState } from 'react';
import { useApiKey } from './hooks/useApiKey';
import { ApiKeyBar } from './components';
import { HealthPage } from './pages/HealthPage';
import { IngestPage } from './pages/IngestPage';
import { RetrievePage } from './pages/RetrievePage';
import { GeneratePage } from './pages/GeneratePage';

const NAV = [
    { id: 'health', label: '⚡ Health', icon: '⚡' },
    { id: 'ingest', label: '📄 Ingest', icon: '📄' },
    { id: 'retrieve', label: '🔍 Retrieve', icon: '🔍' },
    { id: 'generate', label: '✦ Generate', icon: '✦' },
];

const PAGE = { health: HealthPage, ingest: IngestPage, retrieve: RetrievePage, generate: GeneratePage };

export default function App() {
    const [tab, setTab] = useState('health');
    const { apiKey, save } = useApiKey();
    const Current = PAGE[tab];

    return (
        <div className="app">
            <div className="orb orb-1" aria-hidden />
            <div className="orb orb-2" aria-hidden />
            <div className="orb orb-3" aria-hidden />

            <header className="header glass">
                <div className="brand">
                    <span className="brand-icon">✦</span>
                    <span className="brand-name">Acme <strong>AI</strong></span>
                    <span className="brand-sub">Clinical Knowledge Assistant</span>
                </div>
                <nav className="nav" role="navigation">
                    {NAV.map((n) => (
                        <button
                            key={n.id}
                            id={`nav-${n.id}`}
                            className={`nav-btn ${tab === n.id ? 'nav-btn-active' : ''}`}
                            onClick={() => setTab(n.id)}
                        >
                            {n.label}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="apikey-wrap">
                <ApiKeyBar apiKey={apiKey} onSave={save} />
            </div>

            <main className="main">
                <Current apiKey={apiKey} />
            </main>

            <footer className="footer">
                <span>© 2026 Acme AI Ltd. — RAG-Powered Bilingual Clinical System</span>
            </footer>
        </div>
    );
}
