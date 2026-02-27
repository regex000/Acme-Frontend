/* hooks/useAsync.js — generic async state machine */
import { useState, useCallback } from 'react';

const IDLE = { status: 'idle', data: null, error: null };

export const useAsync = (asyncFn) => {
    const [state, setState] = useState(IDLE);

    const execute = useCallback(
        (...args) => {
            setState({ status: 'loading', data: null, error: null });
            return asyncFn(...args)
                .then((data) => setState({ status: 'success', data, error: null }))
                .catch((err) => setState({ status: 'error', data: null, error: err?.message ?? String(err) }));
        },
        [asyncFn]
    );

    const reset = () => setState(IDLE);

    return { ...state, execute, reset, isLoading: state.status === 'loading' };
};
