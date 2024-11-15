import { cloneElement, type CSSProperties, useRef } from 'react'
import { getTransitionStyles } from './get-transition-styles/get-transition-styles'
import { GlobalConfig } from './global-config'
import { useInView, type UseInViewOptions } from './hooks/use-in-view'
import { type PresetTransition } from './preset-transitions'
import { useTransition } from './use-transition'

export interface TransitionProps {
  /** Determines whether component should be mounted to the DOM */
  mounted: boolean | 'whileInView'

  /** If set element will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
  keepMounted?: boolean

  /** If mounted is `whileInView`, this will determine the options for the useInView hook */
  viewport?: UseInViewOptions

  /** Transition name or object */
  transition?: PresetTransition

  /** Determines whether to set the transition when initializing */
  initial?: boolean

  /** Transition duration in ms, `150` by default */
  duration?: number

  /** Exit transition duration in ms, `150` by default */
  exitDuration?: number

  /** Transition timing function, `theme.transitionTimingFunction` by default */
  timingFunction?: string

  /** Render function with transition styles argument */
  children: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)

  /** Determines whether to reduce motion */
  reduceMotion?: boolean

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

  /** Custom element type. `div` by default */
  as?: React.ElementType

  /** Root element attributes */
  elementAttributes?: React.HTMLAttributes<React.ElementType>
}

export function Transition({
  mounted: _mounted,
  children,
  onExit,
  onEntered,
  onEnter,
  onExited,
  as = 'div',
  viewport,
  elementAttributes,
  ...rest
}: TransitionProps) {
  const {
    duration,
    enterDelay,
    exitDelay,
    exitDuration,
    initial,
    keepMounted,
    timingFunction,
    transition,
    reduceMotion,
  } = GlobalConfig.merge(rest)

  const mountedInView = _mounted === 'whileInView'

  const el = useRef<HTMLElement | null>(null)
  const isInView = useInView(el, viewport, {
    enable: mountedInView,
  })

  const mounted = mountedInView ? isInView : _mounted

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
    reduceMotion,
  })

  const createChildren = (style: CSSProperties, { mounted }: { mounted: boolean }) => {
    let element: JSX.Element

    if (mounted || keepMounted) {
      if (typeof children === 'function') {
        element = children(style)
      } else {
        element = cloneElement(children, { style }) as JSX.Element
      }
    } else {
      element = <></>
    }

    const Comp = as
    return (
      <Comp ref={el} {...elementAttributes}>
        {element}
      </Comp>
    )
  }

  if (transitionDuration === 0) {
    return createChildren({}, { mounted })
  }

  return transitionStatus === 'exited' ? (
    createChildren({ display: 'none' }, { mounted: false })
  ) : (
    <>
      {createChildren(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: transitionStatus,
          timingFunction: transitionTimingFunction,
        }),
        { mounted: true },
      )}
    </>
  )
}
