# react-transition-preset

> 轻量零依赖的 React 过渡组件，预设了常见过渡效果

[English Docs](./README.md)

## 在线演示

[例子](https://hemengke1997.github.io/react-transition-preset/)

## 安装

```bash
npm install react-transition-preset
```

## 使用


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
      <div>Hello, World!</div>
    </Transition>
  )
}
```

如果你的组件有样式属性，你可以使用渲染函数

```tsx
import { Transition } from 'react-transition-preset'

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition mounted={opened}>
      {(styles) => <div style={{
        ...styles,
        // 自定义样式
      }}>Hello, World!</div>}
    </Transition>
  )
}
```

## Viewport 视窗过渡

`mounted` 选项支持 `whileInView`，当元素进入或离开视窗时，开始过渡动画

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

## 全局配置

```ts
import { setGlobalConfig } from 'react-transition-preset'

setGlobalConfig({
  duration: 150,
  timingFunction: 'linear',
  transition: 'fade-up'
})
```

## API

```ts
interface TransitionProps {
  /** 确定组件是否应该挂载到 DOM */
  mounted: boolean | 'whileInView'
  
  /** 如果设置了，当元素隐藏时不会从 DOM 中卸载，而是应用 `display: none` 样式 */
  keepMounted?: boolean

  /** 如果 mounted 是 `whileInView`，此选项透传 useInView */ 
  viewport?: UseInViewOptions

  /** 过渡名称或对象 */
  transition?: PresetTransition

  /** 在初始化时设置过渡 */
  initial?: boolean

  /** 过渡持续时间（毫秒），默认 `150` */
  duration?: number

  /** 退出过渡持续时间（毫秒），默认与 `duration` 相同 */
  exitDuration?: number

  /** 过渡时间函数，默认 `theme.transitionTimingFunction` */
  timingFunction?: string

  /** 带有过渡样式参数的渲染函数 */
  children: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)

  /** 是否减少动画 */
  reduceMotion?: boolean

  /** 当退出过渡结束时调用 */
  onExited?: () => void

  /** 当退出过渡开始时调用 */
  onExit?: () => void

  /** 当进入过渡开始时调用 */
  onEnter?: () => void

  /** 当进入过渡结束时调用 */
  onEntered?: () => void

  /** 进入过渡开始前的延迟时间（毫秒） */
  enterDelay?: number

  /** 退出过渡开始前的延迟时间（毫秒） */
  exitDelay?: number

  /** 自定义元素类型，默认 `div` */
  as?: React.ElementType

  /** 根元素的 attributes */
  elementAttributes?: React.HTMLAttributes<React.ElementType>
}
```
