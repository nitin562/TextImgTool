import { DndProvider } from 'react-dnd'

import { TouchBackend } from 'react-dnd-touch-backend';
import './App.css'
import Home from './Components/Home'

function App() {


  return (
    <DndProvider backend={TouchBackend}>
    <Home/>
    </DndProvider>
  )
}

export default App
