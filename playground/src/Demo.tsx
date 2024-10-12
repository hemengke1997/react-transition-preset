import { useState } from 'react'
import { type PresetTransitionName, Transition } from 'react-transition-preset'
import { Button } from 'antd'

type Props = {
  transition: PresetTransitionName
}
export default function Demo(props: Props) {
  const { transition } = props
  const [open, setOpen] = useState(true)

  return (
    <div className={'flex w-80 items-center justify-between'}>
      <Button onClick={() => setOpen((t) => !t)}>{transition}</Button>
      <div className={'relative h-40 w-40'}>
        <Transition transition={transition} mounted={open}>
          <div className={'absolute flex h-full w-full items-center justify-center rounded-lg bg-blue-400 text-white'}>
            {transition}
          </div>
        </Transition>
      </div>
    </div>
  )
}
