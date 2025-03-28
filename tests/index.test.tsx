import { act, cleanup, render } from '@testing-library/react'
import { useEffect, useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { presets, Transition } from '../src'
import { useInView } from '../src/hooks/use-in-view'
import { type TransitionProps } from '../src/types'
import { getActiveObserver } from './mock-intersection-observer'

const TestComponent = (props: Omit<TransitionProps, 'children'>) => {
  return (
    <Transition {...props}>
      <div data-testid='child'>Content</div>
    </Transition>
  )
}

describe('Transition Component', () => {
  const delay = (time: number) => {
    vi.advanceTimersToNextFrame()
    vi.advanceTimersToNextFrame()

    vi.advanceTimersByTime(time)
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders children when mounted is true', async () => {
    const { queryByTestId } = render(<TestComponent mounted={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
  })

  it('does not render children when mounted is false', async () => {
    const { queryByTestId } = render(<TestComponent mounted={false} />)

    const child = queryByTestId('child')
    expect(child).toBeNull()
  })

  it('renders children with initial transition effect', async () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='fade' initial={true} duration={4} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe('0')

    act(() => {
      delay(4000)
    })
    expect(child?.style.opacity).toBe('1')
  })

  it('renders mount children without initial', async () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='fade' />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe('1')
  })

  it('should enterDelay work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='fade' enterDelay={1} initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe('0')

    act(() => {
      delay(1000)
    })

    expect(child?.style.opacity).toBe('1')
  })

  it('should exitDelay work', () => {
    const { queryByTestId, rerender } = render(<TestComponent mounted={true} transition='fade' exitDelay={1} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe('1')

    rerender(<TestComponent mounted={false} transition='fade' exitDelay={1} />)

    expect(child?.style.opacity).toBe('1')

    act(() => {
      delay(1000)
    })

    expect(child?.style.opacity).toBe('0')
  })

  it('should enterDelay and exitDelay work together', () => {
    const { queryByTestId, rerender } = render(
      <TestComponent mounted={true} transition='fade' enterDelay={1} exitDelay={1} initial={true} />,
    )

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe('0')

    act(() => {
      delay(1000)
    })

    expect(child?.style.opacity).toBe('1')

    rerender(<TestComponent mounted={false} transition='fade' enterDelay={1} exitDelay={1} />)

    expect(child?.style.opacity).toBe('1')

    act(() => {
      delay(1000)
    })

    expect(child?.style.opacity).toBe('0')
  })

  it('should keep children mounted when keepMounted true', () => {
    const { queryByTestId, rerender } = render(<TestComponent mounted={true} transition='fade' keepMounted={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()

    rerender(<TestComponent mounted={false} transition='fade' keepMounted={true} />)

    expect(child).toBeTruthy()
  })

  it('should not keep children mounted when keepMounted false', () => {
    const { queryByTestId, rerender } = render(<TestComponent mounted={true} transition='fade' keepMounted={false} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()

    rerender(<TestComponent mounted={false} transition='fade' keepMounted={false} />)

    act(() => {
      delay(1000)
    })

    expect(queryByTestId('child')).toBeNull()
  })

  it('should reduceMotion work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} reduceMotion={true} initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    act(() => {
      delay(0)
    })
    expect(child?.style.opacity).toBe('1')
  })

  it('should on-hook work', () => {
    const onEnter = vi.fn()
    const onExit = vi.fn()
    const onEntered = vi.fn()
    const onExited = vi.fn()

    const { queryByTestId, rerender } = render(
      <TestComponent
        mounted={true}
        onEnter={onEnter}
        onExit={onExit}
        onEntered={onEntered}
        onExited={onExited}
        initial={true}
      />,
    )

    const child = queryByTestId('child')
    expect(child).toBeTruthy()

    act(() => delay(0))
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEntered).not.toHaveBeenCalled()

    act(() => delay(2000))
    expect(onEntered).toHaveBeenCalledTimes(1)
    expect(onExit).not.toHaveBeenCalled()

    rerender(<TestComponent mounted={false} onExit={onExit} onExited={onExited} />)

    act(() => delay(0))
    expect(onExit).toHaveBeenCalledTimes(1)
    expect(onExited).not.toHaveBeenCalled()

    act(() => delay(2000))
    expect(onExited).toHaveBeenCalledTimes(1)
  })

  it('should fade-up transition work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='fade-up' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['fade-up'].out.opacity))
    expect(child?.style.transform).toBe(presets['fade-up'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['fade-up'].in.opacity))
    expect(child?.style.transform).toBe(presets['fade-up'].in.transform)
  })

  it('should scale transition work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='scale' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['scale'].out.opacity))
    expect(child?.style.transform).toBe(presets['scale'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['scale'].in.opacity))
    expect(child?.style.transform).toBe(presets['scale'].in.transform)
  })

  it('should scale-x transition work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='scale-x' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['scale-x'].out.opacity))
    expect(child?.style.transform).toBe(presets['scale-x'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['scale-x'].in.opacity))
    expect(child?.style.transform).toBe(presets['scale-x'].in.transform)
  })

  it('should skew-up transition work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='skew-up' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['skew-up'].out.opacity))
    expect(child?.style.transform).toBe(presets['skew-up'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['skew-up'].in.opacity))
    expect(child?.style.transform).toBe(presets['skew-up'].in.transform)
  })

  it('should rotate-left work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='rotate-left' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['rotate-left'].out.opacity))
    expect(child?.style.transform).toBe(presets['rotate-left'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['rotate-left'].in.opacity))
    expect(child?.style.transform).toBe(presets['rotate-left'].in.transform)
  })

  it('should slide-right work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='slide-right' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['slide-right'].out.opacity))
    expect(child?.style.transform).toBe(presets['slide-right'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['slide-right'].in.opacity))
    expect(child?.style.transform).toBe(presets['slide-right'].in.transform)
  })

  it('should pop-bottom work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='pop-bottom' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['pop-bottom'].out.opacity))
    expect(child?.style.transform).toBe(presets['pop-bottom'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['pop-bottom'].in.opacity))
    expect(child?.style.transform).toBe(presets['pop-bottom'].in.transform)
  })

  it('should pop-top-right work', () => {
    const { queryByTestId } = render(<TestComponent mounted={true} transition='pop-top-right' initial={true} />)

    const child = queryByTestId('child')
    expect(child).toBeTruthy()
    expect(child?.style.opacity).toBe(String(presets['pop-top-right'].out.opacity))
    expect(child?.style.transform).toBe(presets['pop-top-right'].out.transform)
    act(() => delay(2000))
    expect(child?.style.opacity).toBe(String(presets['pop-top-right'].in.opacity))
    expect(child?.style.transform).toBe(presets['pop-top-right'].in.transform)
  })

  it('should whileInView work', () => {
    const { queryByTestId } = render(<TestComponent mounted={'whileInView'} keepMounted={false} />)

    act(enter)

    act(() => {
      delay(0)
    })

    expect(queryByTestId('child')).toBeTruthy()

    act(leave)

    act(() => {
      delay(2000)
    })

    expect(queryByTestId('child')).toBeNull()
  })
})

