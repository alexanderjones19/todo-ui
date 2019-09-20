import React, { useState } from 'react';

import useDataState from './useDataState';

type AsyncState = {
  loading?: boolean;
  error?: boolean;
}

const useAsyncState = function() {
  const [asyncState, setAsyncState] = useState<{[key: string]: AsyncState}>({});

  function setError(key: string, error: boolean) {
    let state: AsyncState = asyncState[key] || {};
    state.error = error;
    asyncState[key] = state;
    setAsyncState({...asyncState});
  }

  function setLoading(key: string, loading: boolean) {
    let state: AsyncState = asyncState[key] || {};
    state.loading = loading;
    asyncState[key] = state;
    setAsyncState({...asyncState});
  }

  async function trackAsyncState(p: Promise<any>, key: string) {
    setLoading(key, true);
    setError(key, false);
    try {
      await p;
    } catch (e) {
      setError(key, true);
      throw e;
    } finally {
      setLoading(key, false);
    }
  }

  return {
    trackAsyncState,
    asyncState
  }
}

export default useAsyncState;