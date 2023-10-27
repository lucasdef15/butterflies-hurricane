import { createContext, useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from '../utils/axiosInstance';

export interface User {
  user: {
    id: string;
    email: string;
    name: string;
    base64Img: string;
    role: string;
  } | null;
  loading: boolean;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: (navigate: NavigateFunction) => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
}

const initialState: User = {
  user: null,
  loading: true,
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(initialState);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  if (token) {
    //set all of request headers to have this configuration
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/auth/currentUser`);

      if (response.data && response.data.user) {
        setUser({
          user: {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            base64Img: response.data.user.base64Img,
            role: response.data.user.role,
          },
          loading: false,
        });
      } else if (response.data && response.data.errors.length) {
        await axios.post(`/auth/logout`);
        setUser({ user: null, loading: false });
        history.pushState('', '', '/');
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({ user: null, loading: false });
    }
  }, [token]);

  const handleLogout = async (navigate: NavigateFunction) => {
    try {
      await axios.post(`/auth/logout`);
      setUser({ user: null, loading: false });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: UserContextValue = {
    user,
    setUser,
    handleLogout,
    isAdmin,
    setIsAdmin,
    fetchUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
