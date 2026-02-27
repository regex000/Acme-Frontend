/* pages/HealthPage.jsx */
import { useEffect, useCallback } from 'react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { Glass, Spinner, StatusBadge, ErrorBanner } from '../components';

const Row = ({ label, value }) => (
    <div className="health-row">
        <span className="health-label">{label}</span>
        <span className="health-value">{value}</span>
    </div>
);

export const HealthPage = () => {
    const { data, error, isLoading, execute } = useAsync(useCallback(() => api.health(), []));

    useEffect(() => { execute(); }, [execute]);

    return (
        <section className="page">
            <h2 className="page-title">System Health</h2>
            <Glass className="health-card">
                {isLoading && <Spinner />}
                <ErrorBanner message={error} />
                {data && (
                    <>
                        <Row label="Status" value={<StatusBadge ok={data.status === 'healthy'} label={data.status} />} />
                        <Row label="FAISS Index" value={<StatusBadge ok={data.faiss_index_available} label={data.faiss_index_available ? 'Available' : 'Empty'} />} />
                        <Row label="Timestamp" value={new Date(data.timestamp).toLocaleString()} />
                    </>
                )}
            </Glass>
            <button id="health-refresh" className="btn" onClick={execute} disabled={isLoading}>
                ↺ Refresh
            </button>
        </section>
    );
};
