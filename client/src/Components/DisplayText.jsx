import React, { useEffect, useRef, useState } from 'react'
import {Button, Card, Popover} from "antd"
import SpaceTile from './SpaceTile'
import Drawer1 from './Drawer1'
export default function DisplayText({data,index,setarr}) {
  const refCard=useRef()
    const [open, setopen] = useState(-1)
    // On drag save the index
    const handleDrag=(e)=>{
        sessionStorage.setItem("currIndex",index)
    }
    const onEdit=()=>{
      setopen(1)
    }
    // Custom edit and save
    const CustomEdit=(index,content,html,ChangeArr)=>{
      //data-text string
      console.log(content,html)
      ChangeArr(prev=>{
        let newArr=[...prev]
        
        newArr[index].content=content
        newArr[index].html=html
        console.log(newArr)

        return newArr
      })
    }
    // Delete text block
    const onDelete=()=>{
      setarr((prev)=>{
        return prev.filter((element,idx)=>{
          return idx!==index
        })
      })
    }
    // Footer content
    const HoverContent=(
      <div className='w-full flex justify-between'>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete} danger={true}>Delete</Button>

      </div>
    )
    useEffect(()=>{
     
      refCard.current.innerHTML=data.html
    },[data.html])
  return (
    <div className='w-full '>
        <SpaceTile index={index} setarr={setarr}/>
        <Popover content={HoverContent} title="Customize Text Block" >
          <Card  className=' cursor-pointer bg-transparent border-[1px] rounded-lg border-transparent hover:bg-slate-500/20 hover:border-white text-white' draggable={true} onDrag={handleDrag}>
              {/* <p className='break-words text-wrap'>{data.data}</p> */}
              <div ref={refCard}></div>
          </Card>
        </Popover>
        <SpaceTile index={index+1} setarr={setarr}/>
        <Drawer1 key={index} index={index} setarr={setarr} open={open!=-1} setopen={setopen} textfunc={CustomEdit}  CustomText={data.content}/>
    </div>
  )
}
