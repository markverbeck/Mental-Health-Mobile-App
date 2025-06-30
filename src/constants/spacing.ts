// Mental Health App Spacing System
// Based on Material Design principles with accessibility in mind

// Base spacing unit (8dp grid system)
export const BASE_SPACING = 8;

// Spacing scale (multiples of base spacing)
export const Spacing = {
  // Micro spacing
  xs: BASE_SPACING * 0.5, // 4dp
  sm: BASE_SPACING, // 8dp
  md: BASE_SPACING * 1.5, // 12dp
  lg: BASE_SPACING * 2, // 16dp
  xl: BASE_SPACING * 3, // 24dp
  xxl: BASE_SPACING * 4, // 32dp
  xxxl: BASE_SPACING * 6, // 48dp

  // Specific spacing values
  screenPadding: BASE_SPACING * 2, // 16dp horizontal padding
  screenPaddingVertical: BASE_SPACING * 3, // 24dp vertical padding
  cardSpacing: BASE_SPACING * 1.5, // 12dp between cards
  buttonHeight: BASE_SPACING * 6, // 48dp minimum button height (accessibility)
  touchTarget: BASE_SPACING * 5.5, // 44dp minimum touch target (accessibility)
  borderRadius: BASE_SPACING * 1.5, // 12dp for cards
  buttonBorderRadius: BASE_SPACING, // 8dp for buttons
  statusButtonHeight: BASE_SPACING * 10, // 80dp minimum for status buttons
} as const;

// Layout constants
export const Layout = {
  // Screen dimensions (will be set dynamically)
  screenWidth: 0,
  screenHeight: 0,

  // Safe area insets (will be set dynamically)
  safeAreaTop: 0,
  safeAreaBottom: 0,
  safeAreaLeft: 0,
  safeAreaRight: 0,

  // Header height
  headerHeight: BASE_SPACING * 7, // 56dp

  // Tab bar height
  tabBarHeight: BASE_SPACING * 7, // 56dp

  // Status bar height
  statusBarHeight: BASE_SPACING * 3, // 24dp (approximate)
} as const;

// Shadow configurations
export const Shadows = {
  light: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2, // Android elevation
  },
  medium: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // Android elevation
  },
  heavy: {
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8, // Android elevation
  },
} as const;

// Border radius values
export const BorderRadius = {
  none: 0,
  sm: BASE_SPACING * 0.5, // 4dp
  md: BASE_SPACING, // 8dp
  lg: BASE_SPACING * 1.5, // 12dp
  xl: BASE_SPACING * 2, // 16dp
  xxl: BASE_SPACING * 3, // 24dp
  round: 999, // For circular elements
} as const;

// Helper functions
export const getSpacing = (size: keyof typeof Spacing): number => {
  return Spacing[size];
};

export const getBorderRadius = (size: keyof typeof BorderRadius): number => {
  return BorderRadius[size];
};

export const getShadow = (intensity: keyof typeof Shadows) => {
  return Shadows[intensity];
};

// Responsive spacing helpers
export const getResponsiveSpacing = (baseSize: number, scale: number = 1): number => {
  return Math.round(baseSize * scale);
};

// Accessibility helpers
export const getAccessibleTouchTarget = (baseSize: number): number => {
  // Ensure minimum 44dp touch target for accessibility
  return Math.max(baseSize, Spacing.touchTarget);
};

export const getAccessibleButtonHeight = (baseHeight: number): number => {
  // Ensure minimum 48dp button height for accessibility
  return Math.max(baseHeight, Spacing.buttonHeight);
};

// Layout helpers
export const getScreenPadding = (): { horizontal: number; vertical: number } => ({
  horizontal: Spacing.screenPadding,
  vertical: Spacing.screenPaddingVertical,
});

export const getCardSpacing = (): number => Spacing.cardSpacing;

// Animation timing constants
export const AnimationTiming = {
  fast: 150, // 150ms for micro-interactions
  normal: 300, // 300ms for standard transitions
  slow: 400, // 400ms for status changes
  verySlow: 600, // 600ms for complex animations
} as const;

// Easing functions (for use with React Native Reanimated)
export const Easing = {
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  linear: 'linear',
} as const; 