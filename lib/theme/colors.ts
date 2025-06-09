import { darken, lighten } from '@mui/material/styles';

// Base color (deep blue)
export const BASE_COLOR = '#1A237E';

// Generate monochromatic color variations
export const generateMonochromaticPalette = (baseColor: string) => {
  return {
    50: lighten(baseColor, 0.85),
    100: lighten(baseColor, 0.7),
    200: lighten(baseColor, 0.5),
    300: lighten(baseColor, 0.3),
    400: lighten(baseColor, 0.15),
    500: baseColor,
    600: darken(baseColor, 0.15),
    700: darken(baseColor, 0.3),
    800: darken(baseColor, 0.45),
    900: darken(baseColor, 0.6),
  };
};

// Generate theme colors
export const generateThemeColors = (isDark: boolean) => {
  const monochromatic = generateMonochromaticPalette(BASE_COLOR);

  return {
    primary: {
      main: monochromatic[500],
      light: monochromatic[300],
      dark: monochromatic[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: monochromatic[400],
      light: monochromatic[200],
      dark: monochromatic[600],
      contrastText: '#ffffff',
    },
    background: {
      default: isDark ? monochromatic[900] : '#ffffff',
      paper: isDark ? monochromatic[800] : '#f5f5f5',
    },
    text: {
      primary: isDark ? monochromatic[100] : monochromatic[900],
      secondary: isDark ? monochromatic[200] : monochromatic[800],
    },
  };
}; 