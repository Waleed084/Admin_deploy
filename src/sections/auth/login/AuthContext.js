// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [waleedState, setWaleedState] = useState(false);

  // Load waleedState from local storage on component mount
  useEffect(() => {
    const storedWaleedState = localStorage.getItem('waleedState');
    if (storedWaleedState) {
      setWaleedState(JSON.parse(storedWaleedState));
    }
  }, []);

  // Save waleedState to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('waleedState', JSON.stringify(waleedState));
  }, [waleedState]);

  const value = {
    waleedState,
    setWaleedState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired // Prop validation for children
  };
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
