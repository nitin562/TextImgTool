import React from 'react'
import {Button} from "antd"
export default function Nav({showModal}) {
  return (
    <div className='w-full h-[4rem] border-b-2 border-b-pink-400 flex items-center justify-end px-2'>
        <Button onClick={()=>{showModal(true)}} className='w-fit h-fit  text-white font-thin text-xl'>Add New</Button>
    </div>
  )
}
