//! File: src/types/index.ts

export interface Theme {
  id: string;
  name: string;
  description: string;
}


export interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}