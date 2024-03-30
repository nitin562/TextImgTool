import React from 'react'
import {Button} from "antd"
export default function Nav({showModal,setArr}) {
  const handleDeleteAll=()=>{
    setArr([])
  }
  return (
    <div className='w-full h-[4rem] border-b-2  border-b-white flex items-center justify-end px-2 gap-x-4 bg-slate-900/40'>
        <Button type='primary' onClick={()=>{showModal(true)}} className='w-fit h-fit hover:drop-shadow-[0_0_0.1rem_#fff]  text-white font-thin text-xl'>Add New</Button>
        <Button type="primary" danger onClick={handleDeleteAll} className='w-fit h-fit  text-white font-thin text-xl'>Delete All</Button>

    </div>
  )
}
