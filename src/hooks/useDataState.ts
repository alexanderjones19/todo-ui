import React, { useState } from 'react';

function useDataState() {
  const [dataState, setDataState] = useState<{[key: string]: any}>({});
  function setData(key: string, data: any) {
    const dataValue = dataState[key];
    const updatedValue = {...dataValue, ...data};
    dataState[key] = updatedValue;
    setDataState({...dataState});
  }

  async function trackData(p: Promise<any> | Promise<any>[], key: string, data: any, newData: any) {
    setData(key, data);
    if (Array.isArray(p)) {
      await Promise.all(p);
    } else {
      await p;
    }
    setData(key, newData);
  }

  async function catchData(p: Promise<any> | Promise<any>[], key: string, catchData: any) {
    try {
      if (Array.isArray(p)) {
        await Promise.all(p);
      } else {
        await p;
      }
    } catch (e) {
      setData(key, catchData);
      throw e;
    }
  }

  return {
    setData,
    data: dataState,
    trackData,
    catchData
  };
}

export default useDataState;