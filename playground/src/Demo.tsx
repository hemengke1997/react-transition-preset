import { useState } from 'react'
import { Transition } from 'react-transition-preset'
import { type TransitionName } from 'react-transition-preset/types'
import { Button } from 'antd'

type Props = {
  transition: TransitionName
}
export default function Demo(props: Props) {
  const { transition } = props
  const [open, setOpen] = useState(true)

  const tx = [
    {
      mounted: open,
    },
    {
      mounted: 'whileInView' as const,
      desc: 'whileInView',
    },
  ]

  return (
    <div className={'flex items-center justify-between'}>
      <Button className={'mr-2'} onClick={() => setOpen((t) => !t)}>
        {transition}
      </Button>
      <div className={'flex gap-x-4'}>
        {tx.map((item, index) => (
          <div className={'relative h-40 w-40'} key={index}>
            <Transition transition={transition} mounted={item.mounted} keepMounted={false}>
              {(style) => {
                return (
                  <div
                    style={style}
                    className={
                      'absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-400 text-white'
                    }
                  >
                    <div>{item.desc || transition}</div>
                  </div>
                )
              }}
            </Transition>
          </div>
        ))}
      </div>
    </div>
  )
}
