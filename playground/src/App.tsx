import { type PresetTransitionName, presetTransitions, setGlobalConfig } from 'react-transition-preset'
import Demo from './Demo'

setGlobalConfig({
  duration: 150,
})

function App() {
  const demos = Object.keys(presetTransitions).map((transition) => (
    <div key={transition}>
      <Demo transition={transition as PresetTransitionName} />
    </div>
  ))

  return (
    <div className={'flex w-screen flex-col items-center justify-center p-10'}>
      <h1 className={'mb-8 text-4xl font-bold'}>
        <a href='https://github.com/hemengke1997/react-transition-preset'>React Transition Preset</a>
      </h1>
      <div className={'flex flex-col gap-2'}>{demos}</div>
    </div>
  )
}

export default App
