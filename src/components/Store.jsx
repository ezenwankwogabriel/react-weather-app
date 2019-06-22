import React, { createContext, useState } from 'react';

export const GlobalStoreContext = createContext({
  tInC: true,
  isAppLoaded: false,
  isWeatherLoaded: false,
  latitude: 0,
  longitude: 0,
  city: null,
  address: null,
  JSON: {},
  searchTerm: null
});

function Store ({children}) {
  const [globalStore, setGlobalStore] = useState({
    tInC: true,
    isAppLoaded: false,
    isWeatherLoaded: false,
    latitude: 0,
    longitude: 0,
    city: null,
    address: null,
    JSON: {},
    searchTerm: null
  });
  return (
    <GlobalStoreContext.Provider value={[globalStore, setGlobalStore]}>
      {children}
    </GlobalStoreContext.Provider>
  );
}

export default Store;