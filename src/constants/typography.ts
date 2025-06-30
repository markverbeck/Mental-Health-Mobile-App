// Mental Health App Typography System
// Based on Material Design principles with accessibility in mind

import { Platform } from 'react-native';

// Font families
export const FontFamily = {
  // System fonts for optimal performance and native feel
  primary: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
  secondary: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto',
    default: 'System',
  }),
  monospace: Platform.select({
    ios: 'SF Mono',
    android: 'Roboto Mono',
    default: 'Monaco',
  }),
} as const;

// Font weights
export const FontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
} as const;

// Font sizes (in points)
export const FontSize = {
  // Headers
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  // Body text
  body1: 16,
  body2: 14,
  caption: 12,
  overline: 10,

  // Special sizes
  button: 18,
  statusLabel: 20,
  notification: 14,
  timestamp: 12,
} as const;

// Line heights (multiplier of font size)
export const LineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Letter spacing
export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

// Typography styles
export const Typography = {
  // Headers
  h1: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h1,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.h1 * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  h2: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.h2 * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  h3: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h3,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.h3 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  h4: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h4,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.h4 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  h5: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h5,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.h5 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  h6: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.h6,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.h6 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Body text
  body1: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.body1,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.body1 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  body2: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.body2,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.body2 * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Captions and small text
  caption: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.caption * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },
  overline: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.overline,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.overline * LineHeight.normal,
    letterSpacing: LetterSpacing.wider,
    textTransform: 'uppercase' as const,
  },

  // Special styles
  button: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.button,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.button * LineHeight.tight,
    letterSpacing: LetterSpacing.wide,
  },
  statusLabel: {
    fontFamily: FontFamily.primary,
    fontSize: FontSize.statusLabel,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.statusLabel * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  notification: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.notification,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.notification * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  timestamp: {
    fontFamily: FontFamily.secondary,
    fontSize: FontSize.timestamp,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.timestamp * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },
} as const;

// Helper function to get typography style
export const getTypographyStyle = (variant: keyof typeof Typography) => {
  return Typography[variant];
};

// Helper function to create custom typography style
export const createTypographyStyle = (
  fontSize: number,
  fontWeight: keyof typeof FontWeight = 'regular',
  lineHeight?: number,
  letterSpacing?: number
) => ({
  fontFamily: FontFamily.secondary,
  fontSize,
  fontWeight: FontWeight[fontWeight],
  lineHeight: lineHeight || fontSize * LineHeight.normal,
  letterSpacing: letterSpacing || LetterSpacing.normal,
});

// Accessibility helpers
export const getAccessibleFontSize = (baseSize: number, scale: number = 1): number => {
  // Support for dynamic type scaling (up to 200% as per accessibility requirements)
  const maxScale = 2.0;
  const minScale = 0.8;
  const clampedScale = Math.max(minScale, Math.min(maxScale, scale));
  return Math.round(baseSize * clampedScale);
};

export const getAccessibleLineHeight = (fontSize: number, scale: number = 1): number => {
  // Ensure sufficient line height for readability
  const baseLineHeight = fontSize * LineHeight.normal;
  const accessibleLineHeight = baseLineHeight * scale;
  return Math.max(accessibleLineHeight, fontSize * 1.2); // Minimum 1.2x line height
}; 