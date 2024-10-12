import { cloneElement, type CSSProperties } from 'react'
import { getTransitionStyles } from './get-transition-styles/get-transition-styles'
import { type PresetTransition } from './transitions'
import { useTransition } from './use-transition'

export interface TransitionProps {
  /** Determines whether component should be mounted to the DOM */
  mounted: boolean

  /** If set element will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
  keepMounted?: boolean

  /** Transition name or object */
  transition?: PresetTransition

  /** Determines whether to set the transition when initializing */
  initial?: boolean

  /** Transition duration in ms, `250` by default */
  duration?: number

  /** Exit transition duration in ms, `250` by default */
  exitDuration?: number

  /** Transition timing function, `theme.transitionTimingFunction` by default */
  timingFunction?: string

  /** Render function with transition styles argument */
  children: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)

  /** Called when exit transition ends */
  onExited?: () => void

  /** Called when exit transition starts */
  onExit?: () => void

  /** Called when enter transition starts */
  onEnter?: () => void

  /** Called when enter transition ends */
  onEntered?: () => void

  /** Delay in ms before enter transition starts (ms) */
  enterDelay?: number

  /** Delay in ms before exit transition starts (ms) */
  exitDelay?: number
}

export type TransitionOverride = Partial<Omit<TransitionProps, 'mounted'>>

export function Transition({
  keepMounted,
  transition = 'fade',
  initial = false,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction = 'ease',
  onExit,
  onEntered,
  onEnter,
  onExited,
  enterDelay,
  exitDelay,
}: TransitionProps) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    initial,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited,
    enterDelay,
    exitDelay,
  })

  const createChildren = (style: CSSProperties) => {
    if (typeof children === 'function') {
      return children(style)
    }
    return cloneElement(children, { style }) as JSX.Element
  }

  if (transitionDuration === 0) {
    return mounted ? <>{createChildren({})}</> : keepMounted ? createChildren({ display: 'none' }) : null
  }

  return transitionStatus === 'exited' ? (
    keepMounted ? (
      createChildren({ display: 'none' })
    ) : null
  ) : (
    <>
      {createChildren(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: transitionStatus,
          timingFunction: transitionTimingFunction,
        }),
      )}
    </>
  )
}
