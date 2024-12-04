import { cloneElement, type CSSProperties, type ElementType, isValidElement, useRef } from 'react'
import { getTransitionStyles } from './get-transition-styles/get-transition-styles'
import { GlobalConfig } from './global-config'
import { useInView, type UseInViewOptions } from './hooks/use-in-view'
import { type PresetTransition } from './preset-transitions'
import { useTransition } from './use-transition'

export interface TransitionProps<T extends keyof JSX.IntrinsicElements = 'div'> {
  /** Determines whether component should be mounted to the DOM */
  mounted: boolean | 'whileInView'

  /** If set element will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
  keepMounted?: boolean

  /** If mounted is `whileInView`, this will determine the options for the useInView hook */
  viewport?: UseInViewOptions & {
    /** Custom placeholder element type. `div` by default */
    placeholder?: T
    /** Placeholder attributes */
    attributes?: Omit<JSX.IntrinsicElements[T], 'ref'>
  }

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

  /**
   * DO NOT USE
   * @internal
   */
  unsafe_alwaysMounted?: boolean
}

export const Transition = <T extends keyof JSX.IntrinsicElements>({
  mounted: _mounted,
  children,
  onExit,
  onEntered,
  onEnter,
  onExited,
  viewport,
  unsafe_alwaysMounted,
  ...rest
}: TransitionProps<T>) => {
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

  const el = useRef<HTMLElement>(null)
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
    let element: React.ReactElement | null

    if (mounted || keepMounted) {
      if (typeof children === 'function') {
        element = children(style)
      } else {
        // Context will be lost when using cloneElement
        // Use as your risk
        if (isValidElement(children)) {
          element = cloneElement(children as React.ReactElement, { style })
        } else {
          element = children
        }
      }
    } else {
      element = null
    }

    if (!mountedInView) {
      return element
    }

    const { placeholder, attributes } = viewport || {}

    const Placeholder = placeholder || ('div' as ElementType)
    return (
      <Placeholder ref={el} {...attributes}>
        {element}
      </Placeholder>
    )
  }

  const createTransitionChildren = ({ mounted }: { mounted: boolean }) => {
    return createChildren(
      getTransitionStyles({
        transition,
        duration: transitionDuration,
        state: transitionStatus,
        timingFunction: transitionTimingFunction,
      }),
      { mounted },
    )
  }

  const isExited = transitionStatus === 'exited'

  if (isExited) {
    if (unsafe_alwaysMounted) {
      return createTransitionChildren({ mounted: false })
    }
    return createChildren({ display: 'none' }, { mounted: false })
  }

  return createTransitionChildren({ mounted: true })
}
