import { type PresetTransitionName, transitions } from 'react-transition-preset'
import Demo from './Demo'

function App() {
  const demos = Object.keys(transitions).map((transition) => (
    <div key={transition}>
      <Demo transition={transition as PresetTransitionName} />
    </div>
  ))

  return (
    <div className={'flex w-screen items-center justify-center p-10'}>
      <div className={'flex flex-col gap-2'}>{demos}</div>
    </div>
  )
}

export default App
