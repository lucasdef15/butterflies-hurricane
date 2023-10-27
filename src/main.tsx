import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { DataProvider as MainProvider } from './contexts/MainContext.tsx';
import { PostsDataProvider } from './contexts/PostsContext.tsx';
import './styles/GlobalStyles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <MainProvider>
        <PostsDataProvider>
          <App />
        </PostsDataProvider>
      </MainProvider>
    </UserProvider>
  </React.StrictMode>
);
