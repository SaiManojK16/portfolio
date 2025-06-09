// Material Design 3 Transition Patterns

// Duration values (in milliseconds)
export const duration = {
  short1: 100,
  short2: 150,
  short3: 200,
  short4: 250,
  medium1: 300,
  medium2: 350,
  medium3: 400,
  medium4: 450,
  long1: 500,
  long2: 550,
  long3: 600,
  long4: 650,
} as const;

// Easing curves
export const easing = {
  // Standard easing
  standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
  standardAccelerate: "cubic-bezier(0.3, 0.0, 1.0, 1.0)",
  standardDecelerate: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
  
  // Emphasized easing
  emphasized: "cubic-bezier(0.2, 0.0, 0, 1.0)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
} as const;

// Common transition patterns
export const transitions = {
  // Container transform
  containerTransform: {
    duration: duration.medium3,
    easing: easing.emphasized,
    properties: "transform, opacity, width, height",
  },

  // Forward and backward
  forwardAndBackward: {
    duration: duration.medium2,
    easing: easing.emphasized,
    properties: "transform, opacity",
  },

  // Lateral (for peer content)
  lateral: {
    duration: duration.medium2,
    easing: easing.standard,
    properties: "transform",
  },

  // Top level navigation
  topLevel: {
    duration: duration.short4,
    easing: easing.emphasized,
    properties: "opacity",
  },

  // Enter and exit within bounds
  enterExitWithin: {
    duration: duration.short4,
    easing: easing.standardDecelerate,
    properties: "transform, opacity",
  },

  // Enter and exit beyond bounds
  enterExitBeyond: {
    duration: duration.medium2,
    easing: easing.emphasizedDecelerate,
    properties: "transform, width, height",
  },

  // Skeleton loader fade
  skeletonFade: {
    duration: duration.short2,
    easing: easing.standardDecelerate,
    properties: "opacity",
  },
} as const;

// Helper function to create transition string
export const createTransition = (
  pattern: keyof typeof transitions,
  customProperties?: string
) => {
  const { duration, easing, properties } = transitions[pattern];
  const transitionProperties = customProperties || properties;
  return `${transitionProperties} ${duration}ms ${easing}`;
}; 