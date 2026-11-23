import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'admin@ahoradosul.com.br';
const ADMIN_SENHA = '99y!DlS&7j';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('ptf_token'));

  const login = async (email, senha) => {
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      const token = btoa(`${email}:${Date.now()}`);
      setToken(token);
      sessionStorage.setItem('ptf_token', token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('ptf_token');
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
