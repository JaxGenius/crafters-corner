import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [test, setTest] = useState('test');

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, displayName, setDisplayName, test, setTest }}>
      {children}
    </AppContext.Provider>
  );
};