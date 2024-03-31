import { DndProvider } from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend"
import { TouchBackend } from 'react-dnd-touch-backend';
import './App.css'
import Home from './Components/Home'
import useSelection from 'antd/es/table/hooks/useSelection';
import { useEffect, useState } from 'react';

function App() {
  const [TouchStart, setTouchStart] = useState(false)
  useEffect(()=>{
    const onTouchStart=()=>{
      console.log(true)
      setTouchStart(true)
    }
    window.addEventListener("touchstart",onTouchStart)
    return()=>{
      window.removeEventListener("touchstart",onTouchStart)
    }
  })
  return (
    <DndProvider backend={TouchStart?TouchBackend:HTML5Backend}>
    <Home/>
    </DndProvider>
  )
}

export default App
