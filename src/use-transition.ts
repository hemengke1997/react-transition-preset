import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useDidUpdate } from './hooks/use-did-update'
import { useIsomorphicLayoutEffect } from './hooks/use-isomorphic-layout-effect'

export type TransitionStatus = 'entered' | 'exited' | 'entering' | 'exiting' | 'pre-exiting' | 'pre-entering'

export interface UseTransition {
  duration: number
  initial: boolean
  exitDuration: number
  timingFunction: string
  mounted: boolean
  reduceMotion?: boolean
  onEnter?: () => void
  onExit?: () => void
  onEntered?: () => void
  onExited?: () => void
  enterDelay?: number
  exitDelay?: number
}

export function useTransition({
  duration,
  initial,
  exitDuration,
  timingFunction,
  mounted,
  reduceMotion,
  onEnter,
  onExit,
  onEntered,
  onExited,
  enterDelay,
  exitDelay,
}: UseTransition) {
  const [transitionDuration, setTransitionDuration] = useState(reduceMotion ? 0 : duration)
  const [transitionStatus, setStatus] = useState<TransitionStatus>(() => {
    if (mounted) {
      return initial ? 'pre-entering' : 'entered'
    }
    return 'exited'
  })
  const transitionTimeoutRef = useRef<number>(-1)
  const delayTimeoutRef = useRef<number>(-1)
  const rafRef = useRef(-1)

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit
    const handler = shouldMount ? onEntered : onExited

    window.clearTimeout(transitionTimeoutRef.current)

    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration

    setTransitionDuration(newTransitionDuration)

    if (newTransitionDuration === 0) {
      typeof preHandler === 'function' && preHandler()
      typeof handler === 'function' && handler()
      setStatus(shouldMount ? 'entered' : 'exited')
    } else {
      // Make sure new status won't be set within the same frame as this would disrupt animation
      rafRef.current = requestAnimationFrame(() => {
        flushSync(() => {
          setStatus(shouldMount ? 'pre-entering' : 'pre-exiting')
        })

        rafRef.current = requestAnimationFrame(() => {
          typeof preHandler === 'function' && preHandler()
          setStatus(shouldMount ? 'entering' : 'exiting')

          transitionTimeoutRef.current = window.setTimeout(() => {
            typeof handler === 'function' && handler()
            setStatus(shouldMount ? 'entered' : 'exited')
          }, newTransitionDuration)
        })
      })
    }
  }

  const handleTransitionWithDelay = (shouldMount: boolean) => {
    window.clearTimeout(delayTimeoutRef.current)
    const delay = shouldMount ? enterDelay : exitDelay

    if (typeof delay !== 'number') {
      handleStateChange(shouldMount)
      return
    }

    delayTimeoutRef.current = window.setTimeout(
      () => {
        handleStateChange(shouldMount)
      },
      shouldMount ? enterDelay : exitDelay,
    )
  }

  useDidUpdate(
    () => {
      handleTransitionWithDelay(mounted)
    },
    {
      deps: [mounted],
      initialMounted: initial,
    },
  )

  useIsomorphicLayoutEffect(
    () => () => {
      window.clearTimeout(transitionTimeoutRef.current)
      cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || 'ease',
  }
}
