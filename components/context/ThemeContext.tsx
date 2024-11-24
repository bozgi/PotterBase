import React, { createContext, useState, ReactNode } from 'react';
import { getThemeColors, House } from './themes';

interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  house: House;
  mode: "light" | "dark";
}

interface ThemeContextType {
  theme: Theme;
  setHouse: (house: House) => void;
  setMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    background: '#F1C6B5',
    text: '#7A1D1D',
    primary: '#9C2A2B',
    secondary: '#F1A2A1',
    house: 'gryffindor',
    mode: 'light',       
  });

  const setHouse = (house: House) => {
    const newTheme = getThemeColors(house, theme.mode);
    setTheme((prevTheme) => ({
      ...prevTheme,
      house,
      ...newTheme,
    }));
  };

  const setMode = (mode: "light" | "dark") => {
    const newTheme = getThemeColors(theme.house, mode);
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setHouse, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  return context!;
};
