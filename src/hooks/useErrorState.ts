import React from 'react';

import useDataState from './useDataState';

function useErrorState() {
  const {
    data,
    catchData,
    setData
  } = useDataState();

  function setError(key: string, error: string | false = false) {
    setData(key, { error });
  }

  async function trackError(p: Promise<any> | Promise<any>[], key: string, error: string) {
    setError(key, false);
    await catchData(p, key, { error });
  }

  function getError(key: string): boolean | string {
    if (!data[key] || !data[key]['error']) {
      return false;
    }
    return data[key]['error'];
  }

  return {
    getError,
    trackError,
    setError
  };
}

export default useErrorState;