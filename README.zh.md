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
  /** 
   * @description 确定组件是否应该挂载到 DOM
   * @default false
   */
  mounted: boolean | 'whileInView'
  
  /** 
   * @description 如果设置了，当元素隐藏时不会从 DOM 中卸载，而是应用 `display: none` 样式
   * @default false
   */
  keepMounted?: boolean

  /** 
   * @description 如果 mounted 是 `whileInView`，此选项透传 useInView
   */ 
  viewport?: UseInViewOptions & {
    /** 自定义占位元素类型，默认 `div` */
    placeholder?: React.ElementType
    /** 占位元素HTML属性 */
    attributes?: React.HTMLAttributes<React.ElementType>
  }

  /** 
   * @description 过渡名称或对象
   * @default 'fade'
   */
  transition?: PresetTransition

  /** 
   * @description 在初始化时设置过渡
   * @default false
   */
  initial?: boolean

  /** 
   * @description 过渡持续时间（毫秒）
   * @default 150
   */
  duration?: number

  /**
   * @description 退出过渡持续时间（毫秒） 
   * @default 150
   */
  exitDuration?: number

  /** 
   * @description 过渡时间函数
   * @default 'ease'
   */
  timingFunction?: string

  /** 
   * @description 带有过渡样式参数的渲染函数
   */
  children: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)

  /** 
   * @description 是否减少动画
   * @default false
   */
  reduceMotion?: boolean

  /** 
   * @description 当退出过渡结束时调用
   */
  onExited?: () => void

  /** 
   * @description 当退出过渡开始时调用
   */
  onExit?: () => void

  /** 
   * @description 当进入过渡开始时调用
   */
  onEnter?: () => void

  /** 
   * @description 当进入过渡结束时调用
   */
  onEntered?: () => void

  /** 
   * @description 进入过渡开始前的延迟时间（毫秒）
   * @default 0
   */
  enterDelay?: number

  /** 
   * @description 退出过渡开始前的延迟时间（毫秒）
   * @default 0
   */
  exitDelay?: number
}
```
