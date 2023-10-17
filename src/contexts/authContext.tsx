import { createContext, useState, useContext } from 'react';
// import axios from '../utils/axiosInstance';

interface AuthContextValues {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>('');

  const contextValues: AuthContextValues = {
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
