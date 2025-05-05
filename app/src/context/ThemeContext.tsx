// src/context/ThemeContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeColors {
  text: string;
  placeholder: string;
  background: string;
  primary: string;
  secondary: string;
  border: string;
  cardBackground: string;
  link: string;
  error: string;
  success: string;
  danger: string;
  divider: string;
  toastText: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
}

const lightColors: ThemeColors = {
  text: "#5B31B8",
  placeholder: "#7A7A7A",
  background: "#F5F5F5",
  primary: "#6A4BC7",
  secondary: "#5C4A9E",
  border: "#7E5CCF",
  cardBackground: "#FFFFFF",
  link: "#1A73E8",
  error: "#EF5350",
  success: "#66BB6A",
  danger: "#F44336",
  divider: "#B0BEC5",
  toastText: "#000",
};

const darkColors: ThemeColors = {
  text: "#6F3DE4",
  placeholder: "#A29EA8",
  background: "#121212",
  primary: "#361E6E",
  secondary: "#2D195C",
  border: "#44258B",
  cardBackground: "#1a1a1a",
  link: "#8AB4F8",
  error: "#D32F2F",
  success: "#4CAF50",
  danger: "#D32F2F",
  divider: "#402484",
  toastText: "#FFF",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [colors, setColors] = useState<ThemeColors>(lightColors);

  const setTheme = async (newTheme: Theme) => {
    await AsyncStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    setThemeState(theme);
    setColors(theme === "light" ? lightColors : darkColors);
  };

  const loadTheme = async () => {
    const storedTheme = await AsyncStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      applyTheme(storedTheme);
    } else {
      applyTheme("light");
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};

export default ThemeProvider;
