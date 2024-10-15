import { useEffect, useLayoutEffect } from 'react'

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect
