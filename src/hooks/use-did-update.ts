import { type DependencyList, type EffectCallback, useRef } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

/**
 * Executes a function when dependencies changed after hook mouted
 */
export function useDidUpdate(
  fn: EffectCallback,
  options: {
    initialMounted?: boolean
    deps?: DependencyList
  },
) {
  const { initialMounted, deps } = options
  const mounted = useRef(initialMounted)

  useIsomorphicLayoutEffect(
    () => () => {
      mounted.current = initialMounted
    },
    [],
  )

  useIsomorphicLayoutEffect(() => {
    if (mounted.current) {
      return fn()
    }

    mounted.current = true
    return undefined
  }, deps)
}
