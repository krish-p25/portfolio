/**
 * Shared animation variants and configuration constants
 * Used across multiple page components for consistent animations
 */

// Standard easing curve for smooth, natural motion
export const EASE_CURVE = [0.22, 1, 0.36, 1];

// Animation durations (in seconds)
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.6,
};

// Animation delays (in seconds)
export const DELAY = {
  instant: 0,
  short: 0.1,
  medium: 0.15,
  long: 0.4,
};

// Container variants for staggered children animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAY.medium,
      delayChildren: DELAY.short,
    },
  },
};

// Item variants for fade-up animations
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_CURVE,
    },
  },
};

// Tag/chip variants with scale animation
export const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: DURATION.fast,
    },
  }),
};

// Motion props for performance optimization
export const motionProps = {
  style: { willChange: 'opacity, transform' },
};

// Page wrapper animation
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};
