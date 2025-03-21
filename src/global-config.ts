import { type TransitionProps } from './Transition'
import { defaults } from './utils'

type TransitionConfig = Pick<
  TransitionProps,
  | 'transition'
  | 'duration'
  | 'exitDuration'
  | 'keepMounted'
  | 'enterDelay'
  | 'exitDelay'
  | 'timingFunction'
  | 'initial'
  | 'reduceMotion'
>

export const defaultConfig: TransitionConfig = {
  transition: 'fade',
  duration: 0.2,
  keepMounted: false,
  enterDelay: 0,
  exitDelay: 0,
  timingFunction: 'ease',
  initial: false,
  reduceMotion: false,
}

export class GlobalConfig {
  static config: TransitionConfig = defaultConfig

  /**
   * 设置全局配置
   */
  static set(props: TransitionConfig) {
    this.config = this.addDefaults(props)
    return this.config
  }

  /**
   * 从全局配置中合并配置，
   * 外部配置优先级高于全局配置，
   * 并不会改变全局配置
   */
  static merge(props: TransitionConfig) {
    const mergedValue = this.addDefaults(props)
    return mergedValue
  }

  /**
   * 给配置添加默认值
   */
  private static addDefaults(props: TransitionConfig) {
    const value = defaults(props, this.config)
    if (value.exitDuration === undefined) {
      value.exitDuration = value.duration
    }
    return value as Required<TransitionConfig>
  }

  static reset() {
    this.config = defaultConfig
  }
}

/**
 * 设置全局配置
 */
export function setGlobalConfig(props: TransitionConfig) {
  GlobalConfig.set.call(GlobalConfig, props)
}
