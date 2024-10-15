import { type DependencyList, type EffectCallback, useRef } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

export function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList, initial = false) {
  const mounted = useRef(initial)

  useIsomorphicLayoutEffect(
    () => () => {
      mounted.current = initial
    },
    [],
  )

  useIsomorphicLayoutEffect(() => {
    if (mounted.current) {
      return fn()
    }

    mounted.current = true
    return undefined
  }, dependencies)
}
