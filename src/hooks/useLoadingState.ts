import React, { useState } from 'react';

function useLoadingState() {
  const [loadingList, setLoadingList] = useState<string[]>([]);
  function setLoading(id: string, loading = true) {
    if (loading) {
      loadingList.push(id);
      setLoadingList([].concat(loadingList));
    } else {
      loadingList.splice(loadingList.indexOf(id), 1);
      setLoadingList([].concat(loadingList));
    }
  }

  async function trackLoading(p: Promise<any> | Promise<any>[], id: string) {
    setLoading(id, true)
    try {
      if (Array.isArray(p)) {
        await Promise.all(p);
      } else {
        await p;
      }
    } finally {
      setLoading(id, false);
    }
  }

  function isLoading(id: string): boolean {
    return loadingList.includes(id);
  }

  return {
    setLoading,
    isLoading,
    trackLoading,
    loadingList
  };
}

export default useLoadingState;