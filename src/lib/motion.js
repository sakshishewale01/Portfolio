/**
 * Motion presets for Framer Motion animations across Sakshi's Portfolio.
 * Built to provide polished transitions while respecting accessibility preferences.
 */

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -50px 0px',
}

/**
 * Standard transition curves
 */
export const transitions = {
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  spring: { type: 'spring', stiffness: 260, damping: 20 },
  quick: { duration: 0.25, ease: 'easeOut' },
}

/**
 * Fade-up variant for headers, cards, and text blocks.
 * @param {boolean} [reduced=false]
 */
export const createFadeUp = (reduced = false) => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 28,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.01 : 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: reduced ? 0 : (typeof custom === 'number' ? custom : 0),
    },
  }),
})

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: typeof custom === 'number' ? custom : 0,
    },
  }),
}

/**
 * Fade-in variant for overlays, subtle borders, and backgrounds.
 * @param {boolean} [reduced=false]
 */
export const createFadeIn = (reduced = false) => ({
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: reduced ? 0.01 : 0.5,
      delay: reduced ? 0 : (typeof custom === 'number' ? custom : 0),
    },
  }),
})

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: typeof custom === 'number' ? custom : 0,
    },
  }),
}

/**
 * Scale-in variant for badges, modal cards, and interactive items.
 * @param {boolean} [reduced=false]
 */
export const createScaleIn = (reduced = false) => ({
  hidden: {
    opacity: 0,
    scale: reduced ? 1 : 0.95,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: reduced ? 0.01 : 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: reduced ? 0 : (typeof custom === 'number' ? custom : 0),
    },
  }),
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: typeof custom === 'number' ? custom : 0,
    },
  }),
}

/**
 * Stagger container for lists, grids, and grouped items.
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})
