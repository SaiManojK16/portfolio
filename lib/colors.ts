import { hslToHex, hexToHSL } from './utils/color-conversions';

/**
 * Material Design 3 Color System
 * Implements monochromatic color generation based on MD3 principles
 */

interface ColorRole {
  light: string;
  dark: string;
}

export interface ColorScheme {
  primary: ColorRole;
  onPrimary: ColorRole;
  primaryContainer: ColorRole;
  onPrimaryContainer: ColorRole;
  secondary: ColorRole;
  onSecondary: ColorRole;
  secondaryContainer: ColorRole;
  onSecondaryContainer: ColorRole;
  tertiary: ColorRole;
  onTertiary: ColorRole;
  tertiaryContainer: ColorRole;
  onTertiaryContainer: ColorRole;
  error: ColorRole;
  onError: ColorRole;
  errorContainer: ColorRole;
  onErrorContainer: ColorRole;
  surface: ColorRole;
  onSurface: ColorRole;
  surfaceVariant: ColorRole;
  onSurfaceVariant: ColorRole;
  outline: ColorRole;
  outlineVariant: ColorRole;
  inverseSurface: ColorRole;
  inverseOnSurface: ColorRole;
  inversePrimary: ColorRole;
  surfaceContainerLowest: ColorRole;
  surfaceContainerLow: ColorRole;
  surfaceContainer: ColorRole;
  surfaceContainerHigh: ColorRole;
  surfaceContainerHighest: ColorRole;
}

/**
 * Generates a monochromatic color scheme from a source color
 * @param sourceColor - Source color in hex format (e.g., "#7C4DFF")
 * @returns Complete color scheme following Material Design 3 principles
 */
