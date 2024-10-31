import { type PresetTransition, presetTransitions } from '../preset-transitions'

const transitionStatuses = {
  'entering': 'in',
  'entered': 'in',
  'exiting': 'out',
  'exited': 'out',
  'pre-exiting': 'out',
  'pre-entering': 'out',
} as const

export function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: PresetTransition
  state: keyof typeof transitionStatuses
  duration: number
  timingFunction: React.CSSProperties['transitionTimingFunction']
}): React.CSSProperties {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  }

  if (typeof transition === 'string') {
    if (!(transition in presetTransitions)) {
      return {}
    }

    return {
      transitionProperty: presetTransitions[transition].transitionProperty,
      ...shared,
      ...presetTransitions[transition].common,
      ...presetTransitions[transition][transitionStatuses[state]],
    }
  }

  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  }
}
