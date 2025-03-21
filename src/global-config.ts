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

const defaultConfig: TransitionConfig = {
  transition: 'fade',
  duration: 0.2,
  exitDuration: 0.2,
  keepMounted: false,
  enterDelay: 0,
  exitDelay: 0,
  timingFunction: 'ease',
  initial: false,
  reduceMotion: false,
}

export class GlobalConfig {
  private static config: TransitionConfig = defaultConfig

  static getConfig() {
    return this.config as Required<TransitionConfig>
  }

  static setConfig(props: TransitionConfig) {
    this.config = this.merge(props)
  }

  static merge(props: TransitionConfig) {
    const value = defaults(props, this.config)
    if (value.exitDuration === undefined) {
      value.exitDuration = value.duration
    }
    return value as Required<TransitionConfig>
  }
}

export function setGlobalConfig(props: TransitionConfig) {
  GlobalConfig.setConfig.call(GlobalConfig, props)
}
