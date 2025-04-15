
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types';

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // Update document classes and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // First remove all theme classes
    root.classList.remove('light', 'dark', 'theme-vibe');
    
    // Apply the current theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'vibe') {
      root.classList.add('theme-vibe');
    } else {
      root.classList.add('light');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
