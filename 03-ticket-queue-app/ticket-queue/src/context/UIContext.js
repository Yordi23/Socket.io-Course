import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const showMenu = () => {
    setIsMenuHidden(false);
  };
  const hideMenu = () => {
    setIsMenuHidden(true);
  };
  return (
    <UIContext.Provider
      value={{
        isMenuHidden,
        hideMenu,
        showMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
