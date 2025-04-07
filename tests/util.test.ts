import { beforeEach, describe, expect, it } from 'vitest'
import { defaultConfig, GlobalConfig, setGlobalConfig } from '../src/global-config'
import { defaults, secToMs } from '../src/utils'

describe('util', () => {
  it('defaults', () => {
    expect(defaults({ a: 1 }, { a: 2, b: 3 })).toMatchObject({ a: 1, b: 3 })

    expect(defaults({ a: 1, b: 2 }, { b: 3 })).toMatchObject({ a: 1, b: 2 })
  })

  it('secToMs', () => {
    expect(secToMs(1)).toBe(1000)
    expect(secToMs(0.5)).toBe(500)
    expect(secToMs(undefined)).toBe(0)
  })
})

describe('GlobalConfig', () => {
  beforeEach(() => {
    GlobalConfig.reset()
  })

  it('default config', () => {
    expect(GlobalConfig.config).toMatchObject(defaultConfig)
  })

  it('set config', () => {
    expect(GlobalConfig.set({ duration: 50 })).toHaveProperty('duration', 50)
  })

  it('set global config', () => {
    setGlobalConfig({ duration: 50 })
    expect(GlobalConfig.config).toHaveProperty('duration', 50)
  })

  it('merge config', () => {
    const config = GlobalConfig.merge({ duration: 50 })
    expect(config).toHaveProperty('duration', 50)
    expect(GlobalConfig.config).toHaveProperty('duration', 0.2)
  })

  it('exitDuration defaults to duration by set', () => {
    GlobalConfig.set({ duration: 50 })
    expect(GlobalConfig.config).toHaveProperty('exitDuration', 50)
  })

  it('exitDuration defaults to duration by merge', () => {
    const config = GlobalConfig.merge({ duration: 50 })
    expect(config).toHaveProperty('exitDuration', 50)
  })

  it('should reset', () => {
    GlobalConfig.set({ duration: 50 })
    GlobalConfig.reset()
    expect(GlobalConfig.config).toMatchObject(defaultConfig)
  })
})
