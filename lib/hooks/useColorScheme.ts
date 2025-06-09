'use client';

import { useEffect, useState } from 'react';
import { generateColorScheme, generateSchemeFromImage, applyColorScheme } from '../colors';
import { useTheme } from 'next-themes';

export interface ColorSchemeOptions {
  sourceColor?: string;
  sourceImage?: string;
  applyImmediately?: boolean;
}

/**
 * Hook to manage Material Design 3 color scheme
 * @param options - Configuration options
 * @returns Object containing color scheme and utility functions
 */
export function useColorScheme(options: ColorSchemeOptions = {}) {
  const { theme, setTheme } = useTheme();
  const [colorScheme, setColorScheme] = useState(() => 
    options.sourceColor ? generateColorScheme(options.sourceColor) : undefined
  );

  // Generate color scheme from source color or image
  useEffect(() => {
    async function generateScheme() {
      try {
        let newScheme;
        if (options.sourceImage) {
          newScheme = await generateSchemeFromImage(options.sourceImage);
        } else if (options.sourceColor) {
          newScheme = generateColorScheme(options.sourceColor);
        }

        if (newScheme) {
          setColorScheme(newScheme);
          if (options.applyImmediately) {
            applyColorScheme(newScheme, theme === 'dark');
          }
        }
      } catch (error) {
        console.error('Error generating color scheme:', error);
      }
    }

    generateScheme();
  }, [options.sourceColor, options.sourceImage, options.applyImmediately, theme]);

  // Apply color scheme when theme changes
  useEffect(() => {
    if (colorScheme && options.applyImmediately) {
      applyColorScheme(colorScheme, theme === 'dark');
    }
  }, [colorScheme, theme, options.applyImmediately]);

  return {
    colorScheme,
    isDark: theme === 'dark',
    setTheme,
    applyScheme: (isDark?: boolean) => {
      if (colorScheme) {
        applyColorScheme(colorScheme, isDark ?? theme === 'dark');
      }
    },
  };
} 