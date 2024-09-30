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
    <div className={'flex items-center w-80 justify-between'}>
      <Button onClick={() => setOpen((t) => !t)}>{transition}</Button>
      <div className={'w-40 h-40 relative'}>
        <Transition transition={transition} mounted={open}>
          <div className={'w-full h-full absolute bg-blue-400 rounded-lg flex justify-center items-center text-white'}>
            {transition}
          </div>
        </Transition>
      </div>
    </div>
  )
}
