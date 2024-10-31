import { type TransitionProps } from './Transition'
import { mergeOmitUndefined } from './utils'

type TransitionConfig = Pick<
  TransitionProps,
  'transition' | 'duration' | 'exitDuration' | 'keepMounted' | 'enterDelay' | 'exitDelay' | 'timingFunction' | 'initial'
>

const defaultConfig: TransitionConfig = {
  transition: 'fade',
  duration: 150,
  keepMounted: false,
  enterDelay: 0,
  exitDelay: 0,
  timingFunction: 'ease',
  initial: false,
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
    const value = mergeOmitUndefined(this.config, props)
    if (value.exitDuration === undefined) {
      value.exitDuration = value.duration
    }
    return value as Required<TransitionConfig>
  }
}

export function setGlobalConfig(props: TransitionConfig) {
  GlobalConfig.setConfig(props)
}
