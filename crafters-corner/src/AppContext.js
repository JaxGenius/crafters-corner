import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userID, setUserID] = useState('');
  const [balance, setBalance] = useState(0);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, displayName, setDisplayName, userID, setUserID, balance, setBalance }}>
      {children}
    </AppContext.Provider>
  );
};