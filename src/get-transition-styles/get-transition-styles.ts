import { presets, type TransitionMode } from '../presets'
import { TransitionStatus } from '../use-transition'

const transitionStatuses = {
  [TransitionStatus.entering]: 'in',
  [TransitionStatus.entered]: 'in',
  [TransitionStatus.exiting]: 'out',
  [TransitionStatus.exited]: 'out',
  [TransitionStatus.preEntering]: 'out',
  [TransitionStatus.preExiting]: 'out',
} as const

export function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: TransitionMode
  state: keyof typeof transitionStatuses
  duration: number
  timingFunction: React.CSSProperties['transitionTimingFunction']
}): React.CSSProperties {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  }

  if (typeof transition === 'string') {
    if (!(transition in presets)) {
      return {}
    }

    return {
      transitionProperty: presets[transition].transitionProperty,
      ...shared,
      ...presets[transition].common,
      ...presets[transition][transitionStatuses[state]],
    }
  }

  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  }
}
