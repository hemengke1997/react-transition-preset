import { useRef, useState } from 'react'
import { useDidUpdate } from './hooks/use-did-update'
import { useIsomorphicLayoutEffect } from './hooks/use-isomorphic-layout-effect'
import { useMemoizedFn } from './hooks/use-memoized-fn'
import { secToMs } from './utils'

export enum TransitionStatus {
  entered = 'entered',
  exited = 'exited',
  entering = 'entering',
  exiting = 'exiting',
  preExiting = 'pre-exiting',
  preEntering = 'pre-entering',
}

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

export function useTransition(props: UseTransition) {
  const {
    duration: durationInSec,
    initial,
    exitDuration: exitDurationInSec,
    timingFunction,
    mounted,
    reduceMotion,
    onEnter,
    onExit,
    onEntered,
    onExited,
    enterDelay: enterDelayInSec,
    exitDelay: exitDelayInSec,
  } = props

  const [duration, exitDuration, enterDelay, exitDelay] = [
    durationInSec,
    exitDurationInSec,
    enterDelayInSec,
    exitDelayInSec,
  ].map(secToMs)

  const [transitionDuration, setTransitionDuration] = useState(reduceMotion ? 0 : duration)
  const [transitionStatus, setStatus] = useState<TransitionStatus>(() => {
    if (mounted) {
      return initial ? TransitionStatus.preEntering : TransitionStatus.entered
    }
    return TransitionStatus.exited
  })
  const transitionTimeoutRef = useRef<number>(-1)
  const delayTimeoutRef = useRef<number>(-1)
  const rafRef = useRef(-1)

  const handleStateChange = useMemoizedFn((shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit
    const handler = shouldMount ? onEntered : onExited

    window.clearTimeout(transitionTimeoutRef.current)

    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration

    setTransitionDuration(newTransitionDuration)

    if (newTransitionDuration === 0) {
      typeof preHandler === 'function' && preHandler()
      typeof handler === 'function' && handler()
      setStatus(shouldMount ? TransitionStatus.entered : TransitionStatus.exited)
    } else {
      // Make sure new status won't be set within the same frame as this would disrupt animation
      rafRef.current = requestAnimationFrame(() => {
        setStatus(shouldMount ? TransitionStatus.preEntering : TransitionStatus.preExiting)

        rafRef.current = requestAnimationFrame(() => {
          typeof preHandler === 'function' && preHandler()
          setStatus(shouldMount ? TransitionStatus.entering : TransitionStatus.exiting)

          transitionTimeoutRef.current = window.setTimeout(() => {
            typeof handler === 'function' && handler()
            setStatus(shouldMount ? TransitionStatus.entered : TransitionStatus.exited)
          }, newTransitionDuration)
        })
      })
    }
  })

  const handleTransitionWithDelay = useMemoizedFn((shouldMount: boolean) => {
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
  })

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
