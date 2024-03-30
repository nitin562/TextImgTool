import React, { useState } from 'react'
import {Button, Modal} from "antd"
export default function Modal1({open,setopen,length=1,setDisappearBtn=null,setBlockType}) {
  const onPicture=()=>{
    setBlockType(1) //1 for picture
    setopen(false)
    
  }
  const onText=()=>{
    setBlockType(0) //0 for text
    setopen(false)
  }
  const onCancel=()=>{
    if(length===0){
      setDisappearBtn(false)
    }
    setopen(false)
  }
  return (
    <div >
        <Modal className='backdrop-blur-md' closable={false} open={open} title="Add New Block" footer={[
          <Button key={1} onClick={onPicture} >Picture</Button>,
          <Button key={2} onClick={onText}>Text</Button>
          ,<Button key={3} type='primary' danger={true} onClick={onCancel}>Cancel</Button>
        ]}>
          Choose Block Type
        </Modal>
    </div>
  )
}
