export interface TransitionStyles {
  common?: React.CSSProperties
  in: React.CSSProperties
  out: React.CSSProperties
  transitionProperty: React.CSSProperties['transitionProperty']
}

export type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'skew-up'
  | 'skew-down'
  | 'rotate-right'
  | 'rotate-left'
  | 'slide-down'
  | 'slide-up'
  | 'slide-right'
  | 'slide-left'
  | 'scale-y'
  | 'scale-x'
  | 'scale'
  | 'pop'
  | 'pop-top'
  | 'pop-bottom'
  | 'pop-left'
  | 'pop-right'
  | 'pop-top-left'
  | 'pop-top-right'
  | 'pop-bottom-left'
  | 'pop-bottom-right'

export type TransitionMode = TransitionName | TransitionStyles

const pop = {
  center: 0,
  top: -16,
  bottom: 16,
}

const popIn = (from: 'top' | 'bottom' | 'center') => ({
  in: { opacity: 1, transform: 'scale(1)' },
  out: {
    opacity: 0,
    transform: `scale(var(--transition-preset-pop-in-${from}-scale, 0.9)) translateY(var(--transition-preset-pop-in-${from}, ${pop[from]}px))`,
  },
  transitionProperty: 'transform, opacity',
})

export const presets: Record<TransitionName, TransitionStyles> = {
  'fade': {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: 'opacity',
  },

  'fade-up': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: `translateY(var(--transition-preset-fade-up, -16px))` },
    transitionProperty: 'opacity, transform',
  },

  'fade-down': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: `translateY(var(--transtion-preset-fade-down, 16px)` },
    transitionProperty: 'opacity, transform',
  },

  'fade-left': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: `translateX(var(--transition-preset-fade-left, -16px))` },
    transitionProperty: 'opacity, transform',
  },

  'fade-right': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: `translateX(var(--transition-preset-fade-right, 16px)` },
    transitionProperty: 'opacity, transform',
  },

  'scale': {
    in: { opacity: 1, transform: 'scale(1)' },
    out: { opacity: 0, transform: 'scale(0)' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'scale-y': {
    in: { opacity: 1, transform: 'scaleY(1)' },
    out: { opacity: 0, transform: 'scaleY(0)' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'scale-x': {
    in: { opacity: 1, transform: 'scaleX(1)' },
    out: { opacity: 0, transform: 'scaleX(0)' },
    common: { transformOrigin: 'left' },
    transitionProperty: 'transform, opacity',
  },

  'skew-up': {
    in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
    out: {
      opacity: 0,
      transform: `translateY(var(--transition-preset-skew-up, -20px)) skew(var(--transition-preset-skew-up-deg, -10deg, -5deg))`,
    },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'skew-down': {
    in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
    out: {
      opacity: 0,
      transform: `translateY(var(--transition-preset-skew-down, 20px)) skew(var(--transition-preset-skew-down-deg, -10deg, -5deg))`,
    },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'rotate-left': {
    in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
    out: {
      opacity: 0,
      transform: `translateY(var(--transition-preset-rotate-left, 20px)) rotate(var(--transition-preset-rotate-left-deg, -5deg))`,
    },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'rotate-right': {
    in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
    out: {
      opacity: 0,
      transform: `translateY(var(--transition-preset-rotate-right, 20px)) rotate(var(--transition-preset-rotate-right-deg, 5deg))`,
    },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'slide-down': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(100%)' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'slide-up': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(-100%)' },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'slide-left': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-100%)' },
    common: { transformOrigin: 'left' },
    transitionProperty: 'transform, opacity',
  },

  'slide-right': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(100%)' },
    common: { transformOrigin: 'right' },
    transitionProperty: 'transform, opacity',
  },

  'pop': {
    ...popIn('center'),
    common: { transformOrigin: 'center center' },
  },

  'pop-top': {
    ...popIn('top'),
    common: { transformOrigin: 'top center' },
  },

  'pop-bottom': {
    ...popIn('bottom'),
    common: { transformOrigin: 'bottom center' },
  },

  'pop-left': {
    ...popIn('center'),
    common: { transformOrigin: 'center left' },
  },

  'pop-right': {
    ...popIn('center'),
    common: { transformOrigin: 'center right' },
  },

  'pop-bottom-left': {
    ...popIn('bottom'),
    common: { transformOrigin: 'bottom left' },
  },

  'pop-bottom-right': {
    ...popIn('bottom'),
    common: { transformOrigin: 'bottom right' },
  },

  'pop-top-left': {
    ...popIn('top'),
    common: { transformOrigin: 'top left' },
  },

  'pop-top-right': {
    ...popIn('top'),
    common: { transformOrigin: 'top right' },
  },
}
