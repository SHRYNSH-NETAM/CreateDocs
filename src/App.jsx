import Readme from './pages/readme/Readme'

const App = () => {
  return (
    <div className="flex justify-center bg-zinc-100">
      <div className="grow bg-zinc-100"><div className="h-16 bg-zinc-800"></div></div>
      <Readme className="z-30" />
      <div className="grow bg-zinc-100"><div className="h-16 bg-zinc-800"></div></div>
    </div>
  )
}

export default App