export function generateColorScheme(sourceColor: string): ColorScheme {
  const { h, s } = hexToHSL(sourceColor);
  
  // Generate primary colors with high saturation
  const primary = {
    light: hslToHex(h, s, 45), // Slightly darker for better contrast
    dark: hslToHex(h, s * 0.9, 80), // High lightness with slightly reduced saturation
  };
  
  const onPrimary = {
    light: hslToHex(h, 0, 100), // Pure white
    dark: hslToHex(h, s, 15), // Very dark version of primary
  };
  
  const primaryContainer = {
    light: hslToHex(h, s * 0.8, 90), // Light container with reduced saturation
    dark: hslToHex(h, s * 0.7, 30), // Dark container with further reduced saturation
  };
  
  const onPrimaryContainer = {
    light: hslToHex(h, s, 10), // Very dark version of primary
    dark: hslToHex(h, s * 0.8, 95), // Very light version of primary
  };
  
  // Generate secondary colors with reduced saturation
  const secondarySat = s * 0.4; // 40% of primary saturation
  
  const secondary = {
    light: hslToHex(h, secondarySat, 45),
    dark: hslToHex(h, secondarySat, 80),
  };
  
  // Generate tertiary colors with even lower saturation
  const tertiarySat = s * 0.2; // 20% of primary saturation
  
  const tertiary = {
    light: hslToHex(h, tertiarySat, 45),
    dark: hslToHex(h, tertiarySat, 80),
  };
  
  // Generate surface colors with very low saturation
  const surface = {
    light: hslToHex(h, s * 0.05, 98), // Very light with slight tint
    dark: hslToHex(h, s * 0.05, 6), // Very dark with slight tint
  };
  
  // Return complete monochromatic scheme
  return {
    primary,
    onPrimary,
    primaryContainer,
    onPrimaryContainer,
    secondary,
    onSecondary: {
      light: hslToHex(h, 0, 100),
      dark: hslToHex(h, secondarySat, 15),
    },
    secondaryContainer: {
      light: hslToHex(h, secondarySat * 0.8, 90),
      dark: hslToHex(h, secondarySat * 0.7, 30),
    },
    onSecondaryContainer: {
      light: hslToHex(h, secondarySat, 10),
      dark: hslToHex(h, secondarySat * 0.8, 95),
    },
    tertiary,
    onTertiary: {
      light: hslToHex(h, 0, 100),
      dark: hslToHex(h, tertiarySat, 15),
    },
    tertiaryContainer: {
      light: hslToHex(h, tertiarySat * 0.8, 90),
      dark: hslToHex(h, tertiarySat * 0.7, 30),
    },
    onTertiaryContainer: {
      light: hslToHex(h, tertiarySat, 10),
      dark: hslToHex(h, tertiarySat * 0.8, 95),
    },
    error: {
      light: hslToHex(h, s * 0.6, 45),
      dark: hslToHex(h, s * 0.5, 80),
    },
    onError: {
      light: hslToHex(h, 0, 100),
      dark: hslToHex(h, s * 0.6, 15),
    },
    errorContainer: {
      light: hslToHex(h, s * 0.5, 90),
      dark: hslToHex(h, s * 0.4, 30),
    },
    onErrorContainer: {
      light: hslToHex(h, s * 0.6, 10),
      dark: hslToHex(h, s * 0.5, 95),
    },
    surface,
    onSurface: {
      light: hslToHex(h, s * 0.05, 10),
      dark: hslToHex(h, s * 0.05, 90),
    },
    surfaceVariant: {
      light: hslToHex(h, s * 0.08, 90),
      dark: hslToHex(h, s * 0.08, 30),
    },
    onSurfaceVariant: {
      light: hslToHex(h, s * 0.08, 30),
      dark: hslToHex(h, s * 0.08, 80),
    },
    outline: {
      light: hslToHex(h, s * 0.1, 50),
      dark: hslToHex(h, s * 0.1, 60),
    },
    outlineVariant: {
      light: hslToHex(h, s * 0.05, 80),
      dark: hslToHex(h, s * 0.05, 30),
    },
    inverseSurface: {
      light: hslToHex(h, s * 0.05, 20),
      dark: hslToHex(h, s * 0.05, 90),
    },
    inverseOnSurface: {
      light: hslToHex(h, s * 0.05, 95),
      dark: hslToHex(h, s * 0.05, 20),
    },
    inversePrimary: {
      light: hslToHex(h, s * 0.9, 80),
      dark: hslToHex(h, s, 40),
    },
    surfaceContainerLowest: {
      light: hslToHex(h, s * 0.03, 100),
      dark: hslToHex(h, s * 0.03, 4),
    },
    surfaceContainerLow: {
      light: hslToHex(h, s * 0.04, 96),
      dark: hslToHex(h, s * 0.04, 8),
    },
    surfaceContainer: {
      light: hslToHex(h, s * 0.05, 94),
      dark: hslToHex(h, s * 0.05, 12),
    },
    surfaceContainerHigh: {
      light: hslToHex(h, s * 0.06, 92),
      dark: hslToHex(h, s * 0.06, 17),
    },
    surfaceContainerHighest: {
      light: hslToHex(h, s * 0.07, 90),
      dark: hslToHex(h, s * 0.07, 22),
    },
  };
}

/**
 * Applies a color scheme to the document root
 * @param scheme - Color scheme to apply
 * @param isDark - Whether to apply dark theme colors
 */
export function applyColorScheme(scheme: ColorScheme, isDark: boolean) {
  const root = document.documentElement;
  const theme = isDark ? 'dark' : 'light';
  
  Object.entries(scheme).forEach(([role, colors]) => {
    const color = colors[theme];
    const { h, s, l } = hexToHSL(color);
    root.style.setProperty(`--md-sys-color-${kebabCase(role)}`, `${h} ${s}% ${l}%`);
  });
}

/**
 * Converts camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

/**
 * Generates a color scheme from a source image
 * @param imageUrl - URL of the source image
 * @returns Promise resolving to a color scheme
 */
export async function generateSchemeFromImage(imageUrl: string): Promise<ColorScheme> {
  // Create a canvas to analyze the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
      
      if (!imageData) {
        reject(new Error('Could not get image data'));
        return;
      }
      
      // Simple color quantization to find dominant color
      let r = 0, g = 0, b = 0, count = 0;
      
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }
      
      // Average color
      const avgColor = {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count),
      };
      
      // Convert to hex
      const sourceColor = '#' + [avgColor.r, avgColor.g, avgColor.b]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
      
      resolve(generateColorScheme(sourceColor));
    };
    
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = imageUrl;
  });
} 