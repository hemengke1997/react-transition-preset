// Adapted from motion/use-in-view

import { type RefObject, useEffect, useState } from 'react'
import { inView, type InViewOptions } from '../viewport'

export interface UseInViewOptions extends Omit<InViewOptions, 'root' | 'amount'> {
  root?: RefObject<Element>
  once?: boolean
  amount?: 'some' | 'all' | number
}

export function useInView(
  ref: RefObject<Element | null>,
  { root, margin, amount = 'some', once = false }: UseInViewOptions = {},
  options: {
    enable?: boolean
  } = {},
) {
  const [isInView, setInView] = useState(false)
  const { enable } = options

  useEffect(() => {
    if (!enable || !ref.current || (once && isInView)) return

    const onEnter = () => {
      setInView(true)

      return once ? undefined : () => setInView(false)
    }

    const options: InViewOptions = {
      root: (root && root.current) || undefined,
      margin,
      amount,
    }

    return inView(ref.current, onEnter, options)
  }, [root, ref, margin, once, amount])

  return isInView
}
