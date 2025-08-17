//! File: src/types/index.ts

//* Types support for theme

export type Theme = "ruby" | "ember" | "moss" | "breeze" | "honey" | "mocha"

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themes: Array<{id: Theme; name: string; description: string}>
}