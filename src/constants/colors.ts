// Mental Health App Color Palette
// Based on Material Design principles with accessibility in mind

export const Colors = {
  // Status Colors
  status: {
    green: '#4CAF50', // Material Design Green 500 - Calming forest green
    yellow: '#FFB74D', // Material Design Orange 300 - Warm amber, not warning yellow
    red: '#FF7043', // Material Design Deep Orange 400 - Coral red, urgent but not alarming
  },

  // Background Colors
  background: {
    primary: '#FAFAFA', // Warm off-white
    secondary: '#FFFFFF', // Pure white for cards
    tertiary: '#F5F5F5', // Light gray for subtle backgrounds
  },

  // Text Colors
  text: {
    primary: '#212121', // High contrast for main text
    secondary: '#757575', // Medium contrast for secondary text
    disabled: '#BDBDBD', // Low contrast for disabled text
    inverse: '#FFFFFF', // White text for dark backgrounds
  },

  // Accent Colors
  accent: {
    primary: '#2196F3', // Calm blue for links/actions
    secondary: '#03DAC6', // Teal for secondary actions
    success: '#4CAF50', // Green for success states
    warning: '#FF9800', // Orange for warnings
    error: '#F44336', // Red for errors
  },

  // Border Colors
  border: {
    light: '#E0E0E0', // Light gray for subtle borders
    medium: '#BDBDBD', // Medium gray for standard borders
    dark: '#757575', // Dark gray for emphasis borders
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)', // Light shadow for subtle elevation
    medium: 'rgba(0, 0, 0, 0.2)', // Medium shadow for standard elevation
    dark: 'rgba(0, 0, 0, 0.3)', // Dark shadow for high elevation
  },

  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)', // Light overlay for modals
    medium: 'rgba(0, 0, 0, 0.5)', // Medium overlay for dialogs
    dark: 'rgba(0, 0, 0, 0.7)', // Dark overlay for full-screen modals
  },

  // Gradient Colors
  gradients: {
    green: ['#4CAF50', '#66BB6A'], // Green status gradient
    yellow: ['#FFB74D', '#FFCC02'], // Yellow status gradient
    red: ['#FF7043', '#FF5722'], // Red status gradient
    background: ['#FAFAFA', '#F5F5F5'], // Subtle background gradient
  },
} as const;

// Type definitions for better TypeScript support
export type StatusColor = keyof typeof Colors.status;
export type BackgroundColor = keyof typeof Colors.background;
export type TextColor = keyof typeof Colors.text;
export type AccentColor = keyof typeof Colors.accent;

// Helper function to get status color
export const getStatusColor = (status: 'green' | 'yellow' | 'red'): string => {
  return Colors.status[status];
};

// Helper function to get status gradient
export const getStatusGradient = (status: 'green' | 'yellow' | 'red'): readonly string[] => {
  return Colors.gradients[status];
};

// Accessibility helper - ensures sufficient contrast
export const getAccessibleTextColor = (backgroundColor: string): string => {
  // This is a simplified version - in production, you'd want a proper contrast calculation
  const lightBackgrounds = ['#FAFAFA', '#FFFFFF', '#F5F5F5', '#4CAF50', '#FFB74D'];
  return lightBackgrounds.includes(backgroundColor) ? Colors.text.primary : Colors.text.inverse;
}; 