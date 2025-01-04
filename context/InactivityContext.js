import React, { createContext, useEffect, useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

const InactivityContext = createContext();

export const InactivityProvider = ({ children }) => {
  const navigation = useNavigation();
  const inactivityTimer = useRef(null);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Démarrer un nouveau timer pour rediriger après 5 secondes d'inactivité
    inactivityTimer.current = setTimeout(() => {
      navigation.navigate('Lock');
    }, 300000); // 5 minutes
  };

  useEffect(() => {
    resetInactivityTimer();

    // Nettoyage du timer au démontage du composant
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  return (
    <InactivityContext.Provider value={resetInactivityTimer}>
      {children}
    </InactivityContext.Provider>
  );
};

export const useInactivity = () => useContext(InactivityContext);