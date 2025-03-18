import { cloneElement, type CSSProperties, type ElementType, isValidElement, useRef } from 'react'
import { getTransitionStyles } from './get-transition-styles/get-transition-styles'
import { GlobalConfig } from './global-config'
import { useInView, type UseInViewOptions } from './hooks/use-in-view'
import { useMemoizedFn } from './hooks/use-memoized-fn'
import { type TransitionMode } from './presets'
import { TransitionStatus, useTransition } from './use-transition'

export interface TransitionProps<T extends keyof JSX.IntrinsicElements = 'div'> {
  /**
   * @description Determines whether component should be mounted to the DOM
   * @default false
   */
  mounted: boolean | 'whileInView'

  /**
   * @description If set element will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead
   * @default false
   */
  keepMounted?: boolean

  /**
   * @description If mounted is `whileInView`, this will determine the options for the useInView hook
   */
  viewport?: UseInViewOptions & {
    /** Custom placeholder element type. `div` by default */
    placeholder?: T
    /** Placeholder attributes */
    attributes?: Omit<JSX.IntrinsicElements[T], 'ref'>
  }

  /**
   * @description Transition name or object
   * @default 'fade'
   */
  transition?: TransitionMode

  /**
   * @description Determines whether to set the transition when initializing
   * @default false
   */
  initial?: boolean

  /**
   * @description Transition duration (s)
   * @default 0.2
   */
  duration?: number

  /**
   * @description Exit transition duration (s)
   * @default 0.2
   */
  exitDuration?: number

  /**
   * @description Transition timing function
   * @default 'ease'
   */
  timingFunction?: string

  /**
   * @description Render function with transition styles argument
   */
  children: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)

  /**
   * @description Determines whether to reduce motion
   * @default false
   */
  reduceMotion?: boolean

  /**
   * @description Called when exit transition ends
   */
  onExited?: () => void

  /**
   * @description Called when exit transition starts
   */
  onExit?: () => void

  /**
   * @description Called when enter transition starts
   */
  onEnter?: () => void

  /**
   * @description Called when enter transition ends
   */
  onEntered?: () => void

  /**
   * @description Delay before enter transition starts (s)
   * @default 0
   */
  enterDelay?: number

  /**
   * @description Delay before exit transition starts (s)
   * @default 0
   */
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

  const createChildren = useMemoizedFn((style: CSSProperties, { mounted }: { mounted: boolean }) => {
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
  })

  const createTransitionChildren = useMemoizedFn(({ mounted }: { mounted: boolean }) => {
    return createChildren(
      getTransitionStyles({
        transition,
        duration: transitionDuration,
        state: transitionStatus,
        timingFunction: transitionTimingFunction,
      }),
      { mounted },
    )
  })

  const isExited = transitionStatus === TransitionStatus.exited

  if (isExited) {
    if (unsafe_alwaysMounted) {
      return createTransitionChildren({ mounted: false })
    }
    return createChildren({ display: 'none' }, { mounted: false })
  }

  return createTransitionChildren({ mounted: true })
}
