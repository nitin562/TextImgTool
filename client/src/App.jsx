import { DndProvider } from 'react-dnd'

import { TouchBackend } from 'react-dnd-touch-backend';
import './App.css'
import Home from './Components/Home'
import useSelection from 'antd/es/table/hooks/useSelection';
import { useEffect, useState } from 'react';

function App() {
  const [TouchStart, setTouchStart] = useState(false)
  
  return (
    <DndProvider backend={TouchBackend} options={{enableMouseEvents:true}}>
    <Home/>
    </DndProvider>
  )
}

export default App
