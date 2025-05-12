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
  white: string;
  black: string;
  themeColor: string;
  gray: string;
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
  toastText: "#000000",
  white: "#FFFFFF",
  black: "#000000",
  themeColor: "#FFFFFF",
  gray: "#7A7A7A",
};

const darkColors: ThemeColors = {
  text: "#7D57D0",
  placeholder: "#A29EA8",
  background: "#121212",
  primary: "#6A4BC7",
  secondary: "#2D195C",
  border: "#6F3DE4",
  cardBackground: "#1A1A1A",
  link: "#8AB4F8",
  error: "#EF5350",
  success: "#66BB6A",
  danger: "#F44336",
  divider: "#4D2D9D",
  toastText: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  themeColor: "#000000",
  gray: "#7A7A7A",
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
