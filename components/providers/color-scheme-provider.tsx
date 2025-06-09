'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme, ColorSchemeOptions } from '@/lib/hooks/useColorScheme';
import type { ColorScheme } from '@/lib/colors';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme | undefined;
  isDark: boolean;
  setTheme: (theme: string) => void;
  applyScheme: (isDark?: boolean) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(undefined);

interface ColorSchemeProviderProps {
  children: ReactNode;
  options?: ColorSchemeOptions;
}

export function ColorSchemeProvider({ children, options = {} }: ColorSchemeProviderProps) {
  const colorSchemeValue = useColorScheme({
    ...options,
    applyImmediately: true,
  });

  return (
    <ColorSchemeContext.Provider value={colorSchemeValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useAppColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useAppColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
} 