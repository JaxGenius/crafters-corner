import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userID, setUserID] = useState('');

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, displayName, setDisplayName, userID, setUserID }}>
      {children}
    </AppContext.Provider>
  );
};