const target = document.createElement('div')

const enter = () => getActiveObserver()?.([{ target, isIntersecting: true }])
const leave = () => getActiveObserver()?.([{ target, isIntersecting: false }])

describe('useInView', () => {
  it('Returns false on mount', () => {
    const results: boolean[] = []

    const Component = () => {
      const ref = useRef(null)
      const isInView = useInView(ref, {}, { enable: true })

      useEffect(() => {
        if (results[results.length - 1] !== isInView) results.push(isInView)
      }, [isInView])

      return <div ref={ref} />
    }

    const { rerender } = render(<Component />)
    rerender(<Component />)
    rerender(<Component />)
    rerender(<Component />)
    rerender(<Component />)

    expect(results).toEqual([false])
  })

  it('Returns true when element enters the viewport', async () => {
    const results: boolean[] = []

    const Component = () => {
      const ref = useRef(null)
      const isInView = useInView(
        ref,
        {},
        {
          enable: true,
        },
      )

      useEffect(() => {
        if (results[results.length - 1] !== isInView) results.push(isInView)
      }, [isInView])

      return <div ref={ref} />
    }

    render(<Component />)
    act(enter)
    act(enter)
    act(enter)
    act(enter)
    act(enter)

    expect(results).toEqual([false, true])
  })

  it('Returns false when element leaves the viewport', async () => {
    const results: boolean[] = []

    const Component = () => {
      const ref = useRef(null)
      const isInView = useInView(ref, {}, { enable: true })

      useEffect(() => {
        if (results[results.length - 1] !== isInView) results.push(isInView)
      }, [isInView])

      return <div ref={ref} />
    }

    render(<Component />)
    act(leave)
    act(enter)
    act(leave)
    act(leave)
    act(enter)
    act(leave)

    expect(results).toEqual([false, true, false, true, false])
  })

  it('Only triggers true once, if once is set', async () => {
    const results: boolean[] = []

    const Component = () => {
      const ref = useRef(null)
      const isInView = useInView(ref, { once: true }, { enable: true })

      useEffect(() => {
        if (results[results.length - 1] !== isInView) results.push(isInView)
      }, [isInView])

      return <div ref={ref} />
    }

    render(<Component />)
    act(leave)
    act(enter)
    act(leave)
    act(leave)
    act(enter)
    act(leave)

    expect(results).toEqual([false, true])
  })
})
