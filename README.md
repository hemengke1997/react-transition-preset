# react-transition-preset

> Lightweight, zero-dependency transition component for React with common preset transition.

[中文文档](./README.zh.md)

## Online Demo

[Demo](https://hemengke1997.github.io/react-transition-preset/)

## Install

```bash
npm install react-transition-preset
```

## Usage

```tsx
import { Transition } from 'react-transition-preset'

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition
      mounted={opened}
      transition='fade'
      duration={0.4}
      timingFunction='ease'
    >
      <div>Hello, World!</div>
    </Transition>
  )
}
```

If your component has style props, you can use render function

```tsx
import { Transition } from 'react-transition-preset'

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition mounted={opened}>
      {(styles) => <div style={{
        ...styles,
        // custom styles
      }}>Hello, World!</div>}
    </Transition>
  )
}
```

## Viewport Transition

`mounted` option supports `whileInView`, which starts the transition when the element enters or leaves the viewport

```tsx
import { Transition } from 'react-transition-preset'

function Demo() {
  return (
    <Transition mounted='whileInView'>
      <div>Hello, World!</div>
    </Transition>
  )
}
```

## Global Configuration

```ts
import { setGlobalConfig } from 'react-transition-preset'

setGlobalConfig({
  duration: 0.2,
  timingFunction: 'linear',
  transition: 'fade-up'
})
```

## API

```ts
interface TransitionProps {
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
}
```
