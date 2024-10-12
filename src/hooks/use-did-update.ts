import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react'

export function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList, initial = false) {
  const mounted = useRef(initial)

  useEffect(
    () => () => {
      mounted.current = initial
    },
    [],
  )

  useEffect(() => {
    if (mounted.current) {
      return fn()
    }

    mounted.current = true
    return undefined
  }, dependencies)
}
