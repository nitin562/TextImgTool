import { DndProvider } from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend"
import './App.css'
import Home from './Components/Home'

function App() {


  return (
    <DndProvider backend={HTML5Backend}>
    <Home/>
    </DndProvider>
  )
}

export default App
