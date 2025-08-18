//! File: src/components/context/ThemeContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "@/lib/themes";
import { Theme, ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[3]); // Default to Ocean Breeze
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("blog-theme");
    if (savedTheme) {
      const theme = themes.find((t) => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("blog-theme", theme.id);
    document.documentElement.setAttribute("data-theme", theme.id);
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", currentTheme.id);
    }
  }, [currentTheme, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-theme-bg" />;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <div className="theme-transition">{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
