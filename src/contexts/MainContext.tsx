import { createContext, useState } from 'react';

type MainContextValue = {
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isBlock: boolean;
  setIsBlock: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainContext = createContext<MainContextValue>({} as MainContextValue);

export function DataProvider({ children }: any) {
  const [isList, setIsList] = useState(false);
  const [isBlock, setIsBlock] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        isList,
        setIsList,
        isBlock,
        setIsBlock,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
