# react-transition-preset

> Lightweight, zero-dependency transition component with common preset transition.

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
      duration={400}
      timingFunction='ease'
    >
      <div>your component</div>
    </Transition>
  )
}
```

If your component has style props, you can use render function

```tsx
function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition mounted={opened}>
      {(styles) => <div style={styles}>your component</div>}
    </Transition>
  )
}
```

## API

```ts
interface TransitionProps {
  /** Determines whether component should be mounted to the DOM */
  mounted: boolean
  
  /** If set element will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
  keepMounted?: boolean

  /** Transition name or object */
  transition?: PresetTransition

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
```
